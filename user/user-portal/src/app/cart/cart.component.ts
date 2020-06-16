import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CartService} from '../cart.service';
import {CommonService} from '../common.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
 
})
export class CartComponent implements OnInit {

  constructor(private router:Router,private cartService:CartService,private commonService:CommonService) { }

   product ;
   uid ; 
   detail = [];

  ngOnInit() {
    if(sessionStorage.getItem("loggedIn")==null)
    {
      swal.fire(
        {
          title: "No user found",
          text: "Logged in to access page",
          type: "info"
        }
      )
      this.router.navigate(['/login'])
    }
    else
    {
      this.uid = sessionStorage.getItem("loggedIn")
      this.loadParameter();
    }
  }

  loadParameter()
  {
    this.cartService.getCart(this.uid).subscribe(data =>{
    this.product = data
    this.detail = new Array(this.product.length)
    this.findDetailss()
    },
      error=>{
        console.log("Error in getting cart information in ")
      })
  }

  findDetailss()
  {
    let i = 0;
    this.product.forEach(element => {
      this.commonService.findDetail(element.id).subscribe(data=>{
        this.detail[i] = data
        i++;
      },error=>
        {console.log("Error in finding detail")})
    });  
  }

  decreseQuantity(pid,qty,date,time,size)
  {
    if(qty==1)
      return;
    var ob = {
      "userid":this.uid,
      "productid":pid,
      "date":date,
      "time":time,
      "size":size
    }
    this.cartService.descreseInCart(ob).subscribe(date=>{
      this.loadParameter();
    }
      ,error=>{
        console.log("Error in decrese Element in cart")
      })
  }

  increaseQuantity(pid,qty,date,time,size)
  {
    var info  = {ppid:pid,qty:1,"size":size}  
    this.commonService.checkQunatity(info).subscribe(data=>
      { 
        if(data.message!="ok")
        {
          swal.fire({
            title: "Oops qty excedd",
            text: "No more pc avaiable sorry",
            type: "error",
            position:"bottom"
          })
        }
        else
        {
            var ob = {
            "userid":this.uid,
            "productid":pid,
            "date":date,
            "time":time,
            "size":size
          }
          this.cartService.increaseInCart(ob).subscribe(date=>{
              this.loadParameter();
          }
          ,error=>{
              console.log("Error in increase Element in cart")
            })
        }
      },
      error =>
      {
        console.log("Error in fetching quantity in shop-single component")
      })  
  }

  remove(pid,qty,date,time,size)
  {
    var ob = {
      "userid":this.uid,
      "productid":pid,
      "date":date,
      "time":time,
      "size":size,
      "qty":qty
    }
    this.cartService.removeInCart(ob).subscribe(date=>{
        this.loadParameter();
    }
    ,error=>{
        console.log("Error in increase Element in cart")
      })
    
  }

  

}
