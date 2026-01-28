export interface IProductList{
    id: string;
    name: string;
    description: string;
    price: number;
    category?: string;
    imageUrl: string;
    instock?: boolean;
    rating?: number
}