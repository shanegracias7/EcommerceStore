import { Search } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, InputAdornment, Pagination, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll)
  const dispatch = useAppDispatch()
  const {productsLoaded,status,filtersLoaded,brands,types} =useAppSelector(state=>state.catalog)

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
          <TextField 
            label='Search Products'
            variant="outlined"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search/>
                </InputAdornment>
              ),
            }}
          /> 
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
          <FormLabel>Sort</FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {sortOption.map(({value,label})=><FormControlLabel value={value} control={<Radio />} label={label} key={value}/> )}
          </RadioGroup>
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
