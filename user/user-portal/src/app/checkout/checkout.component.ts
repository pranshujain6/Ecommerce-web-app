import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {CartService} from '../cart.service';
import {CommonService} from '../common.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  detail = {
    uid:"",
    fname:"",
    lname:"",
    address:"",
    state:"",
    zip:"",
    email:"",
    phone:"",
    ordernote:"",
    products:[],
    date:"",
    time:"",
    total:0,
    status:"ordered"
  }

  pdescription ; 
  constructor(private router:Router,private cartService:CartService,private commonService:CommonService) { }

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
     this.detail.uid  = sessionStorage.getItem("loggedIn")
    this.fetchBill();
    }
  }
  
  fetchBill()
  {
      this.cartService.getCart(this.detail.uid).subscribe(data =>{
      this.detail.products = data;
      this.pdescription = new Array(this.detail.products.length)
      this.findDetailss();
      },
      error=>{
        console.log("Error in getting cart information in checkout ")
      })
  }

  findDetailss()
  {
    let i = 0;
    this.detail.products.forEach(element => {
      this.commonService.findDetail(element.id).subscribe(data=>{
       this.pdescription[i] = data;
        this.detail.total += this.pdescription[i].price*element.qunatity
        i++;
      },
    error=>
        {console.log("Error in finding detail in checkout")})
    });  
  }

  submitData()
  {
    this.commonService.placeOrder(this.detail).subscribe(data=>
    {
        this.router.navigate(['/thankyou'])
    },
    error=>{
      console.log("Error in checkout")
    });
  }

  


}
