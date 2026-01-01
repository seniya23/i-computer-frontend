import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage.jsx";
import ProductOverviewPage from "./productOverview.jsx";
import Cart from "./cart.jsx";
import CheckoutPage from "./checkOutPage.jsx";
import OrdersPage from "./ordersPage.jsx";
import Home from "./homeContent.jsx";

export default function HomePage(){

    return(
        <div className="w-full h-full overflow-y-scroll max-h-full">
            <Header/>
            <div className="w-full min-h-[calc(100%-100px)]">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/products" element={<ProductPage/>}/>
                    <Route path="/overview/:productID" element={<ProductOverviewPage/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<CheckoutPage/>}/>
                    <Route path="/orders" element={<OrdersPage/>}/>
                    <Route path="/about" element={<h1>About Page</h1>}/>
                    <Route path="/contact" element={<h1>Contact Page</h1>}/>
                    <Route path="/*" element={<h1>Page not found</h1>}/>
                </Routes>
            </div>
            
        </div>
    )
}