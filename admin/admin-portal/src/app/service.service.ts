import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http' 

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private httpClient:HttpClient) { }

  getCred(uname,pass)
  {
    let  a = {"username":uname,"password":pass}
    return this.httpClient.post<any>("http://localhost:3000/adminlogin",a);
  }

  fetchAllOrders()
  {
    return this.httpClient.get<any>("http://localhost:3000/fetchAllOrders")
  }

  findOrderDetail(id)
  {
    var i = {'item':id}
    return this.httpClient.post<any>("http://localhost:3000/findOrderDetail",i)
  }

  findDetail(id)
  {
    var ele = {"id":id}
    return this.httpClient.post<any>("http://localhost:3000/findDetail",ele)
  }

  dispatched(id)
  {
    var ele = {"id":id}
    return this.httpClient.post<any>("http://localhost:3000/productDispatched",ele)
  }

  findAllProducts()
  {
    return this.httpClient.get<any>("http://localhost:3000/findAllProducts")
  }
  getCategories()
  {
    return this.httpClient.get<any>("http://localhost:3000/getCategories")
  }
  addProduct(data)
  {
    return this.httpClient.post<any>("http://localhost:3000/addProductAdmin",data)
  }
  addCategory(data)
  {
    return this.httpClient.post<any>("http://localhost:3000/addCategoryAdmin",data)
  }

}
