import { Component } from '@angular/core';

@Component({
  selector: 'app-quiz4',
  templateUrl: './quiz4.component.html',
  styleUrls: ['./quiz4.component.scss']
})
export class Quiz4Component {
  firstname =localStorage.getItem("firstname");
}
