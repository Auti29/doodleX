
import AuthPageCard from "../../app/components/AuthPageCard"

export default function Signup() {
    return (
       <div className="h-screen w-screen flex justify-center items-center">
            <AuthPageCard 
            isSignup={true}
            buttonTxt="Signup"
            headingTxt="Register"
            />
       </div>
    )
}