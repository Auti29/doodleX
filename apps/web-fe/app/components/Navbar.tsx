import { UserRoundIcon } from "lucide-react";
import Logo from "./Logo";
import { LayoutContext } from "../dashboard/layout";
import { useContext } from "react";

export default function NavBar () {
    const {user, noToken} = useContext(LayoutContext);
    return (
        
        <div className="pl-8 pr-8 pt-2 pb-2 bg-[#222222] flex justify-between 
                        items-center border-b border-gray-500 h-[60px] w-full">

            <div className="flex items-center justify-center">
            <Logo />
            <span className="text-3xl text-gray-500 ml-2 mr-2">/</span>
            {!noToken && <span className="text-center font-bold text-gray-400 mt-1">Hello, {user.username}</span>}
            </div>
            <div className="flex items-center justify-center">

            <div className="flex border border-gray-500 text-xs rounded-2xl pl-2 pr-2 pt-0.5 pb-0.5 font-bold justify-center items-center h-fit w-fit">
                <span className="h-2 w-2 border-0 rounded-full bg-green-400 mr-1"></span>
                <span className="text-xs text-gray-300">All OK</span>
            </div>
            <div className="flex items-center justify-center border-2 border-gray-600 rounded-md p-1 bg-gray-200 ml-2">
            <UserRoundIcon className="text-black"/>
            </div> 

            </div>           
        </div>
    )
}