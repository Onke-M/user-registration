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
    this.snackbarService.openSnackBar();

    this.otpForm = new FormGroup({
      oneTimePin: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    })
  }

  public verifyOTP(): void {
    if(this.otpForm.valid){
      this.http.post(`${API_URL}/Authentication/SendOTP`, this.otpForm.value)
      .subscribe((results) => {
        valid = results
        if(this.otpForm.value.oneTimePin == valid.oneTimePin)
        {
          this.router.navigate(["/dashboard"]);
        }
        else
        {
          this.snackbarService.setMessage("Invalid OTP");
          this.snackbarService.openSnackBar();
        }
      })
  }
  }
}
