import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import swal from 'sweetalert2';
import {CommonService} from '../common.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private route:Router,private commonService: CommonService) { }
  category ; 

  userTotalQuantity = 0 ; 

  productName;

  ngOnInit() {

    this.commonService.getCategories().subscribe(data=>{
      this.category  = data;
    },
      error=>{
        console.log("Error in fetching categories index page")
      }) 
    
    var uid = sessionStorage.getItem('loggedIn')
    this.commonService.findCartTotal(uid).subscribe(data=>{
      this.userTotalQuantity = data.cart.length
    },error=>{
      console.log("Error in fetching user total qunatity")
    })


  }

  logout()
  {
    sessionStorage.removeItem("loggedIn")
    this.route.navigate(['/login'])
  }

  callShop(id)
  {
    this.route.navigate(['/shop',{categories:id}])
  }

  newArrival()
  {
    this.route.navigate(['/shop',{newArrival:true}])
  }

  
  callFunction(e)
  {
    if(e.keyCode==13)
    {
      this.productName = this.productName.toLowerCase()
      this.productName = this.productName.trim()
      this.commonService.findId(this.productName).subscribe(data=>
        {
          if(data.id=="notfound")
          {
            swal.fire(
              {
                title: "Not found",
                text: "Sorry no product found",
                type: "error",
                position:"bottom"
              }
            )
            this.productName  = ""
          }
          else
          {
              this.route.navigate(['/shop-single',data.id])
          }
        },
        error=>
        {

        })
    }  
  }

}
