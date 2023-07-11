"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios"
import { toast } from "react-hot-toast"





export default function SignupPage() {

    const [user, SetUser] = React.useState({
        email: "",
        password: ""
        

    })
    const router= useRouter()

    const [loading, setloading]=React.useState(false)
    const[buttonDisabled,setButtonDisabled]=React.useState(false)

    const OnLogin = async () => {
        try {
            setloading(true)
            const res= await axios.post("/api/users/login", user)
            console.log("Login Success", res.data)
            toast.success("Login Success")
            router.push("/profile")

            
        } catch (error:any) {
            console.log("Login Failed",error.message)
            toast.error(error.message)
            
        }finally{
            setloading(false)
        }

    }

 useEffect(() => {
    if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
    }else{
        setButtonDisabled(true)
    }
   
 }, [user])
 




    return (
        <div className="flex flex-col items-center justify-center min-h-screenn py-2">

            <h1>{loading? "processsing":"Login"}</h1>
            <hr />

            

            <label htmlFor="email">email</label>
            <hr />
            <input
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => SetUser({ ...user, email: e.target.value })}
                placeholder="email"
            />
            <hr/>


<label htmlFor="password">password</label>
            <hr />
            <input
                id="password"
                type="text"
                value={user.password}
                onChange={(e) => SetUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <hr/>

            <button onClick={OnLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none">
                {buttonDisabled? "Enter above details":"Login"}
            </button>
            <hr/>
            <Link style={{textDecoration:"none", }} href="/signup">Visit Signup Page</Link>


        </div>
    )
}