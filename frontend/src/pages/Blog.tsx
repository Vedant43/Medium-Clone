import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";

export const Blog = () => {
    const {id}= useParams()

    const {loading,blog} = useBlog({
        id:id || ''
    });

    // console.log("New " + blog.author.name)
    if(loading){
        <div>
            loading...
        </div>
    }

    return (
        <div>
            <Appbar name={localStorage.getItem("authorId")}/>
            <FullBlog blog={blog}/>
        </div>
    )
}