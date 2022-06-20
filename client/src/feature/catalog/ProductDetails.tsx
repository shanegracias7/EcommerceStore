
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import agent from '../../app/api/agent';
import { product } from '../../app/models/product';
import Loading from "../../app/layout/Loading";

export default function ProductDetails() {

  const {id}=useParams<{id:string}>();
  const [product, setProduct]=useState<product|null>(null);
  const [loading, setLoading]=useState(true);

  useEffect(()=>{
    agent.Catalog.details(parseInt(id))
         .then(respose => setProduct(respose))
         .catch(error=>console.error(error))
         .finally(()=>setLoading(false))
  },[id])

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
      </Grid>
    </Grid>
  )
}
