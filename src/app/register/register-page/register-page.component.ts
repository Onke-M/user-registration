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
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  
  registerUser!: FormGroup;

  constructor(public http: HttpClient, public snackbarService: SnackbarService, public router: Router) { }

  ngOnInit(){
    this.registerUser = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
    })
  }

  public addUser(): void {
    if(this.registerUser.valid){
      this.http.post(`${API_URL}/Authentication/Register`, this.registerUser.value)
      .subscribe((results) => {
        valid = results;
        if(this.registerUser.value.emailAddress == valid.emailAddress)
        {
          this.snackbarService.setMessage("Registered successfully");
          this.router.navigate(["/login"]);
        }
        else
        {
          this.snackbarService.setMessage("User account already exists");
          this.snackbarService.openSnackBar();
        }
      })
  }

}
}
