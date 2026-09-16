import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { checkAts } from "../controllers/ats.controller.js";

const atsRouter = express.Router();

// Route: POST /api/ats/check (requires authentication and 30 credits)
atsRouter.post("/check", isAuth, upload.single("resume"), checkAts);

export default atsRouter;
