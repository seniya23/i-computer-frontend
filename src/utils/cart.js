// const sampleCart = [
//     {
//         productID: "PROD001",
//         name: "Sample Product 1",
//         price: 1999.99,
//         labelledPrice: 2499.99,
//         quantity: 1,
//         image: "https://via.placeholder.com/150"
//     },
//     {
//         productID: "PROD002",
//         name: "Sample Product 2",
//         price: 2999.99,
//         labelledPrice: 3499.99,
//         quantity: 2,
//         image: "https://via.placeholder.com/150"
//     }
// ]

import toast from "react-hot-toast";


export function getCart(){

    const cartString = localStorage.getItem("cart"); // get the cart from local storage

    if(cartString == null){
        localStorage.setItem("cart", "[]"); // if doesn't have a cart create an empty cart
        return []
    }else{
        const cart = JSON.parse(cartString); // if have a cart parse(convert) it to json
        return cart;
    }
}

export function addToCart(product, quantity){

    const cart = getCart();

    //check if product is already in cart

    const index = cart.findIndex(
        (item)=>{
            return item.productID == product.productID
        }
    )
    if(index == -1){  // product not in cart add new product
        cart.push(
            {
                productID: product.productID,
                name: product.name,
                price: product.price,
                labelledPrice: product.labelledPrice,
                quantity: quantity,
                image: product.images[0]
            }
        )
        toast.success(`${product.name} added to cart`);
    }else{
        const newQty = cart[index].quantity + quantity // product already in cart update quantity

        if(newQty <= 0 ){
            cart.splice(index, 1); // remove product from cart if quantity is 0 or less(becuase user can add negative quantity to reduce quantity)
            toast.success(`${product.name} removed from cart`);
        }else{
            cart[index].quantity = newQty;//else update quantity
            toast.success(`Updated ${product.name} quantity to ${newQty}`);
        }
    }

    const cartString = JSON.stringify(cart); //convert cart to string to store in local storage
    localStorage.setItem("cart", cartString);
}

export function emptyCart(){ // empties the cart by assigning an empty array to the cart in local storage
    localStorage.setItem("cart", "[]");
}

export function getCartTotal(){
    let total = 0;
    const cart = getCart();

    cart.forEach(
        (item)=>{
            total += item.price * item.quantity;
        }
    )
    return total;
}