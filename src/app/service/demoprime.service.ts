import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemoPrimeService {


  baseUrl = 'http://www.smarticube.somee.com/api/DemoService';

  
  constructor(private http: HttpClient) { }
  
  getPrimeNumbers(fromNum: string, toNum: string): Observable<Object> {    
    return this.http.get<Object>(this.baseUrl+'/GetPrimeNumbers?fromNum='+fromNum+'&toNum='+toNum);
  }

  


}
