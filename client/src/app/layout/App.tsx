import { useEffect, useState } from "react";
import Catalog from "../../feature/catalog/Catalog"
import { product } from "../models/product";

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
      <Catalog products={products} addProduct={addProduct}/>
    </div>
  );
}

export default App;
