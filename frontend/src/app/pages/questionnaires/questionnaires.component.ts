import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { answers } from 'src/app/interfaces/questions';
import { Router } from '@angular/router';
import { ResponsesService } from 'src/app/services/responses.service';
import { BusinessService } from 'src/app/services/store/business.service';
import { LoaderService } from 'src/app/services/loader.service';
import { NgToastService } from 'ng-angular-popup';
import { OpenaiService } from 'src/app/services/openai.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss'],
})
export class QuestionnairesComponent implements OnInit {
  cloudinaryLink: any;
  businessPlan: any;
  businessPlanUrl = '';

  step: any = 1;

  errorMessage = '';

  questionsArray: answers[] = [];

  currentUser: any;
  // Define form controls and validators
  form1: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });
  form2: FormGroup = new FormGroup({
    description: new FormControl('', Validators.required),
  });

  submitted = false;
  submitted2 = false;
  isReturned = false;

  constructor(
    private busService: BusinessService,
    private storageService: StorageService,
    private route: Router,
    private respService: ResponsesService,
    public loaderService: LoaderService,
    private toast: NgToastService,
    private openaiService: OpenaiService
  ) {}

  ngOnInit(): void {
    this.loaderService.hide();
    this.currentUser = this.storageService.getUser();
    this.businessPlan = this.storageService.getBusinessPlan();
    this.businessPlanUrl = this.storageService.getBusinessPlan();
  }
  // Handle form submission for step 1
  submit() {
    this.submitted = true;

    if (this.form1.invalid) {
      return;
    }

    this.questionsArray.push(this.form1.value);

    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  // Handle form submission for step 2
  submit2() {
    this.submitted2 = true;

    if (this.form2.invalid) {
      return;
    }

    this.questionsArray.push(this.form2.value);
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  // Handle industry submission
  submitIndustry(value: string) {
    this.submitted = true;

    this.questionsArray.push({ industry: value });

    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  // Handle business plan submission
  submitPlan(value: string): void {
    this.submitted = true;

    this.questionsArray.push({ hasBusinessPlan: value });
    this.step = this.step + 1;

    console.log('added to array', this.questionsArray);
  }
  // Handle registration submission
  submitReg(value: string): void {
    this.submitted = true;

    this.loaderService.show(); // Show the loader

    this.questionsArray.push({ isRegistered: value });

    this.storageService.saveAnswers(this.questionsArray);

    const savedAnswers = this.storageService.getAnswers();
    // Extract saved answers
    let name = savedAnswers[0].name,
      industry = savedAnswers[1].industry,
      description = savedAnswers[2].description,
      hasBusinessPlan = savedAnswers[3].hasBusinessPlan,
      isRegistered = savedAnswers[4].isRegistered;
    // Generate business plan using OpenAI service
    this.openaiService
      .generate(name, industry, description)
      .subscribe((res) => {
        let businessPlanUrl = res.url;
        this.storageService.saveBusinessPlan(businessPlanUrl);
                // Send response data to the server
        this.respService
          .response(
            name,
            industry,
            description,
            isRegistered,
            hasBusinessPlan,
            businessPlanUrl
          )
          .subscribe({
            next: (data) => {
              this.addBusiness(data.response);
              console.log(data);
              this.isReturned = true;
            },
            error: (err) => {
              this.errorMessage = err.error.message;

              console.log(this.errorMessage);

              this.toast.error({
                detail: 'ERROR',
                summary: this.errorMessage,
                sticky: true,
              });
            },
            complete: () => {
              this.loaderService.hide(); // Hide the loader
            },
          });
      });

    console.log('added to array', this.questionsArray);
  }
  // Add business data to the service
  addBusiness(business: answers) {
    this.busService.addBusinessSignal(business);
  }
  // Handle going back to the previous step
  previous() {
    this.questionsArray.pop();
    this.step = this.step - 1;
    console.log('remaining answers', this.questionsArray);
  }
  // Getter for form controls in step 1
  get f(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }
    // Getter for form controls in step 2
  get p(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }
  // Reload the page
  reloadPage(): void {
    window.location.reload();
  }
}
