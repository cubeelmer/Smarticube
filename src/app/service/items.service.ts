import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Item } from '../models/item.model';



@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  // Swagger link: Items is the controller name
  //baseUrl = 'https://localhost:7226/api/Items';
  baseUrl = 'http://www.smarticube.somee.com/api/DemoService';

  private item$ = new BehaviorSubject<any>({});
  selectedItem$ = this.item$.asObservable();


  setItem(product: any) {
    this.item$.next(product);
  }


  constructor(private http: HttpClient) { }

  
  getAllItems(): Observable<Item[]> {    
    return this.http.get<Item[]>(this.baseUrl+'/GetAllItems');
  }

  
  getItemByCategory(cateId:string): Observable<Item[]> {    
    return this.http.get<Item[]>(this.baseUrl+'/GetItemByCategory/'+cateId);    
  }

  
  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl+'/GetItemCategories');
  }


  addItem(item: Item): Observable<Item> {    
        
    item.id = '00000000-0000-0000-0000-000000000000';
    item.createdBy = ''; 
    item.createdOn = '1900-01-01';    
    return this.http.post<Item>(this.baseUrl+'/AddItem', item);
  }


  deleteItem(id:string): Observable<Item>{
    return this.http.delete<Item>(this.baseUrl + '/DeleteItem/' + id);
  }


  updateItem(item:Item): Observable<Item> {
    return this.http.put<Item>(this.baseUrl + '/UpdateItem/' + item.id, item)
  }

}
