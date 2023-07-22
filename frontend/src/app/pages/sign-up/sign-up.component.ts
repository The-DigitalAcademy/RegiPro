import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormControl,FormGroup,Validators,FormBuilder } from '@angular/forms';
import { User } from 'src/app/interface/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{

  //Form variables
  signupForm:any = FormGroup;
  submitted = false;

  fullname: string = "";
  lastname: string = "";
  email: string = "";
  password: string = "";

  constructor(private authService : ApiService, private formBuilder: FormBuilder)
  {}

  //Add user form actions
  get f() { return this.signupForm.controls; }

  onSubmit() {
  
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
        return;
    }
    //True if all the fields are filled
    if(this.submitted)
    {
      this.authService.signUp(this.signupForm).subscribe(res =>{

        if(res.success){
          console.log(res);
          alert(res.message);
          // alert("User registered successfuly");
        }else{
          alert(res.message)
        }
              
      })
      // alert("Great!!");
    }
   
  }

  ngOnInit(): void {
    //Add User form validations
    this.signupForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
      });
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
