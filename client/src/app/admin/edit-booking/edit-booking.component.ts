import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-booking',
  templateUrl: './edit-booking.component.html',
  styleUrls: ['./edit-booking.component.css']
})
export class EditBookingComponent implements OnInit {
  bookingData = {
    HotelName: "",
    name: "",
    email: "",
    checkInDate: new Date(),
    checkOutDate: new Date(),
    room: "",
    adults: 0,
    children: 0,
    cost:0,
    bookingStatus: "pending"
  };
id:String="";
  constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router) {}

  ngOnInit() {
    // Retrieve the '_id' parameter from the query params
    this.route.queryParamMap.subscribe(params => {
      const _id = params.get('id');
    
      if (_id) {
        this.fetchUserDetails(_id);
      } 
    });
  }

  

  fetchUserDetails(_id: string) {
    this.http.get<any>(`http://localhost:3000/editBooking/${_id}`).subscribe(
      (response: any) => {
        console.log(response); 
        this.bookingData.HotelName  = response.HotelName;
        this.bookingData.name = response.name;
        this.bookingData.email = response.email;
        this.bookingData.checkInDate =  response.checkInDate;
        this.bookingData.checkOutDate  = response.checkOutDate;
        this.bookingData.room = response.room;
        this.bookingData.adults = response.adults;
        this.bookingData.children = response.children;
        this.bookingData.cost  = response.cost;
        this.bookingData.bookingStatus = response.bookingStatus;
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  update() {
    this.route.queryParamMap.subscribe(params => {
      const _id = params.get('id');
  
      this.http.put(`http://localhost:3000/editBooking/${_id}`, this.bookingData).subscribe(
        () => {
          window.alert('Updated');
          console.log('updated successfully');
          // Perform any additional actions after successful update
        },
        (error) => {
          if (error.status === 200) {
            window.alert('Updated');
            console.log(' updated successfully');
            this.router.navigate(['/admin-bookings'])
          } else {
            window.alert('Update failed');
            console.error('Error updating :', error);
          }
        }
      );
    });
  }
  
}
 