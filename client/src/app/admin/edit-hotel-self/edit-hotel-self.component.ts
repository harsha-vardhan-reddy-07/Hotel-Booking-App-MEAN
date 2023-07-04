
  import { HttpClient } from '@angular/common/http';
  import { Component, OnInit } from '@angular/core';
  import { ActivatedRoute, Router } from '@angular/router';
  
  @Component({
    selector: 'app-edit-hotel-self',
    templateUrl: './edit-hotel-self.component.html',
    styleUrls: ['./edit-hotel-self.component.css']
  })
  export class EditHotelSelfComponent implements OnInit {
  
    roomImg = "";
    roomCost = "";
    roomType = ""; 
  
    user: any = {
      HotelName: "",
      Address: "",
      image:"", 
      roomImages: [] as string[],
      roomTypes: [] as string[],
      roomCosts: [] as number[],
      rating:""
    };
  id:String="";
    constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router) {}
  
    ngOnInit() {
      // Retrieve the '_id' parameter from the query params
      this.route.queryParamMap.subscribe(params => {
        const _id = params.get('hotel');
      
        console.log(_id);
        if (_id) {
          this.fetchUserDetails(_id);
        } 
      });
    }
  
    fetchUserDetails(_id: string) {
      this.http.get<any>(`http://localhost:3000/hotelSelfUpdate/${_id}`).subscribe(
        (response: any) => {
          console.log(response[0]);
          this.user.HotelName  = response[0].HotelName;
          this.user.Address = response[0].Address;
          this.user.image = response[0].image;
          this.user.roomImages = response[0].roomImages;
          this.user.roomTypes = response[0].roomTypes;
          this.user.roomCosts =  response[0].roomCosts;
          this.user.rating = response[0].rating;
  
          this.roomImg = response[0].roomImages.toString();
          this.roomType = response[0].roomTypes.toString();
          this.roomCost = response[0].roomCosts.toString();
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  
    update() {
      this.route.queryParamMap.subscribe(params => {
        const _id = params.get('hotel');
  
        this.user.roomImages = this.roomImg.split(',').map((type: string) => type.trim());
        this.user.roomTypes = this.roomType.split(',').map((type: string) => type.trim());
        this.user.roomCosts = this.roomCost.split(',').map((cost: string) => parseFloat(cost.trim()));
  
    
        this.http.put(`http://localhost:3000/hotelSelfUpdate/${_id}`, this.user).subscribe(
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
  
  
  
  
