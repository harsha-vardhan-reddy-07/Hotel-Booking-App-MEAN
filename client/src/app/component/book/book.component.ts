import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})





export class BookComponent {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});


  ht = "";

  CarouselList: any[] = [];
  RoomTypelList: any[] = [];
  RoomCostlList: any[] = [];

  roomValue: number = 0;

  numberOfDays: number = 0;

  bookingData = {
    userId: "",
    HotelName: "",
    name: "",
    email: "",
    checkInDate: "",
    checkOutDate: "",
    room: "",
    adults: 0,
    children: 0,
    cost:0,
    bookingStatus: "pending"
  };

  currentDate = new Date();
  year = this.currentDate.getFullYear();
  month = this.currentDate.getMonth() + 1; 
  day = this.currentDate.getDate(); 
  date = `${this.year}-${this.month < 10 ? '0' + this.month: this.month}-${this.day}`;
  
  //check whether checkin date is not in the past 
  checkCheckIn = true;

  //check whether checkout date is not before checkout
  checkCheckOut = true;

  dateError = '';

  onRoomTypeChange(){

    // this.roomValue = newValue;
    // this.bookingData.cost = this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.adults  + this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.children * 0.6;
  }
  checkIn = new Date()
  onCIDateChange(newValue: string) {
    this.bookingData.checkInDate = newValue;

    this.checkIn = new Date(this.bookingData.checkInDate)

    if (this.currentDate >  this.checkIn){
      this.checkCheckIn = false;
    }else{
      this.checkCheckIn = true;
    }

    if(this.checkCheckIn && this.checkCheckOut){
      this.dateError = ''; 
      const start = new Date(this.bookingData.checkInDate);
      const end = new Date(this.bookingData.checkOutDate);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


      this.bookingData.room =  this.RoomTypelList[this.roomValue];

      this.bookingData.cost = this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.adults  + this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.children * 0.6;

    }
    else{
      this.dateError = 'Please check the dates you entered';
      this.numberOfDays = 0;
    }

  }

 
  checkOut = new Date();
  onCODateChange(newValue: string) {
    this.bookingData.checkOutDate = newValue;

    this.checkOut = new Date(this.bookingData.checkOutDate)

    if (this.checkOut <  this.checkIn){
      this.checkCheckOut = false;
    }else{
      this.checkCheckOut = true;
    }

    if(this.checkCheckIn && this.checkCheckOut){
      this.dateError = ''; 
      const start = new Date(this.bookingData.checkInDate);
      const end = new Date(this.bookingData.checkOutDate);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      this.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      this.bookingData.room =  this.RoomTypelList[this.roomValue];

      this.bookingData.cost = this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.adults  + this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.children * 0.6;

    }
    else{
      this.dateError = 'Please check the dates you entered';
      this.numberOfDays = 0;
      
    }
  }

  onAdultsChange(newValue: number) {
    this.bookingData.adults = newValue;
    this.bookingData.room =  this.RoomTypelList[this.roomValue];
    this.bookingData.cost = this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.adults  + this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.children * 0.6;

  }

  onChildrenChange(newValue: number) {
    this.bookingData.children = newValue;
    this.bookingData.room =  this.RoomTypelList[this.roomValue];
    this.bookingData.cost = this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.adults  + this.numberOfDays * this.RoomCostlList[this.roomValue] * this.bookingData.children * 0.6;

  }

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { 
    const user=localStorage.getItem('jwtToken')
    if (!user){
     this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const hotelName = params['hotelname'];
      this.ht = hotelName;

      // Use the hotel name as needed
      this.bookingData.HotelName = this.ht;

      // Retrieve the user ID from local storage
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.bookingData.userId = userId;
      }

      this.fetchCarousel(hotelName);
      this.fetchRoomTypes(hotelName);
      this.fetchRoomConts(hotelName);

    });
  }

  

  fetchCarousel(hotelName: string) {

    this.http.get<any[]>(`http://localhost:3000/carouselImages/${hotelName}`).subscribe(
      lists => {
        this.CarouselList = lists;
      },
      error => {
        console.error(error);
      }
    );
  }


  fetchRoomTypes(hotelName: string) {
    
    this.http.get<any[]>(`http://localhost:3000/roomTypes/${hotelName}`).subscribe(
      lists => {
        this.RoomTypelList = lists;
      },
      error => {
        console.error(error);
      }
    );
  }


  fetchRoomConts(hotelName: string) {
    
    this.http.get<any[]>(`http://localhost:3000/roomCosts/${hotelName}`).subscribe(
      lists => {
        this.RoomCostlList = lists;
      },
      error => {
        console.error(error);
      }
    );
  }


  submitForm(form: any) {
    // Pass the name to the userbooking page
    this.router.navigate(['/userbooking']);

    // Send the booking data to the server
    this.http.post('http://localhost:3000/book', this.bookingData).subscribe(
      (response) => {
        console.log(response);
        alert('Booking successful');
      },
      (error) => {
        console.log('Error submitting data:', error);
        alert('Booking failed!');
      }
    );
    form.reset();
  }
}












