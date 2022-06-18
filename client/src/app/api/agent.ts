import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "../..";

axios.defaults.baseURL = "http://localhost:5000/api/";

const responseBody = (response:AxiosResponse) => response.data

axios.interceptors.response.use(
    (response)=>{
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
    get: (url:string)=> axios.get(url).then(responseBody),
    post: (url:string,body:{})=> axios.post(url,body).then(responseBody),
    put: (url:string,body:{})=> axios.put(url,body).then(responseBody),
    delete: (url:string)=> axios.delete(url).then(responseBody),

                             
}

const Catalog ={
    list:()=>request.get('products'),
    details:(id:number)=>request.get(`products/${id}`)
}
const TestErrors ={
    get400Error:()=>request.get('Buggy/bad-request'),
    get401Error:()=>request.get('buggy/unauthorised'),
    get404Error:()=>request.get('buggy/not-found'),
    get500Error:()=>request.get('buggy/server-error'),
    getValidationError:()=>request.get('buggy/validation-error')
}

const agent ={
    Catalog,
    TestErrors
}

export default agent