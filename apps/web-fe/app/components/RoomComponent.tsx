"use client"

import Link from "next/link";

export default function RoomComponent({slug, roomId, description}: {slug: string, roomId:number, description?: string}) {
    return (
        <div className="bg-[#161616] border-1 border-gray-500 p-4 flex flex-col flex-wrap justify-center rounded-lg m-2 w-[30%]">
            <div className="flex items-center">
            <span className="font-mono font-bold text-gray-300 text-lg underline decoration-blue-600">{slug}</span>
            <span className="mx-2 text-gray-500 text-2xl font-bold text-center">|</span>
            <span className="border border-gray-500 text-xs py-1 px-3 flex justify-baseline items-center rounded-full bg-slate-800">
                 <span className="relative flex h-5 w-5 mr-3">
                    <span
                    className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-65"
                    ></span>
                    <span
                    className="relative inline-flex h-3 w-3 m-auto rounded-full bg-green-500"
                    ></span>
            </span>
                <span className="font-bold font-mono">1 Active users</span>
            </span>
            </div>
            <div className="text-gray-300 text-sm my-2">
                {
                    description 
                    ?
                    <p className="mt-2 mb-1 text-sm text-gray-400">{description}</p>
                    :
                    <p className="text-sm text-gray-500 italic">No description</p>
                }
            </div>
            <Link href={`/canvas/${roomId}`}>
            <button className="bg-blue-600 text-white font-bold border-0 rounded-md pt-1 pb-1 pl-6 pr-6 cursor-pointer hover:bg-blue-200 hover:text-black">View Space</button>
            </Link>
        </div>
    );
}