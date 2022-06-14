import { product } from '../../app/models/product';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'

interface props{
  product:product;
}

export default function ProductCard({product}:props) {
  return (
    // <ListItem key={product.id}>
    //           <ListItemAvatar>
    //             <Avatar src={product.pictureURL}/>
    //           </ListItemAvatar>
    //           <ListItemText>{product.name}</ListItemText>
    // </ListItem>

<Card>
<CardMedia
  component="img"
  height="140"
  image="/static/images/cards/contemplative-reptile.jpg"
  alt="green iguana"
/>
<CardContent>
  <Typography gutterBottom variant="h5" component="div">
    Lizard
  </Typography>
  <Typography variant="body2" color="text.secondary">
    Lizards are a widespread group of squamate reptiles, with over 6,000
    species, ranging across all continents except Antarctica
  </Typography>
</CardContent>
<CardActions>
  <Button size="small">Share</Button>
  <Button size="small">Learn More</Button>
</CardActions>
</Card>
  )
}
