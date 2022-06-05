import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginUser!: FormGroup
  constructor(public http: HttpClient) { }

  ngOnInit(){
    this.loginUser = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
  public logUser(): void {
    if(this.loginUser.valid){
      this.http.post(`${API_URL}/Authentication/Login`, this.loginUser.value)
      .subscribe((results) => {
        console.log(results);
      })
  }

}
}
