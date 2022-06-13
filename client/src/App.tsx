import { useEffect, useState } from "react";
import { product } from "./product";

function App() {
  const [products,setProducts] = useState<product[]>([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
      .then(response=>response.json())
      .then(data=>setProducts(data))
  },[]
 )

  function addProduct(){
    setProducts(prevState=>[...prevState,
      {name:'product'+prevState.length,price:100,id:1111}
    ])
  }
  return (
    <div>
      <ul>
        {products.map(product=>(
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={addProduct}>add product</button>
    </div>
  );
}

export default App;
