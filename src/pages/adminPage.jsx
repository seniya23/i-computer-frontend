import { Link, Route, Routes } from "react-router-dom";
import { LuBox, LuBoxes, LuClipboardList } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import AdminProductPage from "./admin/adminProductsPage";
import AdminAddProductPage from "./admin/adminAddProductPaage";

export default function AdminPage(){

    return(
    
    <div  className="w-full h-full flex bg-accent">
        <div  className="w-[300px] h-full bg-accent">
            <div  className="w-full h-[100px] text-primary flex items-center">
                <img src="/logo.png" className="h-full"/>
                <h1 className="text-2xl">Admin </h1>
            </div>

            <div  className="w-full h-[400px] text-white text-2xl flex flex-col pl-[20px] pt-[20px]">
                
                {/* use <Link> tag instid of usinkg <a href> becuase you can stop refreshing when moving among pages */}
                <Link to="/admin" className="w-full flex items-center h-[50px] gap-[10px]"><LuClipboardList/>Orders</Link>
                <Link to="/admin/products" className="w-full flex items-center h-[50px] gap-[10px]"><LuBoxes/>Products</Link>
                <Link to="/admin/users" className="w-full flex items-center h-[50px] gap-[10px]"><FiUsers/>Users</Link>
                <Link to="/admin/reviews" className="w-full flex items-center h-[50px] gap-[10px]"><MdOutlineRateReview />Reviews</Link>
                
            </div>


        </div>

        {/* you can use calc option in css to do calculations for colors, becuase pixel size
         depend on monitor size but using this method soleve that problem */}
        <div className="w-[calc(100%-300px)] bg-primary h-full max-h-full border-[10px] rounded-3xl border-accent overflow-y-scroll">
            <Routes>
                <Route path="/" element={<h1>Orders</h1>}/>
                <Route path="products" element={<AdminProductPage/>}/>
                <Route path="add-product" element={<AdminAddProductPage/>}/>
                <Route path="users" element={<h1>Users</h1>}/>
                <Route path="reviews" element={<h1>Reviews</h1>}/>
            </Routes>
            
        </div>

    </div>
    )
}