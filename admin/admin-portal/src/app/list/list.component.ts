import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private router:Router , private common:ServiceService) { }

  products ; 
  categories ; 

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
      this.common.findAllProducts().subscribe(data=>{
        this.products = data.d;
      })
      this.common.getCategories().subscribe(data=>{
        this.categories = data;
      })
    }
  }

  addProduct()
  {
    this.router.navigate(['/addProduct'])
  }
  logout()
  {
    sessionStorage.removeItem("loggedIn")
    this.router.navigate(['/login'])
  }
}
