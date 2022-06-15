import React, { useEffect, useState } from "react";
import { product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products,setProducts] = useState<product[]>([]);

  useEffect(()=>{
    fetch("http://localhost:5000/api/products")
      .then(response=>response.json())
      .then(data=>setProducts(data))
  },[]
  )
  return (
    <React.Fragment>
      <ProductList products={products}/>
    </React.Fragment>
      
  )
}
