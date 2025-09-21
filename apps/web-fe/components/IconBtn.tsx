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
        className={`m-0.5 border-0 rounded-md font-bold text-mg p-2 hover:bg-gray-600 text-white ${activated ? "bg-gray-600" : "bg-slate-800"}`}>
            {icon}
        </div>
    )
}