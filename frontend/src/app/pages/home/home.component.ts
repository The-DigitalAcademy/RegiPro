import { Component, Input } from '@angular/core';
import { user } from '../../interfaces/user';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';
import { EventBusService } from 'src/app/_shared/event-bus.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ResponsesService } from 'src/app/services/responses.service';
import { BusinessService } from 'src/app/services/store/business.service';
import { answers } from 'src/app/interfaces/questions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {

  greetingUser: string = '';
  businesses: answers[] = [];
  currentUser!: user;

  eventBusSub?: Subscription;



  constructor(
    private storageService: StorageService,
    public router: Router,
    private eventBusService: EventBusService,
    private authService: AuthService,
    public responses: ResponsesService,
    public business: BusinessService
  ) { }

// Initialize component when it's created
ngOnInit() {
  // Get the current user and set the greeting message
  this.currentUser = this.storageService.getUser();
  this.greetingUser = this.greeting();

  // Subscribe to 'logout' event from event bus
  this.eventBusSub = this.eventBusService.on('logout', () => {
    this.logout();
  });
}

// Determine appropriate greeting based on the time of day
greeting() {
  const currentTime = new Date().getHours();

  if (currentTime >= 0 && currentTime <= 11) {
    return `Good morning,`;
  } else if (currentTime >= 12 && currentTime <= 16) {
    return `Good afternoon,`;
  } else if (currentTime >= 17 && currentTime <= 23) {
    return `Good evening, `;
  } else {
    return '';
  }
}

// Handle user logout
logout(): void {
  this.authService.logout().subscribe({
    next: (res) => {
      this.storageService.clean();
      this.router.navigate(['']);
      window.location.reload();
    },
    error: (err) => {
      console.log(err);
    },
  });
}

// Disable adding a new business if the limit is reached
disableNewBusiness() {
  if (this.businesses.length >= 2) {
    alert("You have reached the business limit. Subscribe to add another business.");
    this.router.navigate(['/home']);
  } else {
    this.router.navigate(['/questions']);
  }
}
}

