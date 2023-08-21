import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { LoaderService } from 'src/app/services/loader.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
  ) {}

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigate(['/home']);

    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: (data) => {
        this.loggedUser = data;
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
      
        const token = data.accessToken;
        console.log(token)
        // Store the token in local storage
        localStorage.setItem('accessToken', token);

        this.reloadPage();
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
    
    
  }

  reloadPage(): void {
    window.location.reload();
  }
}
