import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup} from '@angular/forms'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.API_URL;

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  
  registerUser!: FormGroup;

  constructor(public http: HttpClient) { }

  ngOnInit(){
    this.registerUser = new FormGroup({
      emailAddress: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }

  public addUser(): void {
    if(this.registerUser.valid){
      this.http.post(`${API_URL}/Authentication/Register`, this.registerUser.value)
      .subscribe((results) => {
        console.log(results);
      })
  }

}
}
