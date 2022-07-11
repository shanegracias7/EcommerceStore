export interface product{
    id: number;
    name: string;
    description?: string;
    price: number;
    pictureURL?: string;
    type?: string;
    brand?: string;
    quantity?: number;
}

export interface ProductParams{
    orderBy:string;
    searchTerm?:string;
    types?:string[];
    brands?:string[];
    pageNumber:number;
    pageSize:number;
}