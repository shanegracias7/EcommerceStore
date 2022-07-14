import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";

const sleep = ()=> new Promise(response=>setTimeout(response,500))

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials=true;

const responseBody = (response:AxiosResponse) => response.data

axios.interceptors.response.use(
    async response=>{
        if (process.env.NODE_ENV === 'development') await sleep();

        const pagination = response.headers['pagination']
        if (pagination){
            response.data = new PaginatedResponse(response.data,JSON.parse(pagination))
            return response
        }
        return response
    },
    (error)=>{
        const {data , status} = error.response!;
        switch (status) {
            case 400:
                if (data.errors){
                    const modelStateErrors:string[]=[];
                    for(const key in data.errors){
                        if(data.errors[key]){
                            modelStateErrors.push(data.errors[key])  
                        }
                    }
                    throw modelStateErrors
                }
                toast.error(data.title)
                break;
            case 401:
                toast.error(data.title)
                break;
            case 500:
                history.push({
                    pathname:'/server-error',
                    state:{
                        error:data
                    }
                })
                break;
        
            default:
                break;
        }
        return Promise.reject(error.response)
    }
)

const request = {
    get: (url:string,params?:URLSearchParams)=> axios.get(url,{params}).then(responseBody),
    post: (url:string,body:{})=> axios.post(url,body).then(responseBody),
    put: (url:string,body:{})=> axios.put(url,body).then(responseBody),
    delete: (url:string)=> axios.delete(url).then(responseBody),

                             
}

const Catalog ={
    list:(params:URLSearchParams)=>request.get('products',params),
    details:(id:number)=>request.get(`products/${id}`),
    fetchFilters:()=>request.get('products/filters')
}
const TestErrors ={
    get400Error:()=>request.get('Buggy/bad-request'),
    get401Error:()=>request.get('buggy/unauthorised'),
    get404Error:()=>request.get('buggy/not-found'),
    get500Error:()=>request.get('buggy/server-error'),
    getValidationError:()=>request.get('buggy/validation-error')
}

const Basket = {
    get: ()=> request.get('basket'),
    addItem: (productId:number,quantity=1)=> request.post(`basket?productId=${productId}&quantity=${quantity}`,{}),
    removeItem: (productId:number,quantity=1)=> request.delete(`basket?productId=${productId}&quantity=${quantity}`)
}

const agent ={
    Catalog,
    TestErrors,
    Basket
}

export default agent