import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { LoaderService } from 'src/app/services/loader.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null,
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  loggedUser!: user;


  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    public loaderService: LoaderService
  ) { }

  ngOnInit(): void {

    // Check if user is already logged in
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);
    }
  }

  // Function to handle form submission (login)
  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.loggedUser = data;
        this.storageService.saveUser(data);
        const token = data.accessToken;
        // Store the token in session storage
        sessionStorage.setItem('accessToken', token);
        // Display a success alert
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully logged in.',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10b981',
        }).then(() => {
          this.reloadPage();
        });
      },
       // Display a fail to login alert
      error: () => {
        Swal.fire({
          title: 'Error!',
          text: 'login credentials incorrect, please enter correct credentials',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#10b981'
        }).then(() => {
          this.reloadPage();
        });
      },
    });
  }

  // Function to reload the page
  reloadPage(): void {
    window.location.reload();
  }
}