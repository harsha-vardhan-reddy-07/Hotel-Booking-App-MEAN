import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-bookings',
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
  List: any[] = [];
  
  public isLoading = false;
  
  hotelName!: string | null;


  constructor(private http: HttpClient, private route: Router) {

  }



  ngOnInit() {
    this.hotelName = localStorage.getItem('HotelName');
    if (!this.hotelName) {
      console.error('Hotel name not found in local storage');
      return;
    }
    this.fetchBookings();
  }

  fetchBookings() {
    this.isLoading = true;


    this.http.get<any[]>(`http://localhost:3000/adminbookings/${this.hotelName}`).subscribe(
      lists => {
     
        this.List = lists;
         
        this.isLoading = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
      }
    );
  }

  Edit(_id: string) {
    this.route.navigate(['/edit-booking'], { queryParams: { id: _id } });
  }


 
}
