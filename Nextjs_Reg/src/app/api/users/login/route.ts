import { connect } from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import {
    NextRequest, NextResponse
} from "next/server"
import bcryptjs from "bcryptjs"
import { request } from "http"
import jwt from "jsonwebtoken"
import { use } from "react"

connect()

export async function POST(request: NextResponse) {
    try {

        const reqBody = await request.json()
        const { email, password } = reqBody

        // check if user
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "user doest not exist" }, { status: 400 })
        }

        // Check Password
        const ValidPAss = bcryptjs.compare(password, user.password)

        if (!ValidPAss) {
            return NextResponse.json({ error: "Invalid Password" }, { status: 500 })
        }




        // CREATING TOKEN--------------------------------------


        // create token data
        const TokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }




        // Create Token
        const token = await jwt.sign(TokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" })


        const response = NextResponse.json({
            message: "login SUccessfull",
            Success: true,
        })

        //   set token in user cookie after logging in 
        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;




    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })

    }

}
