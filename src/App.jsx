import './App.css'
import { ProductCard } from './components/productCard'

function App() {
  

  return (
    <>
      <ProductCard 
      name="Laptop" 
      price="100,000.00" 
      image="https://techterms.com/img/xl/laptop_586.png"
      /> 

      <ProductCard 
      name="Monitor" 
      price="80,000.00" 
      image="https://techterms.com/img/xl/laptop_586.png"
      />

      <ProductCard 
      name="Keyboard" 
      price="10,000.00" 
      image="https://techterms.com/img/xl/laptop_586.png"
      />
    </>
  )
}

export default App
