import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidators } from 'src/app/_shared/password-validators';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  resetForm: FormGroup;
  errorMessage: string = '';
  IsvalidForm = true;
  successMessage: any
  IsResetFormValid = true;
  user_email: any;

  constructor(private authService: AuthService, private router: Router, public loaderService: LoaderService, private toast: NgToastService) {
    // Initialize the resetForm FormGroup with form controls and validation rules
    this.resetForm = new FormGroup({

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        PasswordValidators.patternValidator(new RegExp("(?=.*[0-9])"), { requiresDigit: true }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[A-Z])"), { requiresUppercase: true }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[a-z])"), { requiresLowercase: true }),
        PasswordValidators.patternValidator(new RegExp("(?=.*[$@^!%*?&])"), { requiresSpecialChars: true })
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])
    },
      {
        validators: PasswordValidators.MatchValidator // Custom validator to match passwords
      }
    );
  }
  onSubmit() {
    if (this.resetForm.valid) {
      return this.resetForm?.value // Return form value if valid
    }
  }
  ngOnInit() {
        // Retrieve user data from localStorage
    let userData = localStorage.getItem('user_reset');
    if (userData != null) {
      this.user_email = JSON.parse(userData);
      console.log(this.user_email);
    } else {
      console.error("Nothing on the user_resets")
    }



  }

  resetPassword() {

    // Prepare reset object with email and password
    let resetObject = {
      "email": this.user_email.email,
      "password": this.resetForm.get("password")?.value
    }

    
    if (this.resetForm.valid) {
      this.IsvalidForm = true;

            // Call the AuthService to reset the password
      this.authService.resetPassword(resetObject).subscribe({
        next: (data) => {

          console.log(data)
          this.successMessage = null;
          this.router.navigate(['/login']);
          this.toast.success({ detail: "SUCCESS", summary: data.message, duration: 5000 });

        },
        error: (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;

            this.toast.error({
              detail: 'ERROR',
              summary: this.errorMessage,
              sticky: true,
            });
          }
        },
      });
    } else {
      this.IsvalidForm = false // Set the form as invalid
    }
  }
  // Getter functions to check form control validity and specific validation rules
  get f() {
    return this.resetForm.controls;
  }

  get passwordValid() {
    return this.resetForm.controls["password"].errors === null;
  }

  get requiredValid() {
    return !this.resetForm.controls["password"].hasError("required");
  }

  get minLengthValid() {
    return !this.resetForm.controls["password"].hasError("minlength");
  }

  get requiresDigitValid() {
    return !this.resetForm.controls["password"].hasError("requiresDigit");
  }

  get requiresUppercaseValid() {
    return !this.resetForm.controls["password"].hasError("requiresUppercase");
  }

  get requiresLowercaseValid() {
    return !this.resetForm.controls["password"].hasError("requiresLowercase");
  }

  get requiresSpecialCharsValid() {
    return !this.resetForm.controls["password"].hasError("requiresSpecialChars");
  }
}
