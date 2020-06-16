import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import swal from 'sweetalert2';

import {CommonService} from '../common.service'
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 3,
        nav: true,
        loop: false
      },
      1500: {
        items: 3,
        nav: true,
        loop: false
      }
    }
  }

  constructor(private router:Router,private commonService: CommonService) { }

  content = 
  {
    shipping: "",
    return : "",
    support:  ""
  }

  category

 
  banner =
  {
    heading:"",
    Description:"",
    image:"",
    id: ""
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

      this.commonService.getFreeContent().subscribe(data=>{
        this.content.shipping = data.shipping;
        this.content.return =  data.return;
        this.content.support  = data.customersupport;
      }
        ,error=>{
          console.log("Error in fetching context index")
        })
     
        
      this.commonService.getCategories().subscribe(data=>{
        this.category  = data;
      },
        error=>{
          console.log("Error in fetching categories index page")
        }) 
      
        this.commonService.getFreeContent().subscribe(
          data => {
            this.banner = data.banner
          
          },
          error =>{
            console.log("Error in fetching banner index page")
          }
        )
    }
  }

  call(id)
  {
    this.router.navigate(['/shop',{categories:id}])
  }

  callShopSingle()
  {
    this.router.navigate(['/shop-single',this.banner.id])
  }

}
