import axios from "axios";
import { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { Link } from "react-router-dom";
import Loader from "../../components/loader";
import ProductDeleteButton from "../../components/productDeleteButton.jsx";




export default function AdminProductPage(){

  //Saren sare wenas wene agayak  pennaganna web page useState react hook use kerenewa
  const [products,setProducts] =  useState([]);  //products eka array ekak widiyata thiyenawa setProducts eka function ekak widiyata thiyenawa
  const [loaded, setLoaded] = useState(false); // to track if products have been loaded this is use the page won't refresh after product deleted and also modifiide the useEffect to depend on loaded state

  useEffect(()=>{    //lamda function eka athule eka sarayak run wenna one todo eka dala ita passe aniwaryenma empty array ekak danna one , nattan ayyth web eka refresh wewi ekama deyak run wenawa 
    if (!loaded) {

        axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then((response)=>{
        console.log(response.data);
        setProducts(response.data);
        setLoaded(true); // mark as true(loaded) after loaded the page
      });
    }
  }, [loaded]);  //loaded dependency array eke value eka wenesak unoth useEffect eke athule thiyene function eka run wenewa 

  // axios.get(import.meta.env.VITE_BACKEND_URL + "/products").then(
  //   (response)=>{
  //     console.log(response.data);
  //     setProducts(response.data); // now here you can see the products are fetching again ad again in the console(refresh wewi ai ai run wenewa) , it beacuse this axios call is inside the component function,
                                   //  so every time the component re-renders, the axios call to backend again and agian. To fix this, you can use the useEffect hook to make the axios call only once when the component mounts.
  //   }
  // );
     
  return (
    // from using relative the components inside this it only behaves within the components inside it.
  <div className="w-full max-h-full flex justify-center p-10 relative bg-primary text-secondary">

    <div className="w-full overflow-auto rounded-xl shadow-lg border border-accent/20 bg-white">

      {/* we cover the table tag from {loaded && ...} so it will show the table only after the products are loaded (loaded is true) */}
      {/* {loaded ?<table></table>:<div>Loadin.......</div>  from this you can show if the loaded is true the table will show in the time table displaying period it will show loading like table is loading.... */}
      {loaded ?<table className="w-full text-left border-collapse"> 
        
        <thead className="bg-accent text-white uppercase text-sm tracking-wide">
          <tr>
            <th className="py-4 px-3">Image</th>
            <th className="py-4 px-3">Product ID</th>
            <th className="py-4 px-3">Name</th>
            <th className="py-4 px-3">Price</th>
            <th className="py-4 px-3">Labelled Price</th>
            <th className="py-4 px-3">Category</th>
            <th className="py-4 px-3">Brand</th>
            <th className="py-4 px-3">Model</th>
            <th className="py-4 px-3">Stock</th>
            <th className="py-4 px-3">Availability</th>
            <th className="py-4 px-3">Actions</th>
          </tr>
        </thead>

        <tbody className="text-sm">
          {products.map((item, index) => (  //product.map can get num of product(items) in side product array(if it has 3 items this will run 3 times and show the items)
                                            //<tr key> is used to identify each item uniquely and for solve this error(Each child in a list should have a unique "key" prop.) or you can use index also (0,1,2...)
            <tr key={index}
              className="border-b border-accent/10 hover:bg-primary/60 transition">
              <td className="py-3 px-3">
                <img
                  src={item.images[0]}
                  className="w-10 h-10 rounded-md object-cover shadow-md"
                />
              </td>
              <td className="py-3 px-3">{item.productID}</td>
              <td className="py-3 px-3 font-medium">{item.name}</td>
              <td className="py-3 px-3 text-gold font-semibold">
                Rs {item.price}
              </td>
              <td className="py-3 px-3">{item.labelledPrice}</td>
              <td className="py-3 px-3">{item.category}</td>
              <td className="py-3 px-3">{item.brand}</td>
              <td className="py-3 px-3">{item.model}</td>
              <td className="py-3 px-3">{item.stock}</td>
              <td className={`py-3 px-3 font-medium ${
                  item.isAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.isAvailable ? "In Stock" : "Out of Stock"}
              </td>
              <td className="px-4 py-3 text-sm">
										{/* placeholder cell for future actions; styled for consistency */}
										<div className="inline-flex items-center gap-2 ">
                      <ProductDeleteButton productid = {item.productID} reload={()=>{setLoaded(false)}}/> 
                        {/* productid and reload pass as props to the productDeleteButton */}
                    </div>
              
              </td>
            </tr>
          ))}
        </tbody>

      </table>:<Loader/>}
    </div>

    {/* Floating Add Button */}
    <Link to="/admin/add-product"
      className="fixed right-6 bottom-6 w-[55px] h-[55px] flex justify-center items-center 
                 text-5xl border-2 rounded-full text-white border-accent
                 bg-accent shadow-lg hover:bg-white hover:text-accent 
                 transition-all duration-300 hover:shadow-xl">
      <BiPlus />
    </Link>

  </div>
);

}
