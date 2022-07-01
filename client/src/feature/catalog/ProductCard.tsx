import { product } from '../../app/models/product';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import agent from '../../app/api/agent';
import { LoadingButton } from '@mui/lab';

interface props{
  product:product;
}

export default function ProductCard({product}:props) {
  const [loading,setLoading] = useState(false);
  function handleAddItem(productId:number){
    setLoading(true)
    agent.Basket.addItem(productId)
    .catch(error=>console.error(error))
    .finally(()=>setLoading(false))
  }
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
        <LoadingButton 
          loading={loading} 
          size="small" 
          onClick={()=>handleAddItem(product.id)}
        >
            Add to Cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}
