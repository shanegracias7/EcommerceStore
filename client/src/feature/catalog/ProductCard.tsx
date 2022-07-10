import { product } from '../../app/models/product';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync } from '../basket/basketSlice';

interface props{
  product:product;
}

export default function ProductCard({product}:props) {
  const {status} = useAppSelector(state=>state.basket)
  const dispatch = useAppDispatch()

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
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.brand}/{product.type}
        </Typography>
      </CardContent>
      <CardActions>
        <LoadingButton 
          loading={status.includes('PendingAddItem'+product.id)} 
          size="small" 
          onClick={()=>dispatch(addBasketItemAsync({productId:product.id}))}
        >
            Add to Cart
        </LoadingButton>
        <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
      </CardActions>
    </Card>
  )
}
