import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { answers } from 'src/app/interfaces/questions';
import { Router } from '@angular/router';
import { ResponsesService } from 'src/app/services/responses.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent implements OnInit {
  step: any = 1;

  Agriculture = 'Agriculture';
  Fitness = 'Fitness & Wellness';
  Retail = 'Retail';
  Manufacturing = 'Manufacturing';
  Entertainment = 'Entertainment';
  Property = 'Property';
  Marketing = 'Marketing';

  businessPlan: boolean = false;
  isRegistered = false;
  errorMessage = '';

  data:any;
  questionsArray: answers[] = [];

  currentUser: any;

  form1: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  form2: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  submitted = false;


  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private route: Router,
    private respService: ResponsesService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  submit() {
    this.submitted = true;

    if (this.form1.invalid) {
      return;
    }

    this.questionsArray.push(this.form1.value);

    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }

  submit2() {
    this.submitted = true;

    if (this.form2.invalid) {
      return;
    }

    this.questionsArray.push(this.form2.value);
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }

  submit3() {
    this.submitted = true;
    const Tech = 'Tech & Software';

    this.questionsArray.push({ industry: Tech });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit4() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Agriculture });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit5() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Fitness });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit6() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Retail });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit7() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Manufacturing });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit8() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Entertainment });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit9() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Property });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  submit01() {
    this.submitted = true;

    this.questionsArray.push({ industry: this.Marketing });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  onSubmit(): void {
    this.submitted = true;

    this.questionsArray.push({ hasBusinessPlan: this.businessPlan });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  onSubmit2(): void {
    this.submitted = true;

    this.questionsArray.push({ isRegistered: this.isRegistered });

    this.storageService.saveAnswers(this.questionsArray);
    
    const savedAnswers = this.storageService.getAnswers();

    console.log('saved answer',savedAnswers[0].name);
    console.log('saved answer',savedAnswers[1].industry);
    console.log('saved answer',savedAnswers[2].description);
    console.log('saved answer',savedAnswers[3].isRegistered);
    console.log('saved answer',savedAnswers[4].hasBusinessPlan);

    let name = savedAnswers[0].name, industry = savedAnswers[1].industry, description = savedAnswers[2].description, isRegistered = savedAnswers[3].isRegistered, hasBusinessPlan = savedAnswers[4].hasBusinessPlan;
   
    this.respService.response(name, industry, description, isRegistered, hasBusinessPlan).subscribe({
      next: data => {
        console.log(data);
        this.route.navigate(['/home']);
      },
      error: err => {
        this.errorMessage = err.error.message;
        console.log(this.errorMessage);
        alert(this.errorMessage)
      }
    })
    this.step = this.step + 1;

    this.route.navigate(['/home']);

    console.log('added to array', this.questionsArray);
  }

  previous() {
    this.step = this.step - 1;
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }
  get p(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }
}
