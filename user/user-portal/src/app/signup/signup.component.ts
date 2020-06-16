import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import {CommonService} from '../common.service';
import { SignupService } from '../signup.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private router:Router , private commonserive:CommonService,private signupservice:SignupService) { }

  public cred = {
    fname :"",
    lname :"",
    username:"",
    email:"",
    gender:"",
    password:"",
  }


  userExist = false


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
    this.cred.username = this.cred.username.toLowerCase();
    this.commonserive.checkUsername(this.cred.username).subscribe(data=>
      {
        if(data!=null)
        {
          this.userExist = true
          return;
        }
        else
        {
          this.insertData()
        }
      },
      error =>{"Error in checkusername"}
 )}

  insertData()
  {
    this.userExist = false;
    this.signupservice.insertData(this.cred).subscribe(Data=>
      {
        sessionStorage.setItem("loggedIn",Data._id)
        this.router.navigate(['/home'])
      },
      error=>{console.log("Error in saving data")}

    )}

}
