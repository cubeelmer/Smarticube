import { ProductItem } from "./productitem.model";

export interface Product {
    id: string ;
    longDesc: string;
    shortDesc: string;
    weightValue: string;
    weightUnit: string;
    category: string;
    createdBy: string;
    createdOn: string;
    isActive: boolean;
    productItems: ProductItem[];  
}
