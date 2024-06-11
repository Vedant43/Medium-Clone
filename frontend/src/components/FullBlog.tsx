// import { Blog } from "../hooks"
// import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog = ({blog}:{blog:any}) => {
    // const author = blog && blog.author && blog.author.name
    // console.log("here223"+blog.content)
    // console.log("here223"+blog.title)
    // console.log(blog.author && blog.author.name)

    return (
        <div>
            {/* <Appbar/> */}
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-20 w-full pt-200 max-w-screen-2xl pt-12">
                    <div className="col-span-8 ">
                        <div className="text-5xl front-extrabold">
                            {blog.title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            Post on 29th February 2024
                        </div>
                        <div className="pt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-span-4">
                        
                        <div className="text-slate-600 text-lg">
                            
                            Author

                        </div>
                        <div className="flex">
                        <div className="pr-4 flex flex-col justify-center">
                            {/* <Avatar name={blog && blog.author && blog.author.name} size="small"/> */}
                            {/* <Avatar name={blog && blog.author && blog.author.name}></Avatar> */}
                            
                            {/* <Avatar name={localStorage.getItem("authorId")}/> */}
                        </div>
                            <div className="">
                                <div className="text-xl font-bold ">
                                    {blog && blog.author && <div>{blog.author.name}</div>}
                                </div>
                                <div className="pt-2 text-slate-500">
                                    Random catch phrase about the author to grab the customer's attention
                                </div>    
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}