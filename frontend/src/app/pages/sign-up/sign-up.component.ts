import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/interface/user';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  //Form variables
  signupForm:any = FormGroup;
  
  submitted = false;

  firstname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";

  constructor(private authService : ApiService, private formBuilder: FormBuilder, private toastService: NgToastService,private router: Router)
  {}

  //Add user form actions
  get f() { return this.signupForm.controls; }

  

  ngOnInit(): void {
    //Add User form validations
    this.signupForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      });
  }

  onSubmit() {
  
    let bodyData = {
      firstname: this.firstname,
      lastname: this.lastname,
      email: this.email,
      password: this.password
    };
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.authService.signUp(bodyData).subscribe(res =>{

        if(res.success){
          console.log(res);
          this.toastService.success({ detail: 'SUCCESS', summary: res.message, duration: 4000 });
          this.router.navigateByUrl('/boarding');
          // alert("User registered successfuly");
        }else{
          this.toastService.error({ detail: 'ERROR', summary: res.error.message, sticky:true });
          // alert(res.message)
          console.log(res);
        }
        
              
      }, (error: HttpErrorResponse) => {
        this.toastService.error({ detail: 'Ooops', summary: error.error.message, sticky:true });
      })
      // alert("Great!!");
    }
   
  }

  // signUp()
  // {
  //   let bodyData = {
  //     fullname: this.fullname,
  //     lastname: this.lastname,
  //     email: this.email,
  //     password: this.password
  //   };
  //   this.api.signUp(bodyData).subscribe(res =>{
  //     console.log(res);
  //     alert("User registered successfuly")      
  //   })
  // }

}
