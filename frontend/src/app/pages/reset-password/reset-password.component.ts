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
  successMessage:any
  IsResetFormValid = true;

  constructor(private authService: AuthService, private router: Router, public loaderService: LoaderService, private toast: NgToastService) {

    this.resetForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
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
        validators: PasswordValidators.MatchValidator
      }
    );
  }
  onSubmit() {
    if (this.resetForm.valid) {
      return this.resetForm?.value
    }
  }

  resetPassword(form: any) {
    if (form.valid) {
      this.IsvalidForm = true;
      this.authService.resetPassword(form.value).subscribe({
        next: (data) => {
        
          console.log(data)
            this.successMessage = null;
            this.router.navigate(['/login']);
            this.toast.success({detail:"SUCCESS",summary:data.message ,duration:5000});
      
        },
        error: (err) => {
          if (err.error.message) {
            this.errorMessage = err.error.message;
          }
        },
      });
    } else {
      this.IsvalidForm = false
    }
  }

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


