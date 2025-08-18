"use client";
import axios from "axios"
import AuthPageCard from "../../app/components/AuthPageCard"
import { useRouter } from "next/navigation";
const BACKEND_API = process.env.NEXT_PUBLIC_BACKEND_API;


export default function Signup() {
    const router = useRouter();
    async function handleSignupSubmit(username: string, email: string, password: string): Promise<void>{
    try{
        const res = await axios.post(`${BACKEND_API}/api/v1/signup`, {
        email, 
        username, 
        password
        });

        if(res.status == 200){
            alert(res.data.message);
            router.push('/signin');
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
       <div className="h-screen w-screen flex justify-center items-center">
            <AuthPageCard 
            isSignup={true}
            buttonTxt="Signup"
            headingTxt="Register"
            handleSignupClick={handleSignupSubmit}
            />
       </div>
    )
}