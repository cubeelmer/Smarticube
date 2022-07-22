import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { ItemComponent } from './item/item.component';
import { AllitemsComponent } from './allitems/allitems.component';
import { AllproductsComponent } from './allproducts/allproducts.component';
import { ItemformComponent } from './itemform/itemform.component';
import { DemoprimeComponent } from './demoprime/demoprime.component';


@NgModule({
  declarations: [
    AppComponent,
    //ItemComponent,
    AllitemsComponent,
    AllproductsComponent,
    ItemformComponent,
    DemoprimeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
