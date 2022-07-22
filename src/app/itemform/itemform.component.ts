import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Item } from '../models/item.model';
import { ItemsService } from '../service/items.service';


@Component({
  selector: 'app-itemform',
  templateUrl: './itemform.component.html',
  styleUrls: ['./itemform.component.css']
})
export class ItemformComponent implements OnInit {

  submitted = false;
  units: any = ['PCS', 'SET', 'LOT', 'UNIT'];
  //currentItemCate = '';

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
  

  constructor(private formBuilder:FormBuilder, private itemsService: ItemsService) {}

  form: FormGroup = new FormGroup({
    longDesc: new FormControl(''),
    shortDesc: new FormControl(''),
    unit: new FormControl(''),
    category: new FormControl(''),
    isActive: new FormControl('true')
  });

  changeItem(e: any) {
    this.unitName?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  get unitName() {
    return this.form.get('unit');
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      longDesc: ['', [Validators.required, Validators.minLength(2)]],
      shortDesc: ['', [Validators.required, Validators.minLength(2)]],
      unit: ['', Validators.required],
      category: ['', Validators.required],
      isActive: []
    }, {})


    this.itemsService.selectedItem$.subscribe((value) => {
      this.item = value;
    });

  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }




  onSubmitItemForm(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));

  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }


  clearItemForm(){
    this.item = {
      id: '',
      longDesc: '',
      shortDesc: '',
      unit: 'PCS',    
      category: this.item.category,
      createdBy: '',
      createdOn: '',
      isActive: true   
    };
  }

}
