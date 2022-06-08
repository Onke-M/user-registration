import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/snackbar.service';


const API_URL = environment.API_URL;
let valid: any;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginUser!: FormGroup
  constructor(public http: HttpClient, public snackbarService: SnackbarService, public router: Router) { }

  ngOnInit(){
    this.snackbarService.openSnackBar();
    this.loginUser = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
  public logUser(): void {
    //Check if the form is valid
    if(this.loginUser.valid){
      //Send login details to API
      this.http.post(`${API_URL}/Authentication/Login`, this.loginUser.value)
      .subscribe((results) => {
        //Retrieve response from API
        valid = results
        //Check if the user details are the same as the API's response
        if(this.loginUser.value.emailAddress == valid.emailAddress)
        {
          //If they are then generate the notification that'll display in the otp page and route to it
          this.snackbarService.setMessage("The OTP has been sent to your email address")
          this.router.navigate(["/otp"]);
        }
        else
        {
          //If not then generate and display an error message
          this.snackbarService.setMessage("Invalid user credentials");
          this.snackbarService.openSnackBar();
        }
      })
  }

}
}
