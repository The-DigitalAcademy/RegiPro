import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any = {
    firstname: null,
    lastname: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
    ) { }

  ngOnInit(): void {
      this.storageService.getUser()

  }

  onSubmit(): void {
    const { firstname, lastname, email, password } = this.form;

    this.authService.register(firstname, lastname, email, password).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.storageService.saveUser(data)

        setTimeout(()=> {
          this.router.navigate(['/onboarding'])
        }, 1000)
        this.isSignUpFailed = false;
        this.storageService.getUser()

      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }
}
