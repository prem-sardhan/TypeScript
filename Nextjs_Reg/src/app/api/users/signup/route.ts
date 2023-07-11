import {connect} from "@/dbConfig/dbconfig"

import User from "@/models/userModel"

import { NextRequest,NextResponse
 } from "next/server"

 import bcryptjs from "bcryptjs"
import { request } from "http"

 connect()

 export async function POST(requuest:NextRequest){
    try {
        const reqBody =await requuest.json()

        const {username, email, password}=reqBody
        console.log(reqBody)

        // check if user exit 
       const user=await  User.findOne({email})
       if(user){
        return NextResponse.json({error:"User already exists"},{status:400})
       }

    //    hash password

    const salt= await bcryptjs.genSalt(10)
    const HashedPassword = await bcryptjs.hash(password, salt)

    const NewUser= new User({
        username,
        email,
        password:HashedPassword
    })

    const SaveUSer =await NewUser.save()
    console.log(SaveUSer)

    return NextResponse.json({
        message:"User created successfully",
        success:true,
    })



        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
       
        
    }
 }