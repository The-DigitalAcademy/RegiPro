import { Component } from '@angular/core';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent {
  currentStep = 1;

  nextStep(): void {
    this.currentStep++;
  }

  
}
