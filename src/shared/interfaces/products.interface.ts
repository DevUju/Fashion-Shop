export interface IProductList{
    id: number;
    name: string;
    description: string;
    price: number;
    category?: string;
    imageUrl: string;
    instock?: boolean;
    rating?: number
}