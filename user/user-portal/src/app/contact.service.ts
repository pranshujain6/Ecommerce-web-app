import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }

  submit(data)
  {
    return this.http.post<any>("http://localhost:3000/contactSubmit",data)
  }

}
