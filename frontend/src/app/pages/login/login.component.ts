import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  email?: string
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  user? : any

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
     ) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.user = this.storageService.getUser().email
      this.router.navigate(['/home'])

      

      // setTimeout(() => {
      //   this.router.navigate(['/home'])
      // }, 700)



    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.user = this.storageService.getUser().email;
        console.log(data);

        const {firstname, lastname, email} = data
          localStorage.setItem("firstname",firstname);
          localStorage.setItem("lastname",lastname);
          localStorage.setItem("email",email);

      this.router.navigate(['/home'])

      this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
