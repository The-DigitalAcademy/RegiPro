import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordform: FormGroup;
  forbiddenEmails: any;
  errorMessage: string ="";
  successMessage: any;
  IsvalidForm = true;

  constructor(private authService: AuthService, private router: Router, public loaderService: LoaderService, private toast: NgToastService) {
    this.forgotPasswordform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.forgotPasswordform.valid) {
      return this.forgotPasswordform?.value
    }
  }

  RequestResetUser(form: any) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.newPassword(this.forgotPasswordform.value).subscribe({
        next:
          (data) => {
            this.successMessage = "Reset password link send to email sucessfully.";
            console.log(data)
            localStorage.setItem('user_reset', JSON.stringify(this.forgotPasswordform.value));
            this.successMessage = null;
            this.router.navigate(['resend-link']);
            this.toast.success({detail:"SUCCESS",summary:data.message ,duration:5000});
  
          }
      }),
       (err:any) => {
          if (err.error.message) {
            localStorage.setItem('user_reset', JSON.stringify(null));
            this.errorMessage = err.error.message;
            this.toast.error({
              detail: 'ERROR',
              summary: this.errorMessage,
              sticky: true,
            });
          }
        }
    } else {
      this.IsvalidForm = false;
    }
  }
}

