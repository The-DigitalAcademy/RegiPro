import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  forgotPasswordform: FormGroup;

  constructor() {
    this.forgotPasswordform = new FormGroup({
      password: new FormControl('', [Validators.required, Validators.email]),
      samePassword: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if(this.forgotPasswordform.valid) {
      return this.forgotPasswordform?.value
    }
  }
}
