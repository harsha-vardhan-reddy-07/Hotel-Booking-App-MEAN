import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

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
      const _id = params.get('id');
    
      console.log(_id);
      if (_id) {
        this.fetchUserDetails(_id);
      } 
    });
  }

  fetchUserDetails(_id: string) {
    this.http.get<any>(`http://localhost:3000/listall/${_id}`).subscribe(
      (response: any) => {
        console.log(response);
        this.user.HotelName  = response.HotelName;
        this.user.Address = response.Address;
        this.user.image = response.image;
        this.user.roomImages = response.roomImages;
        this.user.roomTypes = response.roomTypes;
        this.user.roomCosts =  response.roomCosts;
        this.user.rating = response.rating;

        this.roomImg = response.roomImages.toString();
        this.roomType = response.roomTypes.toString();
        this.roomCost = response.roomCosts.toString();
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  update() {
    this.route.queryParamMap.subscribe(params => {
      const _id = params.get('id');

      this.user.roomImages = this.roomImg.split(',').map((type: string) => type.trim());
      this.user.roomTypes = this.roomType.split(',').map((type: string) => type.trim());
      this.user.roomCosts = this.roomCost.split(',').map((cost: string) => parseFloat(cost.trim()));

  
      this.http.put(`http://localhost:3000/listall/${_id}`, this.user).subscribe(
        () => {
          window.alert('Updated'); 
          console.log('updated successfully');
          // Perform any additional actions after successful update
        },
        (error) => {
          if (error.status === 200) {
            window.alert('Updated');
            console.log(' updated successfully');
            this.router.navigate(['/all-list'])
          } else {
            window.alert('Update failed');
            console.error('Error updating :', error);
          }
        }
      );
    });
  }
  
  
  }



