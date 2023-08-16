import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {
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
            this.forgotPasswordform.reset();
            this.successMessage = "Reset password link send to email sucessfully.";
            setTimeout(() => {
              this.successMessage = null;
              this.router.navigate(['resend-link']);
            }, 3000)
          }
      }),
       (err:any) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        }
    } else {
      this.IsvalidForm = false;
    }
  }
}

