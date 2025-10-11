import { useState } from "react";

export default function Test(){

    //hook1
    //hook2
    const [count, setCount] = useState(0)


    return(
        <div className='h-full w-full flex justify-center items-center'>
            <div className='h-[300px] w-[400px] shadow-2xl flex justify-center items-center
            '>

                <button className="w-[100px] h-[50px] bg-red-600  text-white" 
                onClick={()=> {
                    setCount(count -1)
                    
                    }}>Decrement</button>

                   <h1 className="w-[100px] h-[50px] text-[30px] text-center">{count}</h1> 

                <button className="w-[100px] h-[50px] bg-blue-600  text-white"
                onClick={()=>{
                    setCount(count +1)
                    
                }}>Increment</button>

        
      </div>
    </div>
    )
}