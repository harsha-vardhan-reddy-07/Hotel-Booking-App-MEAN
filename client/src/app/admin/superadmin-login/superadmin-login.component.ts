import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-superadmin-login',
  templateUrl: './superadmin-login.component.html',
  styleUrls: ['./superadmin-login.component.css']
})
export class SuperadminLoginComponent {

  supLogForm: FormGroup;

  constructor(private http:HttpClient, private router: Router){
    this.supLogForm = new FormGroup({
      Admin: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(details: { Admin: string, password: string }): void {
    this.http.post('http://localhost:3000/superadminlogin', details).subscribe(
      (response: any) => {
        if (response && response.superJwtToken) {
          

          window.alert('Super Admin Login Successfully!');
          this.router.navigate(['/dash1']);
          localStorage.setItem('superJwtToken', response.superJwtToken);
         
          localStorage.setItem('admin', response.Admin);
         
          
        } else {
          window.alert('Invalid user or password');
        }
      },
      (error) => {
        console.error(error);
        window.alert(error + 'Login failed! Server Error');
      }
    );
  }

}
