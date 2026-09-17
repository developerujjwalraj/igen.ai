import User from "../models/user.model.js"


export const getCurrentUser = async (req,res) => {
    try {
        const userId = req.userId
        const user = await User.findById(userId).select("-resume.data")
        if(!user) {
            return res.status(404).json({message:"user does not found"})
        }
        return res.status(200).json(user)
    } catch (error) {
         return res.status(500).json({message:`failed to get currentUser ${error}`})
    }
}

export const downloadUserResume = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user || !user.resume || !user.resume.data) {
            return res.status(404).json({ message: "No saved resume found." });
        }

        res.setHeader("Content-Type", user.resume.contentType || "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `inline; filename="${user.resume.filename || "resume.pdf"}"`
        );
        return res.send(user.resume.data);
    } catch (error) {
        return res.status(500).json({ message: `Failed to download resume: ${error.message}` });
    }
};

export const deleteUserResume = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        user.resume = undefined;
        await user.save();
        return res.status(200).json({ message: "Resume deleted successfully." });
    } catch (error) {
        return res.status(500).json({ message: `Failed to delete resume: ${error.message}` });
    }
};