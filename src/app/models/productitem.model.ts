import { Item } from "./item.model";


export interface ProductItem {
    productId: string ;
    itemId: string;
    qty: number;    
    itemInvolved : Item;    
}