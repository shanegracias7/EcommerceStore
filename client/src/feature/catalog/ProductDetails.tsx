
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { product } from '../../app/models/product';

export default function ProductDetails() {

  const {id}=useParams<{id:string}>();
  const [product, setProduct]=useState<product|null>(null);
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    axios.get(`http://localhost:5000/api/products/${id}`)
         .then(respose => setProduct(respose.data))
         .catch(error=>console.error(error))
         .finally(()=>setLoading(false))
  },[id])

  if(loading) return <h1>loading...</h1>
  if(!product) return <h1>product not found...</h1>
  return (
    <div>{product.name}</div>
  )
}
