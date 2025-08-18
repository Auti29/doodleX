import CreateRoomComponent from "../components/CreateRoomComponent";
import NavBar from "../components/Navbar";
import Sidebar from "../components/SideBar";

export default function Dashboard() {
    return (
        <div className="h-[100vh] w-[100vw]">
            <div className="flex w-[100vw] justify-center mb-5">
            <NavBar />
            </div>
                
            <div className="w-[95%] m-auto flex justify-between"> 
                <Sidebar />
                <CreateRoomComponent />
            </div>
        </div>
    )
}