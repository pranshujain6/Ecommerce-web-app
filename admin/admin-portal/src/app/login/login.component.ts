import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import {ServiceService} from '../service.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  visibility  = false;
  cred = {
    uname:"",
    pass:""
  }

  userid ; 

  constructor(private router:Router , private service:ServiceService) { }

  ngOnInit() {
    if(sessionStorage.getItem("loggedIn")!=null)
    {
      swal.fire(
        {
          title: "Already Logged in",
          text: "Log out to access page",
          type: "info"
        })
      this.router.navigate(['/dashboard'])
    }

  }

  submitData()
  {
    this.cred.uname = this.cred.uname.toLowerCase() 
    this.service.getCred(this.cred.uname,this.cred.pass).subscribe(data => {
      if(data.message==null)
      {
        this.visibility = true; 
      }
      else
      {
        this.userid = data.message
        this.visibility = false;
        this.home();
      }
    },
    err => {console.log(err)})
  }

  home()
  {
    sessionStorage.setItem('loggedIn', this.userid);
    this.router.navigate(['/dashboard']);
  }

}
