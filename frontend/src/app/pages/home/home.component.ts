import { Component, Input } from '@angular/core';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @Input()
  user?: User;

  firstname =localStorage.getItem("firstname");
  lastname = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

  users: any[] | undefined;
  name = 'Thabisile'
  greetingUser: string = ''

  constructor() { }

  ngOnInit() {
    this.greetingUser = this.greeting()

  }
    greeting() {
      const date = new Date()

const currentTime = date.getHours()

// Morning 0 - 11
// Noon 12 - 16
// Evening 17 - 23
if(currentTime >= 0 && currentTime <= 11) {
    return `Good morning,`
} else if (currentTime >=12 && currentTime <= 16) {
    return `Good afternoon,`
} else if (currentTime >= 17 && currentTime <= 23) {
    return `Good evening, `
} else {
    return ''
}
    }

    logout(){
      localStorage.removeItem
    }
}
