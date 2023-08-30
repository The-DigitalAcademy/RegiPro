import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { user } from 'src/app/interfaces/user';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
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
  message = '';


  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private toast: NgToastService,
    public loaderService: LoaderService
    ) { }

  ngOnInit(): void {
      this.storageService.getUser()

  }

  onSubmit(): void {
    this.loaderService.show(); // Show the loader
    const { firstname, lastname, email, password } = this.form;

    this.authService.register(firstname, lastname, email, password).subscribe({
      next: data => {
        // this.isSuccessful = true;
        this.storageService.saveUser(data)

        this.loggedUser = data;

        const token = data.accessToken;
        console.log(token)

        // Store the token in session storage
        sessionStorage.setItem('accessToken', token);

        this.toast.success({detail:"SUCCESS",summary:'Your registration is successful!',duration:5000});
        this.isSignUpFailed = false;
        this.storageService.getUser()
        this.router.navigate(['/onboarding'])
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      },
      complete: () => {
        this.loaderService.hide(); // Hide the loader
      }
    });
  }
}
