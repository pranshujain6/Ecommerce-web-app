import { Component, OnInit } from '@angular/core';
import  {Router} from '@angular/router';
import swal from 'sweetalert2'
import {ContactService} from '../contact.service'

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contact = 
  {
    fname: "",
    lname: "",
    email: "",
    subject: "",
    message: ""
  }

  constructor(private router:Router,private contactservice:ContactService) { }

  ngOnInit() {
    if(sessionStorage.getItem("loggedIn")==null)
    {
      swal.fire(
        {
          title: "No user found",
          text: "Log in to access page",
          type: "info"
        })
      this.router.navigate(['/login'])
    }
  }

  submitData()
  {
    this.contactservice.submit(this.contact).subscribe(data=>
    {
      swal.fire(
        {
          title: "Sucess",
          text: "We received your query we respond within an hour",
          type: "success"
        })
    },
    error => {
      console.log("Eror at contact contact component")
    })
  }

}
