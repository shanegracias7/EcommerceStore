import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import agent from "../../app/api/agent";
import { MetaData } from "../../app/models/pagination";
import { product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState{
    productsLoaded:boolean;
    filtersLoaded:boolean;
    status:string;
    brands:string[];
    types:string[];
    productParams:ProductParams;
    metaData:MetaData|null;
}

const productsAdapter=createEntityAdapter<product>();

function getAxiosParams(productParams:ProductParams){
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands) params.append('brands', productParams.brands.toString());
    if (productParams.types) params.append('types', productParams.types.toString());
    return params;
}

export const fetchProductsAsync = createAsyncThunk<product[],void,{state:RootState}>(
    'catalog/fetchProductsAsync',
    async (_,ThunkAPI)=>{
        const params = getAxiosParams(ThunkAPI.getState().catalog.productParams)
        try{
            const response= await agent.Catalog.list(params)
            ThunkAPI.dispatch(setMetaData(response.metaData))
            return response.items;
        }
        catch(error:any){
            return ThunkAPI.rejectWithValue({error:error.data})
        }
    }
)


export const fetchProductAsync = createAsyncThunk<product,number>(
    'catalog/fetchProductAsync',
    async (productId,ThunkAPI)=>{

        try{
            return await agent.Catalog.details(productId)
        }
        catch(error:any){
           return ThunkAPI.rejectWithValue({error:error.data})
        }
    }
)

export const fetchFilters = createAsyncThunk(
    'catalog/fetchFilters',
    async (_,ThunkAPI)=>{
        try {
            return agent.Catalog.fetchFilters()
        } 
        catch (error:any) {
            return ThunkAPI.rejectWithValue({error:error.data})
        }
    }
)
function initParams(){
    return {
        pageNumber:1,
        pageSize:6,
        orderBy:'name'
    }
}

export const catalogSlice = createSlice({
    name:'catalog',
    initialState:productsAdapter.getInitialState<CatalogState>({
        productsLoaded:false,
        filtersLoaded:false,
        status:'idle',
        brands:[],
        types:[],
        productParams:initParams(),
        metaData:null
    }),
    reducers:{
        setProductParams:(state,action)=>{
            state.productsLoaded = false;
            state.productParams = {...state.productParams,...action.payload,pageNumber:1}
        },
        setPageNumber:(state,action)=>{
            state.productsLoaded = false;
            state.productParams = {...state.productParams,...action.payload}
        },
        setMetaData:(state,action)=>{
            state.metaData = action.payload
        },
        resetProductParams:(state)=>{
            state.productParams=initParams();
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsAsync.pending,(state)=>{
            state.status='PendingFetchProducts'
        })
        builder.addCase(fetchProductsAsync.fulfilled,(state,action)=>{
            productsAdapter.setAll(state,action.payload)
            state.status='idle'
            state.productsLoaded=true
        })
        builder.addCase(fetchProductsAsync.rejected,(state,action)=>{
            state.status='idle'
            console.log(action)
        })
        builder.addCase(fetchProductAsync.pending,(state)=>{
            state.status='PendingFetchProduct'
        })
        builder.addCase(fetchProductAsync.fulfilled,(state,action)=>{
            productsAdapter.upsertOne(state,action.payload)
            state.status='idle'
        })
        builder.addCase(fetchProductAsync.rejected,(state,action)=>{
            state.status='idle'
            console.log(action)
        })
        builder.addCase(fetchFilters.pending,(state)=>{
            state.status='PendingFetchFilters'
        })
        builder.addCase(fetchFilters.fulfilled,(state,action)=>{
            state.brands = action.payload.brands
            state.types = action.payload.types
            state.filtersLoaded=true
            state.status='idle'
        })
        builder.addCase(fetchFilters.rejected,(state,action)=>{
            state.status='idle'
            console.log(action)
        })
    }

})

export const productSelectors = productsAdapter.getSelectors((state:RootState)=>state.catalog)
export const {setProductParams,resetProductParams,setMetaData,setPageNumber}= catalogSlice.actions;