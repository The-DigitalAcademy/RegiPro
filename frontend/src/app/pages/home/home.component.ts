import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input() user?: any;
 

  firstname = sessionStorage.getItem("firstname");
  lastname = sessionStorage.getItem("lastname");
  email = sessionStorage.getItem("email");

  users: any[] | undefined;

  greetingUser: string = ''

  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit() {
    this.greetingUser = this.greeting()
    this.user = "home"
    
  }
  greeting() {
    const date = new Date()

    const currentTime = date.getHours()

    // Morning 0 - 11
    // Noon 12 - 16
    // Evening 17 - 23
    if (currentTime >= 0 && currentTime <= 11) {
      return `Good morning,`
    } else if (currentTime >= 12 && currentTime <= 16) {
      return `Good afternoon,`
    } else if (currentTime >= 17 && currentTime <= 23) {
      return `Good evening, `
    } else {
      return ''
    }
  }

  logout(): void {
    if(this.storageService.isLoggedIn() != null)
    sessionStorage.clear()
    this.router.navigate(['landing'])
  }

  addNewBusiness(){
    
  }
}
