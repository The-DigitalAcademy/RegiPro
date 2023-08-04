import { Component } from '@angular/core';


@Component({
  selector: 'app-step-info',
  templateUrl: './step-info.component.html',
  styleUrls: ['./step-info.component.scss']
})
export class StepInfoComponent {
  currentStep = 1;
    
  nextStep(): void {
    this.currentStep++;
  }
}
