import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserFooterService {

  constructor(private http:HttpClient) { }

  getAddress()
  {
    return this.http.get<any>("http://localhost:3000/addressInfo")
  }

  subsc(message)
  {
    return this.http.post<any>("http://localhost:3000/footerSubscription",message)
  }
}
