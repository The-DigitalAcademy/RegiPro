import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  fullname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";

  constructor(private http: HttpClient, private api : ApiService)
  {

  }

  ngOnInit(): void {

  }

  signUp()
  {
    let bodyData = {
      fullname: this.fullname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };
    
  }

}
