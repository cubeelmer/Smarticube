//import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ItemsService } from './service/items.service';
import { ProductsService } from './service/products.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular App';
 
    
  itemCategories: string[] = [];
  selectedProduct: any;

  constructor(private itemsService: ItemsService, private productsService :ProductsService  ) {}
  
  ngOnInit(): void {    
    this.getCategories(); 
    this.productsService.selectedProduct$.subscribe((value) => {
      this.selectedProduct = value;
    });
  }

  getCategories(){    
    this.itemsService.getCategories()
    .subscribe(
      response => {
        //console.log(response);
        this.itemCategories = response;
      }
    );
  }

}
