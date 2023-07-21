import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  //Form variables
  signinForm:any = FormGroup;
  submitted = false;

  email: string = "";
  password: string = "";

  errMessage: string = "";

  constructor(private api : ApiService, private router : Router, private formBuilder: FormBuilder)
  {}

  //Add user form actions
  get f() { return this.signinForm.controls; }

  onSubmit() {
  
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      alert("Great!!");
    }
   
  }
  
  ngOnInit(): void {
    //Add User form validations
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      });
    
  }

  signIn()
  {
    let bodyData = {
      email: this.email,
      password: this.password
    };
    this.api.signUp(bodyData).subscribe(res =>{
      console.log(res);
      
    })
  }

}
