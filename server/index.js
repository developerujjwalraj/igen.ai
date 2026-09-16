import express from "express"
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from "cookie-parser"
dotenv.config()
import cors from "cors"
import authRouter from "./routes/auth.route.js"
import userRouter from "./routes/user.route.js"
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js"
import atsRouter from "./routes/ats.route.js"

const app = express()
app.set("trust proxy", 1)
app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
            return callback(null, true);
        }
        if (/^https:\/\/.*\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }
        if (process.env.CLIENT_URL && (origin === process.env.CLIENT_URL || origin === process.env.CLIENT_URL.replace(/\/$/, ""))) {
            return callback(null, true);
        }
        return callback(null, true); // Fallback allow in dev
    },
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth" , authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview" , interviewRouter)
app.use("/api/payment" , paymentRouter)
app.use("/api/ats", atsRouter)

app.get("/", (req, res) => {
    res.send("igen.ai Server is running");
});

const PORT = process.env.PORT || 6000
app.listen(PORT , ()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})
