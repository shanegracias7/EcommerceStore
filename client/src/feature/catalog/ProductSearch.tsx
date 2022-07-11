import { Search } from '@mui/icons-material'
import { TextField, InputAdornment, debounce } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore'
import { setProductParams } from './catalogSlice'

export default function ProductSearch() {

  const {productParams} =useAppSelector(state=>state.catalog)
  const dispatch = useAppDispatch()
  const [searchTerm,serSearchTerm] = useState(productParams.searchTerm)

  const debouncedSearch = debounce((event:any)=>dispatch(setProductParams({searchTerm:event.target.value})),1000)

  return (
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
            value={searchTerm ||''}
            onChange={(event:any)=>{
              serSearchTerm(event.target.value)
              debouncedSearch(event)
            }}
          /> 
  )
    
  
}
