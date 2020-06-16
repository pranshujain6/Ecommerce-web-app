import { Component, OnInit } from '@angular/core';
import {Router} from  '@angular/router';
import {LoginService} from '../login.service';
import swal from 'sweetalert2'
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private router:Router,private loginService : LoginService) { }

  visibility  = false;
  cred = {
    uname:"",
    pass:""
  }

  userid ; 

  ngOnInit() {
    if(sessionStorage.getItem("loggedIn")!=null)
    {
      swal.fire(
        {
          title: "Already Logged in",
          text: "Log out to access page",
          type: "info"
        })
      this.router.navigate(['/home'])
    }
  }

  submitData()
  {
    this.cred.uname = this.cred.uname.toLowerCase() 
    this.loginService.getCred(this.cred.uname,this.cred.pass).subscribe(data => {
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
    this.router.navigate(['/home']);
  }

  moveSignup()
  {
    this.router.navigate(['/signup'])
  }
}





