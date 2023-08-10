import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { user } from 'src/app/interfaces/User';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loggedUser!: user;
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

        this.loggedUser = data;

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
