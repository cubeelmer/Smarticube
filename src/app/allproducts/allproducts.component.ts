import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../models/item.model';
import { Product } from '../models/product.model';
import { ProductItem } from '../models/productitem.model';
import { ItemsService } from '../service/items.service';
import { ProductsService } from '../service/products.service';

@Component({
  selector: 'app-allproducts',
  templateUrl: './allproducts.component.html',
  styleUrls: ['./allproducts.component.css']
})
export class AllproductsComponent implements OnInit {

  /* Product */
  product: Product = {
    id: '',
    longDesc: '',
    shortDesc: '',
    weightValue: '',
    weightUnit: '',
    category: 'DESKTOP',
    createdBy: '',
    createdOn: '1900-01-01',
    isActive: true,
    productItems: []
  }

  products: Product[] = [];   

  productItems: Item[] = [];  
  
  currentProductItemCate = '';


  /* Item */
  @Input() itemCategories: string[] = [];

  constructor(private itemsService: ItemsService, private productsService :ProductsService) { 
  //constructor(private productsService :ProductsService) { 
  }

  ngOnInit(): void {
    this.getAllProducts();
    //this.getCategories(); 
    this.productsService.setProduct(this.product);
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

  
  getAllProducts(){
    this.productsService.getAllProducts()
    .subscribe(
      response => {
        console.log('getAllProducts()');
        console.log(response);
        this.products = response;
      }
    );
    
  }


  onSubmitProductForm (){ 
       
    if (this.product.id === '') {                      
      this.addProduct(this.product)           
    } else {
      this.updateProduct(this.product);
    }    
  }

  addProduct(product: Product){    
    
    if(product.longDesc.length > 0 && product.shortDesc.length > 0 && product.weightUnit.length > 0){
    
      this.productsService.addProduct(product)      
        .subscribe(
          response => {
            this.getAllProducts();
            this.clearProductForm();
            alert("Add Product:" + product.longDesc + " had been successful!");                    
          }
        );

    }
  }

  updateProduct(product:Product){

    if(product.longDesc.length > 0 && product.shortDesc.length > 0 && product.weightUnit.length > 0){
      this.productsService.updateProduct(product)
      .subscribe(
        response => {
          this.getAllProducts();
          //this.product = response;
          alert("Update Product:" + product.longDesc + " had been successful!"); 
        }
      );
    }
  }

  deleteProduct(id:string){
    var c = confirm ("Are you sure to remove it?");
        
    if(c == true){
      this.productsService.deleteProduct(id)
      .subscribe(
        response => {
          this.getAllProducts();
          this.clearProductForm();
          alert("Remove Product:" + response.longDesc + " had been successful!"); 
        }
      );
    }
  }

  populateProductForm(product: Product){
    this.product = product;
    this.productsService.setProduct(this.product);
    console.log('populateProductForm()');
    console.log(product);
  }

  clearProductForm(){
    this.product = {
      id: '',
      longDesc: '',
      shortDesc: '',
      weightValue: '',
      weightUnit: '',
      category: 'DESKTOP',
      createdBy: '',
      createdOn: '1900-01-01',
      isActive: true,
      productItems: []
    };

    this.productItems = [];
    this.currentProductItemCate = '';
    this.productsService.setProduct(this.product);
  }


  addProductItemAmount(productitem: ProductItem){
      productitem.qty += 1; 
  }


  addNewProductItem(newitem:Item){
        
    
    let index:number = this.product.productItems.findIndex(item => item.itemId == newitem.id );

        if(index < 0){
          let newProductItem:ProductItem = {
            productId: this.product.id,
            itemId: newitem.id,
            qty: 1,
            itemInvolved: newitem
          }

          //console.log(">>>>>>>>>");
          //console.log(newProductItem);

          //console.log("Before AddNew >>");
          //console.log(this.product);        
          this.product.productItems.push(newProductItem)
          //console.log("After AddNew >>");
          //console.log(this.product);
        
        }else{
          this.product.productItems[index].qty += 1;
        }    

    
  }


  minusProductItemAmount(productitem: ProductItem){
    if (productitem.qty > 1){
        productitem.qty -= 1;
        }     
            
  }


  removeProductItem(productitem:ProductItem){
    let index:number = this.product.productItems.findIndex(item => item.itemId == productitem.itemId );        
    //console.log("removeProductItem() >> index:" + index);        
    this.product.productItems.splice(index, 1);
  }

  
  getProductItems(cateId:string){
    //console.log("Category selected:" + cateId);    
    this.currentProductItemCate = cateId;
    this.itemsService.getItemByCategory(cateId)
    .subscribe(
      response => {
        //console.log(response);
        this.productItems = response;
      }
    );
  }
  














  
}
