import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  data = {
    name:"",
    sdesc:"",
    ldesc:"",
    price:1,
    image:"",
    qtysize:
      {small:1,medium:1,large:1,extralarge:1},
  }

  constructor(private router:Router,private service:ServiceService) { }

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
  }

  submitData()
  {
    this.service.addProduct(this.data).subscribe(data=>{
      if(data.i=="d")
      {
        this.router.navigate(['/list'])
      }
    },error=>{
      
    })
  }

  logout()
  {
    sessionStorage.removeItem("loggedIn")
    this.router.navigate(['/login'])
  }

}
