import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  items: string[] = ['Craft Winning Business Plans', 'Register with CIPC', 'Discover ABSA Funding Solutions'];
  currentIndex: number = -1;
  isRippling: boolean = false;

  constructor() { }

  ngOnInit() {
    this.startAnimation();
  }

  startAnimation() {
    this.currentIndex = 0;
    this.animate();
  }

  animate() {
    this.isRippling = true; // Enable the ripple effect
    setTimeout(() => {
      if (this.currentIndex < this.items.length - 1) {
        this.currentIndex++;
        this.isRippling = false; // Disable the ripple effect
        setTimeout(() => {
          this.animate(); // Continue to the next item
        }, 500); // Adjust the time interval (in milliseconds) for the ripple effect duration
      } else {
        this.currentIndex = 0; // Reset to the beginning
        setTimeout(() => {
          this.animate(); // Start the animation again
        }, 500); // Adjust the time interval (in milliseconds) before restarting
      }
     
    }, 1000); // Adjust the time interval (in milliseconds) as needed
  }
}









