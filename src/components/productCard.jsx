export function ProductCard(props){

    // <ProductCard name="Laptop" price="100,000.00" image="https://techterms.com/img/xl/laptop_586.png"/> these pasing values from 
    // App.jsx coming as json data as props ,if we print those props you can see the values are pass as props

    console.log(props)
    return(
        <div>
            <h1>{props.name}</h1>  
            {/* you have to use {} for write javascript inside html tags */}
            <img src = "https://techterms.com/img/xl/laptop_586.png" className="card"/>
            <p>{props.price}</p>
        </div>
    )
}