"use client";

import Link from "next/link";
import { useState } from "react"



interface AuthI {
    isSignup: boolean, 
    buttonTxt: string, 
    headingTxt: string, 
    handleSignupClick?: (username:string, email:string, password:string) => Promise<void>, 
    handleSigninClick?: (username: string, password: string) => Promise<void>
}

export default function AuthPageCard({isSignup, buttonTxt, headingTxt, handleSignupClick, handleSigninClick}: AuthI) {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");


    async function handleSubmit() {
        if(loading) return;
        try{
            setLoading(true);
            if(isSignup && handleSignupClick){
                //todo: check credentials with zod
                await handleSignupClick(username, email, password); 
            }
            else if(handleSigninClick){
                //todo: check credentials with zod
                await handleSigninClick(username, password);
            }

        }finally{
            setLoading(false);
        }
    }

    return (
         <div className="p-3 border-gray-200 flex flex-col text-white rounded-md shadow-lg w-[90%]">
            <h1 className="font-bold text-4xl text-gray-300 mb-3 underline decoration-blue-600">{headingTxt}</h1>

            {isSignup && 
            <div className="mt-2.5  mb-1.5 w-[100%] flex flex-col justify-center">
            <h4 className="mb-1">Email</h4>
            <input
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             className="border border-gray-300 rounded-xl  p-2 m-auto w-full" type="text" placeholder="johndoe@gmail.com" />
            </div>}

            <div className="mt-2.5  mb-1.5 w-[100%] flex flex-col justify-center">
            <h4 className="m-1">Username</h4>
            <input 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="border rounded-xl  border-gray-300 p-2 m-auto w-full" type="text" placeholder={isSignup? "JohnDoe":"JohnDoe"}/>
            </div>
            <div className="mt-2.5  mb-1.5 w-[100%] flex flex-col justify-center">
            <h4 className="m-1">Password</h4>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            className="border rounded-xl  border-gray-300 p-2 m-auto w-full" type="password" placeholder={isSignup? "Your Password":"Your Password"}/>
            </div>

            <div className="mt-5  mb-2.5 w-[100%] flex flex-col justify-center">
            <button
            disabled = {loading}
            onClick={handleSubmit}
            className={`p-2 border-0 rounded-md bg-white w-full text-black text-sm font-semibold cursor-pointer hover:bg-gray-400 ${loading && " bg-gray-300"}`}>{loading ? "Loading..." :buttonTxt}</button>
            </div>

            <div className="flex justify-center items-center text-sm w-[100%]">
                <p className="text-gray-300">{isSignup ? "Already have an account?" : "Don't have an account?"} </p>
                <Link className="font-bold ml-1" href={isSignup ? '/signin' : "/signup"}>
                    <span className="underline">{isSignup ? "Login" : "Signup"}</span>
                </Link>
            </div>
        </div>
    )
}