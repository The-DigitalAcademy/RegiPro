import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit{

  step: any = 1;

  constructor(){ }

  ngOnInit(): void {
    
  }

  submit(){
    this.step = this.step + 1;
  }

  previous(){
    this.step = this.step - 1;
  }

}
