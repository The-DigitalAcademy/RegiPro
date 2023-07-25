import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
