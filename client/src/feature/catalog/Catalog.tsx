import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products,setProducts] = useState<product[]>([]);

  useEffect(()=>{
    agent.Catalog.list().then(products=>setProducts(products))
  },[]
  )
  return (
    <React.Fragment>
      <ProductList products={products}/>
    </React.Fragment>
      
  )
}
