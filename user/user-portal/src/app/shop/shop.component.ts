import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import swal from 'sweetalert2';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  category

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

  constructor(private router:Router,private route:ActivatedRoute,private common:CommonService) { }

  newFound  = null;
  catFound = null;
  detail ; 
  products

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
      this.common.getCategories().subscribe(data=>{
        this.category  = data;
      },
        error=>{
          console.log("Error in fetching categories index page")
        }) 
      this.checkType();
    }
  }

  checkType()
  {
      this.route.paramMap.subscribe((params:ParamMap)=>{
      this.catFound = params.get('categories')
      this.newFound = params.get('newArrival')
    })
    this.fetchProducts();
  }

  fetchProducts()
  {
    if(this.catFound != null)
    {
      let cat = {cat:this.catFound}
      var i = 0
      this.common.findProductsCategory(cat).subscribe(data=>{
        this.detail  = new Array(data.item.length)
        data.item.forEach(element=>{
          this.common.findDetail(element).subscribe(data=>{
            this.detail[i] = data;
            i++;
          },error=>{
            console.log("in fetch product category wise")
          })
        })
      })
    } 
    else if(this.newFound != null)
    {
      var  i = 0;
      this.common.findNewProducts().subscribe(data=>{
        this.detail = new Array(data.item.length)
        data.item.forEach(element => {
          this.common.findDetail(element).subscribe(data=>{
            this.detail[i] = data; 
            i++;
          },error=>{
            console.log("Error in fetching new Arrival")
          })
        });
      })
     
    }
    else
    {
      this.common.findAllProducts().subscribe(data=>{
        this.detail = data.d;
      })
     
      
    }
  }

  call(id)
  {
    this.router.navigate(['/shop',{categories:id}])
  }

 callme(id)
 {
   this.router.navigate(['/shop-single',id]);
 }

}
