import { useEffect, useState } from "react";
import Loader from "../components/loader";
import axios from "axios";
import { ProductCard } from "../components/productCard";


export default function ProductPage(){
   
	const [products, setProducts] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/products")
				.then((response) => {
					console.log(response.data);
					setProducts(response.data); //Saves products into React state
					setLoaded(true); //Marks that data is loaded (prevents re-fetching)
				});
		}
	}, []); // React checks the dependency array, If it’s empty → nothing to watch, So React runs the effect only on the first render, It never runs again

	return (
        
		<div className="w-full h-[calc(100vh-100px)]">
       {!loaded ? (<Loader />) : (
				<div className="w-full flex justify-center p-4 flex-row flex-wrap pt-[100px] ">
					{/* Search bar */}
					<div className="w-full h-[100px] sticky top-0 bg-white flex justify-center items-center mb-4 shadow-md z-10">
						<input
							type="text"
							placeholder="Search products..."
							className="w-1/2 px-4 py-2 border border-secondary/30 rounded-lg outline-none"							
							onChange={async (e) => {

								if (e.target.value == "") {
                                    setLoaded(false);
									await axios
										.get(import.meta.env.VITE_BACKEND_URL + "/products")
										.then((response) => {
											console.log(response.data);
											setProducts(response.data);
											setLoaded(true);
										});
                                    setLoaded(true);
								}else{
                                    await axios
                                        .get(
                                            import.meta.env.VITE_BACKEND_URL +
                                                "/products/search/" +
                                                e.target.value
                                        )
                                        .then((response) => {
                                            console.log(response.data);
                                            setProducts(response.data);
                                        });
                                    setLoaded(true);
                                }
							}}
						/>
					</div>

					{products.map((item) => {
                        return (
                            <ProductCard key={item.productID} product={item}/> //key is using for react to say “This element is the same one as before”, so it can match old items with new items correctly, won't rendering the same item,
																				//And always trying to use unique value for key (like productID, orderID, userID...), if dosent have one use index.
                        );
                    })}
                </div>
            )
        }
        </div>
    );
                
}

//const [products, setProducts] = useState([]);

//product → current value of the state
//setProducts → function to update that value
//useState → starting value
