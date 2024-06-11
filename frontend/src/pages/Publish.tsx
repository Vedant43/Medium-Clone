import { Appbar } from "../components/Appbar"
import axios from 'axios'
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useBlog } from "../hooks"

export const Publish = () => {

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    // const {blog} = useBlog()
    const navigate = useNavigate()

    return (
        <div>
            <Appbar name={localStorage.getItem("authorId")}/>
            <div className="flex justify-center w-full mt-4">
                <div className="max-w-screen-lg w-full">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder=" title"></input>
                <TextEditor onChange={(e)=>{
                    setDescription(e.target.value)
                }}/>
                    <button onClick={async ()=>{
                                                console.log("hi2")

                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                            title,
                            content:description,
                        },{
                            method: "POST", 
                            headers:{
                                Authorization:localStorage.getItem("token")
                            }
                        })
                        navigate(`/blog/${response.data.id}`)
                    }
                    } type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800">
                        Publish post
                    </button>
                </div>
                
            </div>
        </div>
    )
}

function TextEditor({ onChange } : {onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void}) {
    return (
        <div>
            <form>
                <div className="w-full mb-4  border-gray-200 rounded-lg bg-gray-50 my-2 ">
                    
                    <div className="px-4 py-2 bg-white rounded-b-lg w-full border">
                        {/* <label >Publish post</label> */}
                        <textarea onChange={onChange} className=" block w-full px-0 text-sm text-gray-800 bg-white focus:outline-none" placeholder="Write an article..." required ></textarea>
                    </div>
                </div>
                
            </form>

        </div>
    )
}