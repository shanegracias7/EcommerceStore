import { product } from '../../app/models/product';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'

interface props{
  product:product;
}

export default function ProductCard({product}:props) {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor:'secondary.main'}}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx:{fontWeight:'bold',color:'primary.main'}
        }}
      />
      <CardMedia
        component="img"
        height="140"
        sx={{objectFit: "contain",bgcolor:"primary.light"}}
        image={product.pictureURL}
      />
      <CardContent>
        <Typography gutterBottom color={"secondary"} variant="h5" component="div">
          ${(product.price/100).toFixed(2)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Cart</Button>
        <Button size="small">View</Button>
      </CardActions>
    </Card>
  )
}
