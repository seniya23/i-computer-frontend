
import { useState } from "react";
import uploadFile from "../utils/mediaUpload";



export default function TestPage(){
    const[file,setFile] = useState(null);

    async function handleUpload(){
        const url = await uploadFile(file); //function file is imported from mediaUpload.js
        console.log("File uploaded at:", url);

        
    }
    return(
        // <div className="w-[600px] h-[600px] bg-red-600">
        //     <div className="w-[100px] h-[100px] bg-green-600"></div>

        //     {/* m-[30px] means div class use marging with around components and mb-[30px] means div class use marging with
        //      bottom component, like these you can use ml-[30px] and mr-[30px] for left right */}
        //     <div className="w-[100px] h-[100px] bg-blue-600 m-[30px] mb-[50px]"></div>
        //     <div className="w-[100px] h-[100px] bg-yellow-500"></div>
        //     <div className="w-[100px] h-[100px] bg-amber-950"></div>
        // </div>

        <div className="w-full h-full flex justify-center items-center">
            <input type="file" onChange={(e)=>{
            setFile(e.target.files[0]);
        }}/>
        <button onClick={handleUpload} className="bg-red-900 pt-2 text-white rounded-xl">Upload</button>
        </div>
    )
}