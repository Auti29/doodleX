import { ReactNode } from "react"

export default function IconBtn({
    icon, 
    onClick, 
    activated
}: {
    icon: ReactNode, 
    onClick?: () => void, 
    activated: boolean
}) {
    return (
        <div
        onClick={onClick} 
        className={`bg-black font-bold text-mg border border-white rounded-full p-2 hover:bg-gray-600 ${activated ? "text-red-400" : "text-white"}`}>
            {icon}
        </div>
    )
}