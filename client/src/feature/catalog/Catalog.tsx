import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, Pagination, Paper, Radio, RadioGroup, Typography } from "@mui/material";
import { useEffect } from "react";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll)
  const dispatch = useAppDispatch()
  const {productsLoaded,status,filtersLoaded,brands,types,productParams} =useAppSelector(state=>state.catalog)

  const sortOption =[
    {value:'name',label:'Alphabetical'},
    {value:'priceDesc',label:'Price - High to low'},
    {value:'price',label:'Price - Low to high'}
  ]

  useEffect(()=>{
    if(!filtersLoaded) dispatch(fetchFilters())
  },[dispatch,filtersLoaded])

  useEffect(()=>{
    if(!productsLoaded) dispatch(fetchProductsAsync())
  },[productsLoaded,dispatch])

  if(status.includes('Pending')) return <Loading message="Loading products..."/>
  return (


    
    <>
      <Grid container spacing={4}>
      <Grid item xs={3}>
        <Paper sx={{mb:2}}>
          <ProductSearch/>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <RadioButtonGroup 
            title="Sort"
            selectedValue={productParams.orderBy}
            options={sortOption}
            onChange={(event=>dispatch(setProductParams({orderBy:event.target.value})))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
          <FormLabel>Type</FormLabel>
            {types.map((type,index)=><FormControlLabel control={<Checkbox  />} label={type} key={index} />)}
          </FormGroup>
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormGroup>
          <FormLabel>Brand</FormLabel>
            {brands.map((brand,index)=><FormControlLabel control={<Checkbox  />} label={brand} key={index} />)}
          </FormGroup>
        </Paper>
      </Grid>



      <Grid item xs={9}>
        <ProductList products={products}/>
      </Grid>
      
    </Grid>
    <Grid container spacing={4}>
      <Grid item xs={3}/>
      <Grid item xs={9}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography>
            Displaying 1-6 of 20 items
          </Typography>
          <Pagination
            color="secondary"
            size='large'
            count={10}
            page={2}
          />
        </Box>
      </Grid>
    </Grid>
    </>
      
  )
}
