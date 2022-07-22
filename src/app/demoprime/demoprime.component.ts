import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DemoPrimeService } from '../service/demoprime.service';


@Component({
  selector: 'app-demoprime',
  templateUrl: './demoprime.component.html',
  styleUrls: ['./demoprime.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class DemoprimeComponent implements OnInit {

  fNum: string = '1';
  tNum: string = '100';
  maxNum: string = '100000';

  primeNumbers: any;
  countPrime: string = '';
  tableView: string = '';
  tableViewDom: any;

  btnSubmit: any;
  divTableView: any;



  constructor(private demoPrimeService: DemoPrimeService) { }

  ngOnInit(): void {
    this.divTableView = document.getElementById('divTableView') as HTMLElement;
    this.btnSubmit = document.getElementById('btnSubmit') as HTMLElement;
    this.validExecution();
  }



 getPrimeNumbers(fromNum:string, toNum:string){
    
    this.demoPrimeService.getPrimeNumbers(fromNum, toNum)
    .subscribe(
      response => {      
        this.primeNumbers = response; 
        this.countPrime =  this.primeNumbers.result.length.toString();  
        
        this.prepareTableView(fromNum, toNum, this.primeNumbers.result as number[]);
              
      }
    );
    
  }

  prepareTableView(fromNum: string, toNum:string, primes: number[]){

    let startNum: number = Number(fromNum);
    let endNum: number = Number(toNum);
    let totalNum: number = (endNum - startNum) + 1
    let itemInRow : number = 10;
    let row:number = Math.floor(totalNum / itemInRow);
    //let reminder:number = (totalNum % itemInRow) > 0  ? row += 1 : row += 0 ;
    let cellValue:number = 0;

    (totalNum % itemInRow) > 0  ? row += 1 : row += 0 ;

    this.tableView = '<table class="tableView">';
    for(let i:number = 1; i <= row; i++ ){
      this.tableView += "<tr>";

      for(let j:number = startNum; j <= startNum + itemInRow-1; j++){
        cellValue = (((i-1)*10) + j);
        
        if(cellValue <= endNum){

          if(primes.find(e => e === cellValue)){
            this.tableView += '<td><span class="primeBadge primeValue">' + cellValue.toString() + "</span></td>";
          }else{
            this.tableView += '<td><span class="primeBadge nonPrimeValue">' + cellValue.toString() + "</span></td>";
          }
        }else{
          this.tableView += "<td></td>";
        }
        
        
      }
      
      this.tableView += "</tr>";
      
    }
    
    this.tableView += "</table>";

    this.divTableView.innerHTML = this.tableView;
    
    

  }
  

  onSubmitConditionForm(){
    this.getPrimeNumbers(this.fNum, this.tNum );
  }

  validExecution(){
    this.countPrime = '';
    this.divTableView.innerHTML = '';

    if(Number(this.tNum) > Number(this.maxNum)) this.tNum = this.maxNum;

    if((Number(this.fNum) <= Number(this.tNum)) && (Number(this.fNum) > 0)){
      
      (this.btnSubmit as HTMLButtonElement).disabled = false;
    }else{
      (this.btnSubmit as HTMLButtonElement).disabled = true;
    }

  }
  

}
