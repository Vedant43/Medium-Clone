import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar = ({name}:{name?:any}) => {

    return (
        <div className="border-b flex justify-between px-10 py-4">
            <Link to={'/blogs'} className="flex flex-col justify-center cursor-pointer">
                Medium
            </Link>
            <div className="">
                <Link to={'/publish'}>
                <button type="button" className="mr-4 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">New</button>
                </Link>
                <Avatar size = {"big"} name={name}/>
            </div>
        </div>
    )
}

// export function Avatar({name} : {name : string, size?:number}) {
//     console.log("name from avatar: " +name)
//     return (
//         <div className={`relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
//             <span className="text-md font-extralight text-gray-600 dark:text-gray-300">{name.charAt(0)}</span>
//         </div>
//     )
// }