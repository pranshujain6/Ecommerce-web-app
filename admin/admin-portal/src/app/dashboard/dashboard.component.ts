import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router'
import { ServiceService } from '../service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router:Router,private service: ServiceService) { }

  order ; 
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
      this.fetchAllOrders();
    }
  }

  fetchAllOrders()
  {
    this.service.fetchAllOrders().subscribe(data=>{
      this.order  = data.item;
    },error=>{
      console.log("Error in fetching data");
    })
  }

  move(id)
  {
    this.router.navigate(['/orderFinal',id])
  }

  logout()
  {
    sessionStorage.removeItem("loggedIn")
    this.router.navigate(['/login'])
  }
}
