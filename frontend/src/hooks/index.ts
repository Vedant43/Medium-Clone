import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"

export interface Blog {
    
        "content": string,
        "title": string,
        "id": string,
        "author": {
            "name": string
        }
}

export const useBlog = ({id} : {id:string}) => {
    const [loading,setLoading] = useState(true)
    const [blog,setBlog] = useState<Blog[]>([])

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem("token") || ""
                    }
                });
                setBlog(response.data.post);
                setLoading(false);
                console.log("Updated blog:", blog);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    return { loading, blog };
}


export const useBlogs = () => {
    const [loading,setLoading] = useState(true)
    const [blogs,setBlogs] = useState<Blog[]>([])


    useEffect(()=>{
        
        console.log(localStorage.getItem("token"))
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
            headers: {
                Authorization:localStorage.getItem("token")
            }
        })
            .then(response => {
                setBlogs(response.data.post)
                setLoading(false)
            })
    }, [])

    return {
        loading, blogs
    }
}
