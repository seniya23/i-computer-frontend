export default function TestPage(){
    return(
        <div className="w-[600px] h-[600px] bg-red-600">
            <div className="w-[100px] h-[100px] bg-green-600"></div>

            {/* m-[30px] means div class use marging with around components and mb-[30px] means div class use marging with
             bottom component, like these you can use ml-[30px] and mr-[30px] for left right */}
            <div className="w-[100px] h-[100px] bg-blue-600 m-[30px] mb-[50px]"></div>
            <div className="w-[100px] h-[100px] bg-yellow-500"></div>
            <div className="w-[100px] h-[100px] bg-amber-950"></div>
        </div>
    )
}