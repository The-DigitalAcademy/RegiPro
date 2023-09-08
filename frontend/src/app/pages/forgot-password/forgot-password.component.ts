import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NgToastService } from 'ng-angular-popup';
import Swal from 'sweetalert2';

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
        // This function doesn't seem to have any implementation, and the return statement does nothing
    if (this.forgotPasswordform.valid) {
      return this.forgotPasswordform?.value
    }
  }
  // Function to request a password reset
  RequestResetUser(form: any) {
    console.log(form)
    if (form.valid) {
      this.IsvalidForm = true;
            // Call the AuthService to request a password reset
      this.authService.newPassword(this.forgotPasswordform.value).subscribe({
        next:
          (data) => {
                      // Set a success message and store the form data in local storage
            this.successMessage = "Reset password link send to email sucessfully.";
            console.log(data)
            localStorage.setItem('user_reset', JSON.stringify(this.forgotPasswordform.value));
            Swal.fire({
              title: 'Success!',
              text: 'Reset link sent sucessfully.',
              icon: 'success',
              confirmButtonText: 'OK',
              confirmButtonColor: '#10b981',
            }).then(() => {
              this.router.navigate(['resend-link']);
            });
          }
      }),
       (err:any) => {
          if (err.error.message) {
                      // Handle errors by setting an error message and displaying it as a sticky toast
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
            // Set the IsvalidForm flag to false if the form is invalid
      this.IsvalidForm = false;
    }
  }
}

