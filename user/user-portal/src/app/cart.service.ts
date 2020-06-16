import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCart(id)
  {
    let a  = {'id':id}
    return this.http.post<any>("http://localhost:3000/getCart",a)
  }

  descreseInCart(db)
  {
    return this.http.post<any>("http://localhost:3000/decreseInCart",db)
  }

  increaseInCart(db)
  {
    return this.http.post<any>("http://localhost:3000/increaseInCart",db)
  }
  removeInCart(db)
  {
    return this.http.post<any>("http://localhost:3000/removeInCart",db)
  }
}
