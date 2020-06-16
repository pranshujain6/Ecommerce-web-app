import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-orderfinal',
  templateUrl: './orderfinal.component.html',
  styleUrls: ['./orderfinal.component.css']
})
export class OrderfinalComponent implements OnInit {

  pid ;
  orderDetail;
  products;

  constructor(private router:Router,private service:ServiceService,private route:ActivatedRoute) { }

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
      this.detail();
    }
  }
  
  detail()
  {
    this.route.paramMap.subscribe((params:ParamMap)=>{
    this.pid = params.get('id')
    })
    this.service.findOrderDetail(this.pid).subscribe(data=>{
      this.orderDetail = data;
      this.findProductDetail();
    },error=>{
      console.log("Error in fetching other details")
    })
  }

  findProductDetail()
  {
    var i  =0;
    this.products = new Array(this.orderDetail.products.length)
    this.orderDetail.products.forEach(element => {
      this.service.findDetail(element.id).subscribe(data=>{
        this.products[i] = data;
        i++;
      },
        error=>{
          console.log("Error in fetching data")
        })
    });
  }

  dispatched()
  {
    this.service.dispatched(this.pid).subscribe(data=>{
      if(data.text=="sucess")
      {
        swal.fire(
          {
            title: "Dispatched",
            text: "Product dispatch sucess",
            type: "success"
          })
      }
      this.router.navigate(['/dashboard'])
    },
    error=>{
      console.log("Error in product dispatching")
    })
  }
  logout()
  {
    sessionStorage.removeItem("loggedIn")
    this.router.navigate(['/login'])
  }

}
