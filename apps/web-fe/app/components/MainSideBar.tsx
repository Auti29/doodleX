import { DiameterIcon, LogOut, MessageCircleMoreIcon, ReceiptPoundSterlingIcon, Users2 } from "lucide-react";

export default function MainSideBar(){
    return (
        <div className="w-[20%] bg-[#222222] h-full border-r border-gray-500 flex flex-col justify-between items-center">
            <div className="ml-8 mt-5 w-[90%]">
                <span className="text-xs text-gray-400 font-bold font-sans">ORGANIZATION</span>
                <div className=" flex flex-col w-[95%] mt-2 text-gray-300 text-sm font-bold">
                    <span className="w-full p-2 mt-1 mb-1 border-0 rounded-md flex items-center hover:text-white hover:bg-[#121211]"><span className="mr-3"><DiameterIcon /></span>Rooms</span>
                    <span className="w-full p-2 mt-1 mb-1 border-0 rounded-md flex items-center hover:text-white hover:bg-[#121211]"><span className="mr-3"><Users2 /></span>People</span>
                    <span className="w-full p-2 mt-1 mb-1 border-0 rounded-md flex items-center hover:text-white hover:bg-[#121211]"><span className="mr-3"><ReceiptPoundSterlingIcon /></span>Billing</span>
                </div>
            </div>
             <div className="w-[95%] text-sm font-bold mb-5">
                    <button className="border border-gray-500 w-full p-2 flex justify-center items-center rounded-lg text-gray-300 hover:bg-[#121211] hover:text-white"><MessageCircleMoreIcon className="mr-3"/>Feedback</button>
                </div>
        </div>
    )
}