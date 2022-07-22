import { Component, Input, OnInit } from '@angular/core';
import { Item } from '../models/item.model';
import { ItemsService } from '../service/items.service';

@Component({
  selector: 'app-allitems',
  templateUrl: './allitems.component.html',
  styleUrls: ['./allitems.component.css']
})
export class AllitemsComponent implements OnInit {

  currentItemCate = '';
  @Input() itemCategories: string[] = [];
  items: Item[] = [];  

  item: Item = {
    id: '',
    longDesc: '',
    shortDesc: '',
    unit: 'PCS',    
    category: '',
    createdBy: '',
    createdOn: '1900-01-01',
    isActive: true   
  }
  
  constructor(private itemsService: ItemsService) { }

  ngOnInit(): void {
    //this.getCategories();    
  }

  /*
  getCategories(){
    // using subscribe as service method is Observable, otherwise do nothing...    
    this.itemsService.getCategories()
    .subscribe(
      response => {
        //console.log(response);
        this.itemCategories = response;
      }
    );
  }
  */

  onSubmitItemForm (){  

    if (this.item.id === '') {                      
      this.addItem(this.item)           
    } else {
      this.updateItem(this.item);
    }
  }


  addItem(item:Item){
    if(item.longDesc.length > 0 && item.shortDesc.length > 0 
      && item.unit.length > 0 && item.category.length > 0)
    {      
      this.itemsService.addItem(item)
        .subscribe(
          response => {
            this.getItemByCategory(this.currentItemCate);
            this.clearItemForm();
            alert("Add Item:" + item.longDesc + " had been successful!"); 
          }
        );
    }
  }

  updateItem(item:Item){
    if(item.longDesc.length > 0 && item.shortDesc.length > 0 
      && item.unit.length > 0 && item.category.length > 0)
    {
      this.itemsService.updateItem(item)
      .subscribe(
        response => {
          this.getItemByCategory(this.currentItemCate);
          this.clearItemForm();
          alert("Update Item:" + item.longDesc + " had been successful!"); 
        }
      );
    }
  }
  
  deleteItem(id:string){ 
    var c = confirm ("Are you sure to remove it?");
    
    if(c == true){
      this.itemsService.deleteItem(id)
      .subscribe(
        response => {
          this.getItemByCategory(this.currentItemCate);
          alert("Remove Item:" + response.longDesc + " had been successful!"); 
        }
      );
    }
  }

  getItemByCategory(cateId:string){
    this.itemsService.getItemByCategory(cateId)
    .subscribe(
      response => {
        //console.log(response);
        this.items = response;
      }
    );
  }


  populateItemForm(item:Item){
    this.item = item;    
    this.itemsService.setItem(this.item);   
  }

  refreshItemsList(cateId:string){
    this.currentItemCate = cateId;   
    this.item.category = cateId; 
    
    this.clearItemForm();    
    this.itemsService.setItem(this.item);  

    this.getItemByCategory(this.currentItemCate);    
  }
  

  clearItemForm(){
    this.item = {
      id: '',
      longDesc: '',
      shortDesc: '',
      unit: 'PCS',    
      category: this.currentItemCate,
      createdBy: '',
      createdOn: '',
      isActive: true   
    };
  }

}
