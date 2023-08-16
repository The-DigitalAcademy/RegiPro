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

  constructor() {
    this.forgotPasswordform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if(this.forgotPasswordform.valid) {
      return this.forgotPasswordform?.value
    }
  }
}

