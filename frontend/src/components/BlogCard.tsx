import { Link } from "react-router-dom"

interface BlogcardProps {
    id:string
    authorName: string,
    title:string,
    content:string
    publishedDate:string
}

export const BlogCard = ({
    authorName,
    id,
    title,
    content,
    publishedDate}:BlogcardProps) => {
    return (<Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 pb-4 w-screen max-w-screen-lg cursor-pointer">
            <div className="flex">
                <div className="flex justify-center flex-col ">
                    <Avatar name={authorName} />
                
                </div>
                <div className="flex justify-center flex-col font-extralight pl-2 text-sm">
                    {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle/>
                </div>
                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    {publishedDate}
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                {title}
            </div>
            <div className="text-md font-thin">
                {content.slice(0,100) + "..."}
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                {`${Math.ceil(content.length / 100)} minute(s)`}
            </div>
            <div >

            </div>
        </div>
        </Link>
    )
}

// function Avatar({name} : {name : string, size?:number}) {
//     return (
//         <div className={`relative inline-flex items-center justify-center w-4 h-4 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
//             <span className="text-xs font-extralight text-gray-600 dark:text-gray-300">{}</span>
//         </div>
//     )
// }

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {

    // console.log("Hi from final vatar " + name[0])

    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-200  rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600`}>
        {name[0]}
    </span>
</div>
}

function Circle() {
    return <div className="w-1 h-1 rounded-full bg-slate-400">

    </div>
}