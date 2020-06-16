import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }


  checkUsername(uname)
  {
    var a = {"username":uname}
    return this.http.post<any>("http://localhost:3000/checkUsername",a)
  }

  getFreeContent()
  {
    return this.http.get<any>("http://localhost:3000/getFreeContent")
  }
  
  getCategories()
  {
    return this.http.get<any>("http://localhost:3000/getCategories")
  }

  findId(Name)
  {
    var ele  = {"name":Name}
    return this.http.post<any>("http://localhost:3000/findIdProductName",ele)
  }

  findDetail(id)
  {
    var ele = {"id":id}
    return this.http.post<any>("http://localhost:3000/findDetail",ele)
  }

  checkQunatity(info)
  {
    return this.http.post<any>("http://localhost:3000/checkQuantity",info)
  }

  placeOrder(info)
  {
    return this.http.post<any>("http://localhost:3000/placeOrder",info)
  }

  findAllProducts()
  {
    return this.http.get<any>("http://localhost:3000/findAllProducts")
  }
  findProductsCategory(cat)
  {
    return this.http.post<any>("http://localhost:3000/findCategoryProduct",cat);
  }
  findNewProducts()
  {
    return this.http.get<any>("http://localhost:3000/findNewProduct");
  }

  findCartTotal(uid)
  {
    var ob = {"id":uid}
    return this.http.post<any>("http://localhost:3000/findCartTotalQunatity",ob)
  }

}
