import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-business-plan',
  templateUrl: './business-plan.component.html',
  styleUrls: ['./business-plan.component.scss']
})
export class BusinessPlanComponent {

  @Input() cloudinaryURL = ''

}
