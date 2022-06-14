import { List } from '@mui/material'
import { product } from '../../app/models/product';
import ProductCard from './ProductCard';

interface props{
    products:product[];
  }

export default function ProductList({products}:props) {
  return (
    <List>
        {products.map((product)=>(
            <ProductCard product={product}/>
        ))}
    </List>
  )
}
