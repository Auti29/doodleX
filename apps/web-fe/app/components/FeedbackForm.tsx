"use client"

import { BugIcon, GitForkIcon, Link } from "lucide-react";

export default function FeedbackForm() {
    return (
        <div className="text-white border border-gray-500 rounded-lg w-[60%] font-mono flex flex-col justify-center items-center fixed top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-6">
            <h1 className="text-4xl font-extrabold mb-4 font-mono">Report a Bug!</h1>
            <div className="mb-3">
            <h2 className="flex ">
             <BugIcon size={28}/>
            <span className="text-lg font-bold ml-2">Raise an issue on the repository</span>

            </h2>
            <p className=" text-gray-400 ml-10 mt-1">
            If you encounter any bugs or issues while using DoodleX, please raise an issue on the repository so I can investigate and address the problem.
            </p>
            </div>



            <div>
            <h2 className="flex">
            <GitForkIcon size={28}/>
            <span className="text-lg font-bold ml-2">
                Contribute to the repository
            </span>

            </h2>
               <p className=" text-gray-400 ml-10 mt-1">
            If you have the skills and expertise to fix bugs or improve DoodleX, your contributions are welcome. You can contribute by forking the repository, making the necessary changes, and submitting a pull request.
            </p>
            </div>
            <div className="flex  p-2 mt-2 w-[37%] justify-between items-center m-auto">
                <button 
                onClick={() => {
                    window.open("https://github.com/auti29/doodleX/issues", "_blank");
                }}
                className="text-white pt-2 pb-2 pl-5 pr-5 bg-blue-600 hover:bg-blue-200 rounded-lg hover:text-black cursor-pointer">
                    Raise an Issue
                </button>
                
               <button 
                onClick={() => {
                    window.open("https://github.com/auti29/doodleX/", "_blank");
                }}
               className="text-white pt-2 pb-2 pl-5 pr-5 border-2 border-blue-600 hover:border-blue-200 hover:bg-gray-600  rounded-lg  cursor-pointer">
                
                    Contribute
                </button>
            </div>
        </div>
    )
}