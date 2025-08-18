"use client"

export default function RoomComponent() {
    return (
        <div className="bg-gray-200 border-2 border-gray-200 p-2 flex justify-between items-center rounded-lg m-2">
            <span className="font-mono font-bold text-gray-600 text-lg">room name</span>
            <button className="bg-blue-600 text-white font-bold border-0 rounded-md pt-1 pb-1 pl-6 pr-6 cursor-pointer hover:bg-blue-200 hover:text-black">View</button>
        </div>
    );
}