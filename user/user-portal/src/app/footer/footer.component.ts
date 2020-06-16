import { Component, OnInit } from '@angular/core';
import {UserFooterService} from '../user-footer.service'
import swal from 'sweetalert2'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  
  message = {mailid:""}

  address = 
  {
    add:"",
    mobile:"",
    email:"",
    facebook:"",
    insta:"",
    twitter:""
  }

  constructor(private service:UserFooterService) { }

  ngOnInit() {
    this.service.getAddress().subscribe(data=>
      {
      
        this.address.add = data.address ;
        this.address.mobile = data.mobile  ;
        this.address.email = data.email;
        this.address.facebook = data.facebook;
        this.address.insta = data.insta;
        this.address.twitter = data.twitter;
      },
      error=>{
        console.log("Error in fotter fetching address")
      })


  }
  
  subscribe()
  {
    if(this.message.mailid =="")
    {
      swal.fire({
        title:'No email found',
        text:"please provide proper mail id",
        type:"error"
      })
    }
    else
    {
      this.service.subsc(this.message).subscribe(data=>
        {
          swal.fire(
            "Sucess","Thanks to subscribe with us","success"
          )
          this.message.mailid = ""
        },
        error=>{console.log("Error in footer subscription")})
    }
  }

}
