import { Component, OnInit } from '@angular/core';
import { SnackbarService } from 'src/app/snackbar.service';
import {FormControl, Validators, FormGroup} from '@angular/forms'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

const API_URL = environment.API_URL;
let valid: any;


@Component({
  selector: 'app-otp-page',
  templateUrl: './otp-page.component.html',
  styleUrls: ['./otp-page.component.css']
})
export class OtpPageComponent implements OnInit {
  otpForm!: FormGroup
  constructor(public http: HttpClient, public snackbarService: SnackbarService, public router: Router) { }

  ngOnInit(){
    //Generate notification from successful login
    this.snackbarService.openSnackBar();

    //form to retrieve otp
    this.otpForm = new FormGroup({
      oneTimePin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    })
  }

  //Function to verify otp
  public verifyOTP(): void {
    //First check if the form is valid
    if(this.otpForm.valid){
      //If valid then send the otp to the API for verification
      this.http.post(`${API_URL}/Authentication/SendOTP`, this.otpForm.value)
      .subscribe((results) => {
        //Retrieve otp from backend to compare
        valid = results
        if(this.otpForm.value.oneTimePin == valid.oneTimePin)
        {
          //If the inputted otp is the same as the one sent in the email then route to dashboard
          this.router.navigate(["/dashboard"]);
        }
        else
        {
          //If not then display error message
          this.snackbarService.setMessage("Invalid OTP");
          this.snackbarService.openSnackBar();
        }
      })
  }
  }
}
