import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopSingleService {

  constructor(private http:HttpClient) { }

  insertData(info)
  {
   return this.http.post<any>("http://localhost:3000/insertInCart",info)
  }
}
