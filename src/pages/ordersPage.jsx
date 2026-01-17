import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import ViewOrderInfoCustomer from "../components/viewOrderInfoCustomer";

export default function OrdersPage() {
	const [orders, setOrders] = useState([]);
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		console.log(orders)
        const token = localStorage.getItem("token");
		if (!loaded) {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/orders", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
				.then((response) => {
					// console.log(response.data);
					setOrders(response.data);
					setLoaded(true);
				});
		}
	}, [loaded]);

	return (
		<div
			className="w-full flex justify-center p-10 relative
      bg-gradient-to-b from-primary to-white text-secondary"
		>
			{loaded ? (
				<table
					className="w-full max-w-7xl table-auto border-separate border-spacing-0
        rounded-2xl overflow-hidden shadow-xl bg-white/70 
        "
				>
					<thead className="sticky top-0 ">
						<tr className="bg-secondary text-primary/95">
							<th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
								Order ID
							</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Customer email
							</th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Customer name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
                                Actions
                            </th>
						</tr>
					</thead>

					<tbody className="divide-y divide-secondary/10">
						{orders.map((order, index) => {
							return (
								<tr
									key={index}
									className="odd:bg-primary/60 even:bg-white hover:bg-primary/90 transition-colors"
								>
								
									<td className="px-4 py-3 text-sm font-medium text-secondary/90">
										{order.orderId}
									</td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {order.email}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {order.name}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {new Date(order.date).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        {order.status}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
                                        LKR. {order.total.toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3 text-sm font-medium text-secondary/90">
										<ViewOrderInfoCustomer order={order} />
                                    </td>
									
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<Loader />
			)}

		</div>
	);
}


// Difference between [] and [loaded] in useEffect dependency array:
// - []: The effect runs only once after the initial render.(products tika kohomath home page eke render kerannna one nisa empty array ekak use kerenewa, 
// 														 ethekota react eka check keraddi empty array ekak nam thiyenne useEffect eka ekasarayak run kerenewa)

// - [loaded]: The effect runs after the initial render and whenever 'loaded' changes.(orders page eke orders pennanne log una user kenekta GiWavyItinerary,
// 														 							ethekota loaded variable eka change wenakota useEffect eka run wenawa, 
// 																					ayth if(!loaded) eka check keraddi false mokakda palaweni sare useEffect eka run keraddi 
// 																					setLoaded(true) keregannawa ethenin ehata useEffect eka wadakeranne na stop wenewa.

// 		loaded = false (React always runs useEffect once when the page loads.) -> if (!loaded) // true (API call happens) -> setLoaded(true);(API finishes) -> 
// 		loaded = true (“Oh! loaded changed — I must run useEffect again.”) -> if (!loaded) // false (useEffect runs again, API is NOT called, because loaded is true now, And that’s the end.)																			
// )