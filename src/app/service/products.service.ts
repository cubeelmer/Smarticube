import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';
//import { ProductItem } from '../models/productitem.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {


  // Swagger link: cards is the controller name
  //baseUrl = 'https://localhost:7226/api/Products';
  baseUrl = 'http://www.smarticube.somee.com/api/DemoService';

  private product$ = new BehaviorSubject<any>({});
  selectedProduct$ = this.product$.asObservable();


  setProduct(product: any) {
    this.product$.next(product);
  }
  
  constructor(private http: HttpClient) { }
  
  getAllProducts(): Observable<Product[]> {    
    return this.http.get<Product[]>(this.baseUrl+'/GetAllProducts');
  }

  addProduct(product: Product): Observable<Product> {
    
    product.id = '00000000-0000-0000-0000-000000000000'; 
    product.createdOn = '1900-01-01';

    product.productItems.forEach(element => {
          element.productId = product.id;          
    });

    console.log("addProduct >>>");
    console.log(product);

    return this.http.post<Product>(this.baseUrl+'/AddProduct', product);
  }


  deleteProduct(id:string): Observable<Product>{
    return this.http.delete<Product>(this.baseUrl + '/DeleteProduct' + '/' + id);
  }


  updateProduct(product:Product): Observable<Product> {
    return this.http.put<Product>(this.baseUrl + '/UpdateProduct' + '/' + product.id, product)
  }






}
