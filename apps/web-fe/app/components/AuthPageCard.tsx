
interface AuthI {
    isSignup: boolean, 
    buttonTxt: string, 
    headingTxt: string, 

}

export default function AuthPageCard({isSignup, buttonTxt, headingTxt}: AuthI) {
    return (
         <div className="p-3 m-2 bg-white flex flex-col items-center justify-center text-black w-[22vw] rounded-md">
            <h1 className="font-bold text-2xl text-gray-600 m-2">{headingTxt}</h1>

            {isSignup && 
            <div className="mt-1.5  mb-1.5 w-[80%] flex flex-col justify-center">
            <h4 className="font-bold">Email</h4>
            <input className="border border-gray-600 p-2 rounded-md m-auto w-full" type="text" placeholder="Enter your email"/>
            </div>}

            <div className="mt-1.5  mb-1.5 w-[80%] flex flex-col justify-center">
            <h4 className="font-bold">Username</h4>
            <input className="border border-gray-600 p-2 rounded-md m-auto w-full" type="text" placeholder={isSignup? "Create your username":"Enter your username"}/>
            </div>
            <div className="mt-1.5  mb-1.5 w-[80%] flex flex-col justify-center">
            <h4 className="font-bold">Password</h4>
            <input className="border border-gray-600 p-2 rounded-md m-auto w-full" type="password" placeholder={isSignup? "Create your password":"Enter your password"}/>
            </div>

            <div className="mt-2  mb-2.5 w-[80%] flex flex-col justify-center">
            <button className="p-2 border-0 rounded-md bg-gray-600 w-full text-white font-bold cursor-pointer hover:bg-gray-400">{buttonTxt}</button>
            </div>
        </div>
    )
}