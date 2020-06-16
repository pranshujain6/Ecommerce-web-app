import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient:HttpClient) { }


  getCred(uname,pass)
  {
    let  a = {"username":uname,"password":pass}
    return this.httpClient.post<any>("http://localhost:3000/userlogin",a);
  }
}
