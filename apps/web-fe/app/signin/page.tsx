"use client";


import axios from "axios"
import AuthPageCard from "../../app/components/AuthPageCard"
import { useRouter } from "next/navigation";
import Logo from "../components/Logo";
import Image from "next/image";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;


export default function Signin() {
    const router = useRouter();

    async function handleSigninClick(username: string, password: string){
      try { 
        const res = await axios.post(`${BACKEND_API}/api/v1/signin`, {
            username, 
            password
        });

        if(res.status === 200){
            localStorage.setItem("token", res.data.token);
            alert(res.data.message);
            router.push('/dashboard');
        }
        else{
            alert(res.data.message);
        }

    }catch(e){
        console.error(e);
        alert(e);
    }
    }

    return (
       <div className="h-screen w-screen bg-black overflow-hidden flex justify-center items-center">
                        <div className="w-fit h-fit flex justify-center items-center">
                          <Image 
                                className="border border-gray-500 rounded-xl"
                                src={"/doodleXLogo.png"} 
                                height={600}
                                width={400}
                                alt="doodleXlogo"
                                priority 
                  />
            
                        </div>

            <div className="w-[45%] ml-2 flex justify-start items-center">
            <AuthPageCard 
            isSignup={false}
            buttonTxt="Signin"
            headingTxt="Login"
            handleSigninClick={handleSigninClick}
            />
            </div>
       </div>
    )
}


            