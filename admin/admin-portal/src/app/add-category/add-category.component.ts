import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private router:Router,private service:ServiceService) { }

  data = {
    name:"",
    image:""
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
  }

  submitData()
  {
    this.service.addCategory(this.data).subscribe(data=>{
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
