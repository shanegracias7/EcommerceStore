
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import agent from '../../app/api/agent';
import { product } from '../../app/models/product';
import Loading from "../../app/layout/Loading";
import { LoadingButton } from '@mui/lab';
import { useAppSelector, useAppDispatch } from '../../app/store/configureStore';
import { setBasket, removeItem } from '../basket/basketSlice';

export default function ProductDetails() {

  const {id}=useParams<{id:string}>();
  const [product, setProduct]=useState<product|null>(null);
  const [loading, setLoading]=useState(true);
  const [quantity,SetQuantity] = useState(0);
  const [submitting,SetSubmitting] = useState(false)
  const {basket} =useAppSelector(state=>state.basket);
  const dispatch = useAppDispatch()
  
  const item = basket?.items.find(item=>item.productId===product?.id)

  useEffect(()=>{
    if(item) SetQuantity(item.quantity)

    agent.Catalog.details(parseInt(id))
         .then(respose => setProduct(respose))
         .catch(error=>console.error(error))
         .finally(()=>setLoading(false))
  },[id,item])

  function handleInputChange(event:any){
    if(event.target.value>=0) SetQuantity(parseInt(event.target.value))
  }

  function handleUpdateCart(){
    SetSubmitting(true)
    if(!item||quantity>item.quantity){
      const updatedQuantity = item? quantity-item.quantity:quantity

      agent.Basket.addItem(product?.id!,updatedQuantity)
        .then(basket=>dispatch(setBasket(basket)))
        .catch(error=>console.error(error))
        .finally(()=>SetSubmitting(false))
    }
    else{
      const updatedQuantity =item.quantity-quantity
      agent.Basket.removeItem(product?.id!,updatedQuantity)
        .then(()=>dispatch(removeItem({productId:product?.id!,quantity:updatedQuantity})))
        .catch(error=>console.error(error))
        .finally(()=>SetSubmitting(false))
    }
  }

  if(loading) return <Loading message="Loading product..."/>
  if(!product) return <h1>product not found...</h1>
  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureURL} alt='product' style={{width:'100%'}}/>
      </Grid>
      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb:2}}/>
        <Typography variant='h4' color='secondary'> ${(product.price/100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              type='number'
              label='quantity in cart'
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              sx={{height:'55px'}}
              color='primary'
              size ='large'
              variant='contained'
              fullWidth
              loading={submitting}
              onClick={handleUpdateCart}
              disabled={item?.quantity === quantity || (!item && quantity===0)}
            >
              {item?'Update Quantity':'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
