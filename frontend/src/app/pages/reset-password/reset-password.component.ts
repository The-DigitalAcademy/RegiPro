import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  forgotPasswordform: FormGroup;
  forbiddenEmails: any;
  errorMessage: string ="";
  successMessage: any;
  IsvalidForm = true;

  constructor(private authService: AuthService, private router:Router) {
    this.forgotPasswordform = new FormGroup({
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if(this.forgotPasswordform.valid) {
      return this.forgotPasswordform?.value
    }
  }

  resetPassword(form: any) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.requestResetPassword(this.forgotPasswordform.value).subscribe({
        next:
          (data) => {
            this.forgotPasswordform.reset();
            // this.successMessage = "Reset password link send to email sucessfully.";
            console.log('User can return to login')
            // setTimeout(() => {
            //   this.successMessage = null;
              this.router.navigate(['login']);
            // }, 3000)
          }
      }),
      //  (error:any) => {
      //     if (error.message) {
      //       this.errorMessage = error.message;
      //     }
      //   }
      console.log('Something went wrong.')
    } else {
      this.IsvalidForm = false;
    }
  }
}
