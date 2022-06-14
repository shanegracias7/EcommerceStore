import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import React from "react";
import { product } from "../../app/models/product";

interface props{
  products:product[];
  addProduct:()=>void;
}

export default function Catalog({products,addProduct}:props) {
  return (
    <React.Fragment>
      <List>
        {products.map((product)=>(
          <ListItem key={product.id}>
              <ListItemAvatar>
                <Avatar src={product.pictureURL}/>
              </ListItemAvatar>
              <ListItemText>{product.name}</ListItemText>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" onClick={addProduct}>add product</Button>
    </React.Fragment>
      
  )
}
