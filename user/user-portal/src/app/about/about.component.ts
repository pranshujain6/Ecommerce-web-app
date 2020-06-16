import { Component, OnInit } from '@angular/core';
import {CommonService} from '../common.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

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
 
  team ; 

  content = {
    return: "",
    shipping:"",
    support:"",
    howwestarted:""
  }
  constructor(private commonService:CommonService,private router:Router) { }

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
      this.commonService.getFreeContent().subscribe(data=>
        {
          this.content.return = data.return;
          this.content.shipping = data.shipping;
          this.content.support = data.customersupport;
          this.content.howwestarted = data.howwestarted;
        },
        error=>{
          console.log("Error in fetching data in about")
        })
        this.commonService.getFreeContent().subscribe(data=>
          {
            this.team  =data.team; 
          },
          error=>
          {
            console.log("Error in team fetch about")
          })
    }
  }

}
