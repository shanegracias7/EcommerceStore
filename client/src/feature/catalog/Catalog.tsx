import React, { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import Loading from "../../app/layout/Loading";
import { product } from "../../app/models/product";
import ProductList from "./ProductList";

export default function Catalog() {
  const [products,setProducts] = useState<product[]>([]);
  const [loading,setLoading]= useState(true)

  useEffect(()=>{
    agent.Catalog.list()
    .then(products=>setProducts(products))
    .catch(error=>console.error(error))
    .finally(()=>setLoading(false))
  },[]
  )
  if(loading) return <Loading message="Loading products..."/>
  return (
    <React.Fragment>
      <ProductList products={products}/>
    </React.Fragment>
      
  )
}
