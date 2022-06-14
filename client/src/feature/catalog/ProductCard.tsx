import { product } from '../../app/models/product';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material'

interface props{
  product:product;
}

export default function ProductCard({product}:props) {
  return (
    <ListItem key={product.id}>
              <ListItemAvatar>
                <Avatar src={product.pictureURL}/>
              </ListItemAvatar>
              <ListItemText>{product.name}</ListItemText>
          </ListItem>
  )
}
