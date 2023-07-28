import { Component, Input } from '@angular/core';
import { User } from '../../interface/user';
import { SessionsService } from 'src/app/service/sessions.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  loggedUser : User | undefined

  //userDetails: any;
  
  @Input() 
  user?: User;

//  name = localStorage.getItem("firstname")


  

  firstname =localStorage.getItem("firstname");
  lastname = localStorage.getItem("lastname");
  email = localStorage.getItem("email");

  users: any[] | undefined;
 // name = 'Thabisile'
  greetingUser: string = ''

  @Input() activeP?: string;

  constructor(private session : SessionsService) {

    console.log(this.firstname,this.lastname);
    
   }

 

  ngOnInit() {

    this.activeP = "home"
    this.greetingUser = this.greeting()

    // this.firstname =  this.session.getLoggedUser().firstname
    // this.lastname = this.session.getLoggedUser().lastname
    // this.email = this.session.getLoggedUser().email


    // // Retrieve user details from sessionStorage
    // const userDetailsString = sessionStorage.getItem('userDetails');
    // if (userDetailsString) {
    //   this.userDetails = JSON.parse(userDetailsString);
    //   console.log(this.userDetails);
    //   // Now you can use this.userDetails to access the user details in the HomeComponent
    // }
    
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
