import React from "react";
import { product } from "../../app/models/product";

interface props{
  products:product[];
  addProduct:()=>void;
}

export default function Catalog({products,addProduct}:props) {
  return (
    <React.Fragment>
      <ul>
        {products.map((product)=>(
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={addProduct}>add product</button>
    </React.Fragment>
      
  )
}
