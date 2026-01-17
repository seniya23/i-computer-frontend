import axios from "axios";
import { useEffect, useState } from "react";

export default function CartPage1() {
    const [cart, setCart] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
            const token = localStorage.getItem("token");
        
            if (!loaded) {
                axios
                    .get(import.meta.env.VITE_BACKEND_URL + "/carts/" , {
                        headers: {
                            Authorization: `Bearer ${token}`
                        },
                        
                    })
                    .then((response) => {
                        console.log(response.data);
                        const items = Array.isArray(response.data) ? response.data : (response.data.items || response.data.cart || []);
                        setCart(items);
                        //setCart(response.data);
                        setLoaded(true);
                    });
            }
        }, [loaded]);



    return(
        <div className="w-full flex flex-col items-center p-[20px]">
            {cart.map((item, index) => {
				return (
                <div
                    key={index}
                    className="w-full lg:w-[50%] pt-[20px] relative lg:h-[150px] rounded-xl overflow-hidden shadow-2xl my-1 flex justify-between">
                    <h1 className="lg:hidden w-full overflow-hidden h-[20px] absolute top-[0px]">
							{item.name}
						</h1>
						<div className="h-full flex flex-col">
							<img
								src={item.image}
								className="h-[80px] lg:h-full aspect-square object-cover"
							/>
							{item.labelledPrice > item.price && (
								<h2 className="text-secondary/80 line-through decoration-gold/70 decoration-2 mr-2 text-sm">
									LKR. {item.labelledPrice.toFixed(2)}
								</h2>
							)}
							<h2 className="text-sm text-accent font-semibold mt-1 lg:mt-2">
								LKR. {item.price.toFixed(2)}
							</h2>
						</div>
                </div>
                )
            })}

            </div>
        
    )
}