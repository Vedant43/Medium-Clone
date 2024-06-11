import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs,useBlog } from "../hooks"

export const Blogs = () => {

    const {loading,blogs} = useBlogs()
    // const {blog} = useBlog()

    
    // const author:string = localStorage.getItem("authorId")
    console.log("from blogs compo: "+localStorage.getItem("authorId"))

    if(loading){
        return <div>
            
<div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only"></span>
</div>


        </div>
    }

    return (
        <div>
            <Appbar name={localStorage.getItem("authorId")}/>
            <div className="flex justify-center">
              <div className="">
                {blogs.map(blog => <BlogCard id={blog.id} authorName={blog.author.name || "Ano"} title={blog.title} content={blog.content} publishedDate={"2nd feb"}/>)}
              </div>  
            </div>
        </div>
    )
}