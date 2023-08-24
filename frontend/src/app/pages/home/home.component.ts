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
    public responses : ResponsesService,
    public business: BusinessService
  ) {}

  ngOnInit() {
    this.currentUser = this.storageService.getUser();
    this.greetingUser = this.greeting();

    
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.logout();
    });
  }

  // greeting() {
  //   const date = new Date();

  //   const currentTime = date.getHours();
    
  //   if (currentTime >= 0 && currentTime <= 11) {
  //     return `Good morning,`;
  //   } else if (currentTime >= 12 && currentTime <= 16) {
  //     return `Good afternoon,`;
  //   } else if (currentTime >= 17 && currentTime <= 23) {
  //     return `Good evening, `;
  //   } else {
  //     return '';
  //   }
  // }

  greeting() {
    const date = new Date();
    const currentTime = date.getHours();

    const greetings = [
        ["Midnight greetings! Burning the midnight oil?", "Hello, night owl! Anything keeping you up?", "Hey, it's late! Still up and about?"],
        ["Good morning! Rise and shine!", "Morning! Have a great day ahead.", "Top of the morning to you!"],
        ["Hello! Productive day?", "Hi there! How's your day?", "Halfway through the day!"],
        ["Good afternoon! Quick break?", "Hey! Smooth day?", "Hi! Need an afternoon boost?"],
        ["Good evening! How was your day?", "Hey there! Ready to unwind?", "Hello! Evening plans?"],
        ["Good night! Rest well.", "Hey! Peaceful night.", "Hello! Sweet dreams."]
    ];

    const index =
        currentTime <= 5 ? 0 :
        currentTime <= 11 ? 1 :
        currentTime <= 16 ? 2 :
        currentTime <= 20 ? 3 :
        currentTime <= 23 ? 4 :
        -1; // Invalid hour

    if (index !== -1) {
        return greetings[index][Math.floor(Math.random() * 3)];
    }

    return '';
}

  

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

  addNewBusiness(){
    
  }
}
