import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import Loader from "../components/loader";
//import { useNavigate, useParams } from "react-router-dom";

export default function ProductOverviewPage(){

    const params = useParams(); // useParams hook eka use karala url eke path eken ena productID eka gannawa
    //const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [status, setStatus] = useState("loading"); //loading, error, success
   
    useEffect(() => {
		if (status == "loading") {
			axios
				.get(import.meta.env.VITE_BACKEND_URL + "/products/" + params.productID)
				.then((response) => {
					setProduct(response.data);
					setStatus("success");
				})
				.catch(() => {
					toast.error("Product Not Found");
					setStatus("error");
				});
		}
	}, []);
	return (
		<>
			{status == "loading" && <Loader />}
			{status == "error" && (
				<h1 className="text-center mt-10 text-2xl">Error loading product.</h1>
			)}
			{status == "success" && (
				<div className="w-full h-[calc(100vh-100px)] flex flex-col lg:flex-row">
					<h1 className="text-4xl font-semibold lg:hidden text-center sticky top-0 bg-white">
						{product.name}
					</h1>
                    </div>
            )}
        </>
    )
}