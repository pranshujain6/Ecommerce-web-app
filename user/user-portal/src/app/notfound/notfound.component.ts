import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import swal from 'sweetalert2'

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    if(sessionStorage.getItem("loggedIn")==null)
    {
      swal.fire(
        {
          title: "Log in first",
          text: "Log in to access page",
          type: "info"
        })
      this.router.navigate(['/login'])
    }
  }

}
