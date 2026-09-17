import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    credits:{
        type:Number,
        default:100
    },
    resume: {
        data: { type: Buffer },
        contentType: { type: String, default: "application/pdf" },
        filename: { type: String },
        size: { type: Number },
        text: { type: String },
        role: { type: String },
        experience: { type: String },
        projects: [{ type: String }],
        skills: [{ type: String }],
        updatedAt: { type: Date, default: Date.now }
    }

}, {timestamps:true})

const User = mongoose.model("User" , userSchema)

export default User