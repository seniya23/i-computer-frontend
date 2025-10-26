import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function AdminProductPage(){
    return(
        // from using relative the components inside this it only behaves within the components inside it.
        <div className="w-full h-full flex justify-center items-center relative">
            Product Page

            {/* <BiPlus/> is a add button */}
            <Link to = "/admin/add-product" className="absolute right-[20px] bottom-[20px] w-[50px] h-[50px] flex justify-center items-center text-6xl border-[2px] rounded-full hover:text-white hover:bg-accent text-accent border-accent"><BiPlus/></Link>

        </div>
    )
}