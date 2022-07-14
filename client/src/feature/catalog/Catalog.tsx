import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AddPagination from "../../app/components/AddPagination";
import CheckBoxButton from "../../app/components/CheckBoxButton";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import Loading from "../../app/layout/Loading";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

export default function Catalog() {

  const products = useAppSelector(productSelectors.selectAll)
  const dispatch = useAppDispatch()
  const {productsLoaded,filtersLoaded,brands,types,productParams,metaData} =useAppSelector(state=>state.catalog)

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

  if(!filtersLoaded) return <Loading message="Loading products..."/>
  return (


    
    <>
      <Grid container columnSpacing={4}>
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
          <CheckBoxButton
            items={types}
            checked={productParams.types}
            title='Types'
            onChange={(items:string[])=>dispatch(setProductParams({types:items}))}
          />
        </Paper>
        <Paper sx={{ mb: 2, p: 2 }}>
        <CheckBoxButton
            items={brands}
            checked={productParams.brands}
            title='Brands'
            onChange={(items:string[])=>dispatch(setProductParams({brands:items}))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ProductList products={products}/>
      </Grid>
      <Grid item xs={3}/>
      <Grid item xs={9} sx={{mb:4}}>
        {metaData&&
          <AddPagination 
            metaData={metaData} 
            onPageChange={(page:number)=>dispatch(setPageNumber({pageNumber:page}))}
          />
        }
        
      </Grid>

    </Grid>
    </>
      
  )
}
