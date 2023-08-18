import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string ="";
  successMessage: any;
  // IsvalidForm = false;
  IsResetFormValid = true;
  userId:any

  constructor(private authService: AuthService, private router:Router,private activatedRoute: ActivatedRoute,) {
    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required,Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if(this.resetForm.valid) {
      return this.resetForm?.value
    }

  }
  resetPassword(form: any) {
    if (form.valid) {
      // this.IsvalidForm = true;
      form.value['id'] = this.userId;
      this.authService.resetPassword(form.value).subscribe({
        next: (data) => {
          this.resetForm.reset();
          this.successMessage = data.message;
          setTimeout(() => {
            this.successMessage = null;
            this.router.navigate(['login']);
          }, 3000);
        },
        error: (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        },
      });
    } else {
      this.resetForm.valid
    }
  }
}
