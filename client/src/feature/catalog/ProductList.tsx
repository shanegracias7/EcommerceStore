import { Grid } from '@mui/material'
import { product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface props{
    products:product[];
  }

export default function ProductList({products}:props) {
  return (
    <Grid container spacing={4}>
        {products.map((product)=>(
          <Grid item xs={3} key={product.id}>
            <ProductCard product={product}/>
          </Grid>
        ))}
    </Grid>
  )
}
