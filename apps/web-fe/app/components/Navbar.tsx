import { UserRoundIcon } from "lucide-react";
import Logo from "./Logo";

export default function NavBar ({username, noToken}: {username:string, noToken: boolean}) {
    return (
        <div className=" w-[95%] p-3 border-b-4 border-gray-300 flex justify-between m-2 items-center rounded-lg shadow-lg">
            <Logo />
            <div className="flex pl-1 pr-1 justify-center items-center">
            {!noToken && <span className="font-bold mr-2">{username}</span>}
            <div className="flex items-center justify-center border-2 border-gray-600 rounded-full p-2 bg-gray-200">
            <UserRoundIcon />
            </div>
            </div>
            
        </div>
    )
}