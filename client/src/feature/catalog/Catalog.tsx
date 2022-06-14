import { Button } from "@mui/material";
import React from "react";
import { product } from "../../app/models/product";
import ProductList from "./ProductList";

interface props{
  products:product[];
  addProduct:()=>void;
}

export default function Catalog({products,addProduct}:props) {
  return (
    <React.Fragment>
      <ProductList products={products}/>
      <Button variant="contained" onClick={addProduct}>add product</Button>
    </React.Fragment>
      
  )
}
