import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import agent from "../../app/api/agent";
import { product } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

const productsAdapter=createEntityAdapter<product>();

export const fetchProductsAsync = createAsyncThunk<product[]>(
    'catalog/fetchProductsAsync',
    async ()=>{

        try{
            return await agent.Catalog.list()
        }
        catch(error){
            console.log(error)
        }
    }
)

export const catalogSlice = createSlice({
    name:'catalog',
    initialState:productsAdapter.getInitialState({
        productsLoaded:false,
        status:'idle'
    }),
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status='PendingFetchProduct'
        })
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productsAdapter.setAll(state,action.payload)
            state.status='idle'
            state.productsLoaded=true
        })
        builder.addCase(fetchProductsAsync.rejected,(state)=>{
            state.status='idle'
        })
    }

})

export const productSelectors = productsAdapter.getSelectors((state:RootState)=>state.catalog)