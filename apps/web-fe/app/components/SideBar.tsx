import RoomComponent from "./RoomComponent";

export default function Sidebar () {
    return (
        <div className="border-3 border-gray-200 m-2 w-[48%] p-2 rounded-lg shadow-lg">
            <h2 className="font-bold text-lg text-gray-500 mb-3 ml-1.5">Existing Spaces</h2>
            <div>
            <RoomComponent />
            <RoomComponent />
            <RoomComponent />
            <RoomComponent />
            <RoomComponent />
            </div>
        </div>
    )
}