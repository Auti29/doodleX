"use client";

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
    const [email, setEmail] = useState<string>("");


    function handleSubmit() {
        if(isSignup && handleSignupClick){
            //todo: check credentials with zod
            handleSignupClick(username, email, password); 
        }
        else if(handleSigninClick){
            //todo: check credentials with zod
            handleSigninClick(username, password);
        }
    }

    return (
         <div className="p-4 m-2 bg-white border-3 border-gray-200 flex flex-col items-center justify-center text-black w-[22vw] rounded-md shadow-lg">
            <h1 className="font-bold text-2xl text-gray-600 m-2">{headingTxt}</h1>

            {isSignup && 
            <div className="mt-1.5  mb-1.5 w-[80%] flex flex-col justify-center">
            <h4 className="font-bold">Email</h4>
            <input
             onChange={(e) => setEmail(e.target.value)}
             value={email}
             className="border border-gray-600 p-2 rounded-md m-auto w-full" type="text" placeholder="Enter your email"/>
            </div>}

            <div className="mt-1.5  mb-1.5 w-[80%] flex flex-col justify-center">
            <h4 className="font-bold">Username</h4>
            <input 
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="border border-gray-600 p-2 rounded-md m-auto w-full" type="text" placeholder={isSignup? "Create your username":"Enter your username"}/>
            </div>
            <div className="mt-1.5  mb-1.5 w-[80%] flex flex-col justify-center">
            <h4 className="font-bold">Password</h4>
            <input
            onChange={(e) => setPassword(e.target.value)}
            value={password} 
            className="border border-gray-600 p-2 rounded-md m-auto w-full" type="password" placeholder={isSignup? "Create your password":"Enter your password"}/>
            </div>

            <div className="mt-2  mb-2.5 w-[80%] flex flex-col justify-center">
            <button
            onClick={handleSubmit}
            className="p-2 border-0 rounded-md bg-gray-600 w-full text-white font-bold cursor-pointer hover:bg-gray-400">{buttonTxt}</button>
            </div>
        </div>
    )
}