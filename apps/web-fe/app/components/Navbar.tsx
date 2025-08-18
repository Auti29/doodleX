import { UserRoundIcon } from "lucide-react";

export default function NavBar ({username}: {username:string}) {
    return (
        <div className=" w-[95%] p-3 border-b-4 border-gray-300 flex justify-between m-2 items-center rounded-lg shadow-lg">
            <div className="ml-1 flex items-center justify-center text-xl font-bold font-mono">
                <span className="underline decoration-blue-600 decoration-3">doodle</span>
                <span className="text-3xl text-blue-600">X</span>
            </div>
            <div className="flex pl-1 pr-1 justify-center items-center">
            <span className="font-bold mr-2">{username}</span>
            <div className="flex items-center justify-center border-2 border-gray-600 rounded-full p-2 bg-gray-200">
            <UserRoundIcon />
            </div>
            </div>
            
        </div>
    )
}