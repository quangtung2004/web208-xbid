import { Bid } from "./Bids";

export interface Product {
    _id: string;
    title: string;
    price: number
    priceold: number;
    description: string; 
    category: string;
    image: string;
    starRating: number;
    isShow:boolean;
    bids: Bid[];
    startAt: Date,
    endAt: Date,
    bidPriceMax: number;
}
export type Createproduct = {
    title:string;
    image:string;
    description:string;
    price: number;
    priceold: number,
    category:string ;
    starRating: number;
    showproduct:boolean ;
    startAt: Date,
}