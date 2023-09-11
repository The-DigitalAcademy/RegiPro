import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { user } from 'src/app/interfaces/user';
import { NgToastService } from 'ng-angular-popup';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';

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
        this.storageService.saveUser(data)

        this.loggedUser = data;

        const token = data.accessToken;
        console.log(token)

        // Store the token in session storage
        sessionStorage.setItem('accessToken', token);
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10b981',
        }).then(() => {
          this.storageService.getUser()
          this.router.navigate(['/onboarding'])
        });

      },
      error: () => {

        Swal.fire({
          title: 'Error!',
          text: 'User Already Exist!, Please use a different email',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10b981'
        }).then(() => {
          this.reloadPage();
        });
      },
      complete: () => {
        this.loaderService.hide(); // Hide the loader
      }
    });
  }
  reloadPage(): void {
    window.location.reload();
  }
}
