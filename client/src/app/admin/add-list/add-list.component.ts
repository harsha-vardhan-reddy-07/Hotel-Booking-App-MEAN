import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-list',
  templateUrl: './add-list.component.html',
  styleUrls: ['./add-list.component.css']
}) 
export class AddListComponent {
  
  carouselImages = "";
  roomTypesInput = "";
  roomCostsInput = "";

  hotel = {
    HotelName: "",
    Address: "",
    image:"",
    roomImages: [] as string[],
    roomTypes: [] as string[],
    roomCosts: [] as number[],
    rating:""
  }; 

  urls: string[] = [];

  constructor(private http: HttpClient,private route:Router) {}

  async submitForm(form: any) {

    console.log("startted1");
    this.urls = this.carouselImages.split(',');
    this.urls.forEach(url => {
      url = url.trim();
      if (url) {
        this.hotel.roomImages.push(url);
      }
    });

    console.log("startted2", this.hotel.roomImages);

    // Extract room types and costs from the form
    this.hotel.roomTypes = this.roomTypesInput.split(',').map((type: string) => type.trim());
    this.hotel.roomCosts = this.roomCostsInput.split(',').map((cost: string) => parseFloat(cost.trim()));

    console.log("startted3", this.hotel.roomTypes);
    console.log("startted4", this.hotel.roomCosts);

    setTimeout (() => {
      

      this.http.post('http://localhost:3000/addlist', this.hotel).subscribe(
        (response) => {
          console.log('hotel data submitted successfully:', response);
          alert("hotel added sucessfully")
          
        },
        (error) => {
          console.log('Error submitting hotel data:', error);
          alert("hotel added unsuccessfully")
        }
      );
      form.reset();


   }, 1000);


  }


}