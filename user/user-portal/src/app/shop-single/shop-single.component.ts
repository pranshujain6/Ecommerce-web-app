import { Component, OnInit } from '@angular/core';
import {Router,ActivatedRoute, ParamMap} from '@angular/router';
import swal from 'sweetalert2';
import {CommonService} from '../common.service';
import {ShopSingleService} from '../shop-single.service'

@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.css']
})
export class ShopSingleComponent implements OnInit {

  constructor(private router:Router,private commonService:CommonService,private route:ActivatedRoute,private shopservice:ShopSingleService) { }


  productDetail = 
  {
    name:"",
    sdesc:"",
    ldesc:"",
    price:"",
    iamge:"",
    qtysize:
    {
      small:"",
      medium:"",
      large:"",
      extralarge:""
    }
  } ;

  pid ; 

  info = 
  {
    id:"",
    qty:1,
    size:"s",
    ppid:""
  }


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
      this.info.id=sessionStorage.getItem("loggedIn")
      this.route.paramMap.subscribe((params:ParamMap)=>{
        let id = params.get('id')
        this.pid = id;
      })
      this.info.ppid=this.pid   
      this.commonService.findDetail(this.pid).subscribe(data=>
        {
         
          if(data==null)
          {
            swal.fire({
              title: "No product found",
              text: "You might changed URL",
              type: "error",
              position:"bottom"
            })
            this.router.navigate(['/home'])
          }
          else
          {
             this.productDetail = data;
          }
        },
        err =>
        {
          console.log("Error in finding detail at shop-single element")
        })
    }
  }

  
  increaseqty()
  {
    this.info.qty++;
  }
  decreaseqty()
  {
    if(this.info.qty==1)
    {}
    else
    {
      this.info.qty--;
    }

  }

  insertData()
  {
    this.commonService.checkQunatity(this.info).subscribe(data=>
      {
        if(data.message!="ok")
        {
          swal.fire({
            title: "Oops qty excedd",
            text: "Please selet upto "+data.message+" pieces",
            type: "error",
            position:"bottom"
          })
        }
        else
        {
          this.submit()
        }
      },
      error =>
      {
        console.log("Error in fetching quantity in shop-single component")
      })
  }

  submit()
  {
    this.shopservice.insertData(this.info).subscribe(data=>{
        if(data.response=="success")
        {
            swal.fire({
              title: "Sucess",
              text: "Sucessfully added to your cart",
              type: "success",
              position:"bottom"
            })
            this.router.navigate(['/cart']);
        }
        else
        {
          swal.fire({
            title: "Opration failed",
            text: "Failed due to server error",
            type: "error",
            position:"bottom"
          })
        }
    },
    error=>
    {

    })
  }


}
