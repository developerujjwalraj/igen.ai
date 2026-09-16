import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAi } from "../services/openRouter.service.js";
import User from "../models/user.model.js";

const ATS_CREDIT_COST = 30;

export const checkAts = async (req, res) => {
  let filepath = null;

  try {
    // 1. Check user authentication & credit balance
    const user = await User.findById(req.userId);
    if (!user) {
      if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(404).json({ message: "User not found. Please log in." });
    }

    if (user.credits < ATS_CREDIT_COST) {
      if (req.file?.path && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
      return res.status(400).json({
        message: `Not enough credits. You need ${ATS_CREDIT_COST} credits to run an ATS check (Current Balance: ${user.credits} credits).`
      });
    }

    // 2. Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: "Please upload a resume PDF file." });
    }

    filepath = req.file.path;
    const { role = "", jobDescription = "" } = req.body;

    if (!role.trim() && !jobDescription.trim()) {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      return res.status(400).json({
        message: "Please provide either a Target Job Profile or a Job Description."
      });
    }

    // 3. Read and parse PDF
    const fileBuffer = await fs.promises.readFile(filepath);
    const uint8Array = new Uint8Array(fileBuffer);
    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const content = await page.getTextContent();
      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    if (!resumeText || resumeText.length < 50) {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      return res.status(400).json({
        message: "Could not extract readable text from this PDF. Please ensure it is not a scanned image."
      });
    }

    // 4. Prepare ATS evaluation prompt
    const messages = [
      {
        role: "system",
        content: `You are an expert Enterprise Applicant Tracking System (ATS) auditor and hiring manager.
Your task is to analyze a candidate's resume text against a target Job Role and/or Job Description.

Perform a thorough, rigorous ATS evaluation and return ONLY a valid JSON object matching this exact structure:
{
  "atsScore": 85,
  "matchLevel": "High",
  "summary": "2-3 sentences summarizing how well the resume matches the target role/job description.",
  "matchingSkills": ["skill1", "skill2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "sectionScores": {
    "skillsMatch": 80,
    "experienceFit": 85,
    "educationFit": 90,
    "formattingReadability": 95
  },
  "strengths": [
    "strength point 1",
    "strength point 2",
    "strength point 3"
  ],
  "weaknesses": [
    "weakness point 1",
    "weakness point 2",
    "weakness point 3"
  ],
  "formatCheck": {
    "hasContactInfo": true,
    "hasActionVerbs": true,
    "hasQuantifiableMetrics": true,
    "bulletPointsReadable": true,
    "notes": "Short observation about document layout and readability for parsers."
  },
  "bulletImprovements": [
    {
      "original": "Example original weak bullet point or task from resume",
      "improved": "Optimized bullet point with action verbs, metrics, and relevant keywords",
      "reason": "Why this improved version scores better with ATS and recruiters"
    }
  ],
  "actionableTips": [
    "Specific actionable recommendation 1",
    "Specific actionable recommendation 2",
    "Specific actionable recommendation 3"
  ]
}

Ensure all scores are realistic numbers between 0 and 100. matchLevel must be 'High', 'Moderate', or 'Low'. Do not include markdown codeblocks or extra text. Output strictly JSON.`
      },
      {
        role: "user",
        content: `Target Job Profile: ${role || "Not specified (infer from Job Description)"}

Target Job Description:
${jobDescription || "Not provided (evaluate against standard expectations for the Target Job Profile)"}

Candidate Resume Content:
${resumeText}`
      }
    ];

    const aiResponse = await askAi(messages);

    // Clean up temporary file
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
      filepath = null;
    }

    // Clean response of potential markdown formatting
    let cleanJson = aiResponse.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```/, "").replace(/```$/, "").trim();
    }

    let parsedResult;
    try {
      parsedResult = JSON.parse(cleanJson);
    } catch (parseErr) {
      console.error("JSON parse error:", parseErr, "Raw output:", cleanJson);
      const jsonMatch = cleanJson.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("Unable to parse AI ATS audit result.");
      }
    }

    // 5. Deduct 30 credits upon successful analysis
    user.credits -= ATS_CREDIT_COST;
    await user.save();

    return res.status(200).json({
      success: true,
      creditsLeft: user.credits,
      creditsDeducted: ATS_CREDIT_COST,
      data: parsedResult
    });

  } catch (error) {
    console.error("ATS Check Error:", error);

    if (filepath && fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    return res.status(500).json({
      message: error.message || "Failed to analyze resume ATS compatibility."
    });
  }
};
