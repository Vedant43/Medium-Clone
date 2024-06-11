import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { signUpInput } from "@vedant567/medium-common"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios';
import { BACKEND_URL } from "../config";

export const Auth = ({type}: {type:'signup' | 'signin'}) => {

    const navigate = useNavigate();
    const [postInputs, setPostInputs] = useState<signUpInput>({
        name:"",
        email:"",
        password:""
    })

    async function sendRequest(){
        try{
            console.log(postInputs)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, postInputs)
            console.log(response)
            const jwt = response.data.token
            console.log(jwt)
            localStorage.setItem("token",jwt)
            localStorage.setItem("authorId",response.data.id)

            navigate("/blogs")
        }catch(e){
            console.log(e)
        }
    }

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div className="">
                    <div className="px-10">
                        <div className="text-3xl font-extrabold">
                            Create an Account
                        </div>
                        <div className="text-slate-400">
                            {type === 'signin' ? "Don't have an account?" : 'Already have an Account?'}
                            <Link className='pl-2 underline' to={type === 'signin' ? "/signup" : '/signin'}>
                                {type === 'signup' ? 'Sign in' : 'Sign up'}
                            </Link>
                        </div>
                    </div>

                    <div className="pt-8">
                        {type === 'signup' ? <LabelledInput label="Name" placeholder="Vedant Suthar" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                name:e.target.value
                            })
                        }}/> : null}
                        <LabelledInput label="Email" placeholder="Vedant@gmail.com" onChange={(e)=>{
                            setPostInputs({
                                ...postInputs,
                                email:e.target.value
                            })
                        }}/>
                        <LabelledInput label="Password" type={'password'} placeholder="Vedant Suthar" onChange={(e)     =>{
                            setPostInputs({
                                ...postInputs,
                                password:e.target.value
                            })
                        }}/>
                        <button onClick={sendRequest} type="button" className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === 'signup' ? 'Sign up' : 'Sign in'}</button>

                    </div>
                    
                </div> 
            </div>
        </div>
    )
}

interface LabelledInputType {
    label:string,
    placeholder:string,
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    type?:string
}

function LabelledInput({ label,placeholder,onChange,type}: LabelledInputType){
    return (
        <div className="">
             <div>
            <label className="block mb-2 text-sm font-medium text-black text-bold pt-4">{label}</label>
            <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} required />
        </div>
        </div>
    )
}