
import AuthPageCard from "../../app/components/AuthPageCard"

export default function Signin() {
    return (
       <div className="h-screen w-screen flex justify-center items-center">
            <AuthPageCard 
            isSignup={false}
            buttonTxt="Signin"
            headingTxt="Login"
            />
       </div>
    )
}