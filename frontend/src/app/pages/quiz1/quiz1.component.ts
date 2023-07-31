import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz1',
  templateUrl: './quiz1.component.html',
  styleUrls: ['./quiz1.component.scss']
})
export class Quiz1Component {
  firstname =localStorage.getItem("firstname");
}
