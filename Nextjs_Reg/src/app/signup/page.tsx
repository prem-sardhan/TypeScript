"use client"

import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios, { Axios } from "axios"
import { toast } from "react-hot-toast"



export default function SignupPage() {


    const router = useRouter()
    const [user, SetUser] = React.useState({
        email: "",
        password: "",
        username: ""

    })

    const [buttonDisabled, setButtonDisabled] = useState(false)

    const [loading, setloading] = useState(false)

    const SignUp = async () => {
        try {
            setloading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");


        } catch (error: any) {
            console.log("signup failed", error.message)
            toast.error(error.message)
           

        } finally {
            setloading(false)

        }

        console.log(user)

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }

    }, [user])




    return (
        <div className="flex bg-black flex-col items-center justify-center min-h-screenn py-2">

            <h1>{loading ? "processing" : "signup"}</h1>
            <hr />

            <label htmlFor="username">Username</label>
            <hr />
            <input
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => SetUser({ ...user, username: e.target.value })}
                placeholder="username"
            />
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
            <hr />


            <label htmlFor="password">password</label>
            <hr />
            <input
                id="password"
                type="text"
                value={user.password}
                onChange={(e) => SetUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <hr />

            <button onClick={SignUp} className="text-white">
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <hr />
            <Link style={{ textDecoration: "none", }} href="/login">Visit Login Page</Link>


        </div>
    )
}