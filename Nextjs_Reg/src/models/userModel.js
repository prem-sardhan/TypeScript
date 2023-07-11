import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:[true, "please enter a username"]

    },
    email:{
        type:String,
        required:[true,"enter email"],
        unique:true
    },
    password:{
        type: String,
        required:[true,"Please provide a password"]
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    }
,
forgetPasswordToken:String,
forgetPasswordTokenExpiry:Date,
verifyToken:String,
verifyTokenExpiry:Date,
})

const User= mongoose.models.user || mongoose.model("user",UserSchema)

export default User