import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/service/api.service';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit{

  //Form variables
  signinForm:any = FormGroup;
  submitted = false;
  userDetails! : User;
  email: string = "";
  password: string = "";

  errMessage: string = "";

  constructor(private authService : ApiService, private router : Router, private formBuilder: FormBuilder)
  {}

  //Add user form actions
  get f() { return this.signinForm.controls; }

  onSubmit() {

    let bodyData = {
      email: this.email,
      password: this.password
    };
  
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.authService.signIn(bodyData).subscribe(res =>{

        if(res.success){
          console.log(res);
          // alert(res.message);
          this.router.navigateByUrl('/home');
          sessionStorage.setItem('user Details', JSON.stringify(res));
        }else{
          alert(res.message);
        }
        
      })
      // alert("Great!!");
    }
   
  }
  
  ngOnInit(): void {
    //Add User form validations
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      });
    
  }

  // signIn()
  // {
  //   let bodyData = {
  //     email: this.email,
  //     password: this.password
  //   };
  //   this.authService.signIn(bodyData).subscribe(res =>{
  //     console.log(res);
      
  //   })
  // }

}
