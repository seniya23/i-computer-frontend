import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { AiOutlineProduct } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import uploadFile from "../../utils/mediaUpload";

export default function AdminUpdateProductPage(){
    const location = useLocation(); //useLocation hook eka use karanne navigate kara page eke data ganna(json values ekak ganna)
    const [productID, setProductID] = useState(location.state.productID); //location.state use karanne navigate kara page eke data ganna
    const [name, setName] = useState(location.state.name);
    const [altNames, setAltNames] = useState(location.state.altNames.join(",")); //join(",") use karanne array eka string ekakata convert karanna , beacuse altNames eka array ekak widiyata thiyenawa
    const [description, setDescription] = useState(location.state.description);
    const [price, setPrice] = useState(location.state.price); //you can change this useState defualt value to this ("") , when it's changed in web application input field will change 0 to empty amount  
    const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
    const [files, setFiles] = useState([])
    const [category, setCategory] = useState(location.state.category);
    const [model, setModel] = useState(location.state.model);
    const [brand, setBrand] = useState(location.state.brand);
    const [stock, setStock] = useState(location.state.stock);
    const [isAvailable, setIsAvailable] = useState(location.state.isAvailable); //UseState hook eka use karanne boolean value(array ekaka values dekak) eka track karanne (true or false)
    const navigate = useNavigate(); //useNavigate hook eka use karanne navigate karanne page ekakata

    //useNavigate hook is use here for navigate again to login page or a user page when unotherized credential try to add products
    if (!location.state) {
        window.Location.href = "/admin/products";
    }

    async function updateProduct() {
        
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("You must be loged in as admin to update product");
            navigate("/login");
            return;
        }
        console.log(files);

        const imagePromises = []; //ee promise tika daganna array eka

        // files.forEach((file) => {
        //     const promises = uploadFile(File); //image files okkoma upload kerela dennm kiyena promise eka
        //     imagePromises.push(promises); //imagePromises kiyena array ekata promise tika daganna line eka

        // })

        for(let i=0; i<files.length; i++){
            const promise = uploadFile(files[i]);
            imagePromises.push(promise);
        }

        let images = await Promise.all(imagePromises).catch((err)=>{ //promise tika resolve wenakota images kiyana array ekata public url tika gannawa
            console.log("Error uploading images:", err);
            toast.error("Error uploading images. Please try again.");
            return;
        });

         if(images.length == 0){
            images = location.state.images;
        }
            
        if(productID == "" || name == "" || description == "" || category == "" || brand == "" || model == ""){
            toast.error("Please fill all the required fields");
            return;
        }

        try{
            // split(",") use beacuse user enter in input field like this ex: sdfdfsd, sdfdfds, sdfdsf , but back-end model recive data as an array beacuse we create model like this ex: images : {
                                                                                                                                                                                                //    type : [String],
                                                                                                                                                                                          //    required : true , 
            //So we have to covert this string  "sdfdfsd, sdfdfds, sdfdsf" to an array, using .split(",") it convert to an array ['sdfdfsd', 'sdfdfds', 'sdfdsf'] like this.
            const altNamesInArray = altNames.split(",")
            // const imagesInArray = images.split(",")
            await axios.put(import.meta.env.VITE_BACKEND_URL + "/products/"+productID,{ //productID eka url eke path ekata danna one beacuse backend eken me id eka use karanne product eka update karanna
                name : name,
                altNames : altNamesInArray,
                description : description,
                price : price,
                labelledPrice : labelledPrice,
                images : images,
                category : category,
                brand : brand,
                model : model,
                stock : stock,
                isAvailable : isAvailable,
            },{
                headers : {
                    // in here we use bearer part beacuse in backend bearer part removes , it needs a bearer part to remove other wise it's getting error
                    Authorization : "Bearer "+token
                }
            })
            toast.success("Product udated successfully!");
            navigate("/admin/products");

        }catch(err){
            toast.error("Error updating product. Please try again.");
            console.log("Error updating product");
            console.log(err);
        }
    }

    return(
        <div className="w-full h-full flex justify-center p-[50px] items-start overflow-y-scroll">
            <div className="w-[800px] bg-accent/80 rounded-2xl p-[40px] shadow-2xl overflow-y-visible">
            <h1 className="w-full text-xl text-primary mb-[20px] flex items-center gap-[5px]"><AiOutlineProduct/> Update Product</h1>

                 {/* flex-wrap is items wrap to a new line or column when they run out of space */}
                <div className="w-full bg-white p-[20px] flex flex-row flex-wrap justify-between rounded-xl shadow-2xl">

                    {/* my-[20px] use for change the gap between two div classes */}
                    <div className="my-[10px] w-[40%]">
                        <label>Product ID</label>
                        <input 
                        disabled
                        type="text" 
                        value={productID} 
                        onChange={(e)=>{setProductID(e.target.value)}} className="w-full h-[40px] border border-accent shadow-2xl px-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"/>
                       
                    </div>

                    <div className="my-[10px] w-[40%]">
                        <label>Name</label>
                        <input 
                        type="text" 
                        value={name} 
                        onChange={(e)=>{setName(e.target.value)}} className="w-full h-[40px] border border-accent shadow-2xl px-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>

                    <div className="my-[10px] w-full">
                        <label>Alternative Name</label>
                        <input 
                        type="text"
                        value={altNames} 
                        onChange={(e)=>{setAltNames(e.target.value)}} className="w-full h-[40px] border border-accent shadow-2xl px-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"/>
                        <p className="text-sm text-gray-500 w-full text-right">Seperate multiple names with commas</p>
                    </div>

                    <div className="my-[10px] w-full">
                        <label>Description</label>
                        <textarea 
                        value={description} 
                        onChange={(e)=>{setDescription(e.target.value)}} className="w-full h-[100px] border border-accent shadow-2xl px-[20px] py-[10px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>

                    <div className="my-[10px] w-[40%]">
                        <label>Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                            }}
                            className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Labelled Price</label>
                        <input
                            type="number"
                            value={labelledPrice}
                            onChange={(e) => {
                                setLabelledPrice(e.target.value);
                            }}
                            className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>

                    <div className="my-[10px] w-full">
                        <label>Images</label>
                        <input 
                        type="file" 
                        multiple = {true} //to select multiple files
                        onChange={(e)=>{
                            setFiles(e.target.files);
                            }} 
                            className="w-full h-[40px] border border-accent shadow-2xl px-[20px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent"/>
                    </div>

                    <div className="my-[10px] flex flex-col w-[30%]">
                        <label>Category</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]">
                            <option value="CPU">CPU</option>
                            <option value="Graphic Cards">Graphic Cards</option>
                            <option value="Motherboards">Motherboards</option>
                            <option value="Power Supplies">Power Supplies</option>
                            <option value="RAM">RAM</option>
                            <option value="Storage Devices">Storage Devices</option>
                            <option value="Cooling Solutions">Cooling Solutions</option>
                            <option value="Computer Cases">Computer Cases</option>
                            <option value="Mouse and Keyboards">Mouse and Keyboards</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Monitors">Monitors</option>
                            <option value="Computers">Computers</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Cables">Cables</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="my-[10px] w-[30%]">
                        <label>Brand</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => {
                                setBrand(e.target.value);
                            }}
                            className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>
                    <div className="my-[10px] w-[30%]">
                        <label>Model</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => {
                                setModel(e.target.value);
                            }}
                            className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>
                    <div className="my-[10px] w-[40%]">
                        <label>Stock</label>
                        <input
                            type="number"
                            value={stock}   
                            onChange={(e) => {
                                setStock(e.target.value);
                            }}
                            className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]"
                        />
                    </div>
                    <div className="my-[10px] w-[40%] flex flex-col items-center">
                        <label>Available</label>
                        <select value={isAvailable} onChange={(e) => setIsAvailable(e.target.value)} className="w-full h-[40px] rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent border border-accent shadow-2xl px-[20px]">
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                    
                    <Link to="/admin/products" className="w-[49%] h-[50px] bg-red-500 text-white font-bold  rounded-2xl flex justify-center items-center hover:bg-red-700 border-[2px]  mt-[20px]">
                        Cancel
                    </Link>
                    <button onClick={updateProduct} className="w-[49%] h-[50px] bg-accent text-white font-bold  rounded-2xl hover:bg-transparent hover:text-accent border-[2px] border-accent mt-[20px]">
                        Update Product
                    </button>
                
                </div>
            </div>
        </div>
    )
}