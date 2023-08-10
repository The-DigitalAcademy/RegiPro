import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-questionnaires',
  templateUrl: './questionnaires.component.html',
  styleUrls: ['./questionnaires.component.scss']
})
export class QuestionnairesComponent implements OnInit{

  step: any = 1;

  Agriculture = "Agriculture";
  Fitness = "Fitness & Wellness";
  Retail = "Retail";
  Manufacturing = "Manufacturing";
  Entertainment = "Entertainment";
  Property = "Property";
  Marketing = "Marketing";

  businessPlan : boolean = false;
  regBusiness = false;

  questionsArray = [{}];

  firstname =localStorage.getItem("firstname");

  currentUser: any;


  form1: FormGroup = new FormGroup({
    businessName: new FormControl('')
  });
  form2:FormGroup = new FormGroup({
    aboutBusiness: new FormControl('')
  });

  submitted = false;

  constructor(private formBuilder: FormBuilder, private storageService: StorageService ) {}

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser()

    this.form1 = this.formBuilder.group(
      {
        businessName: [ '', [ Validators.required ] ]
      })

      this.form2 = this.formBuilder.group(
        {
          aboutBusiness: [ '', [ Validators.required ] ]
        })
    
  }

  submit(){
    this.submitted = true;

    if (this.form1.invalid) {
      return;
    }

    this.questionsArray.push(this.form1.value)

    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }

  submit2(){
    this.submitted = true;

    if (this.form2.invalid) {
      return;
    }

    this.questionsArray.push(this.form2.value)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }

  submit3(){
    this.submitted = true;
    const Tech = "Tech & Software"

    this.questionsArray.push(Tech)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit4(){
    this.submitted = true;
  
    this.questionsArray.push(this.Agriculture)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit5(){
    this.submitted = true;
  
    this.questionsArray.push(this.Fitness)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit6(){
    this.submitted = true;
  
    this.questionsArray.push(this.Retail)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit7(){
    this.submitted = true;
  
    this.questionsArray.push(this.Manufacturing)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit8(){
    this.submitted = true;
  
    this.questionsArray.push(this.Entertainment)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit9(){
    this.submitted = true;
  
    this.questionsArray.push(this.Property)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  submit01(){
    this.submitted = true;
  
    this.questionsArray.push(this.Marketing)
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  onSubmit(): void {
    this.submitted = true;

    this.questionsArray.push(this.businessPlan);
    this.step = this.step + 1;

    console.log("added to array",this.questionsArray);
  }
  onSubmit2(): void {
    this.submitted = true;

    this.questionsArray.push(this.regBusiness);
    // this.step = this.step + 1;
    
    console.log("added to array",this.questionsArray);
  }


  previous(){
    this.step = this.step - 1;

  }


  get f(): { [key: string]: AbstractControl } {
    return this.form1.controls;
  }
  get p(): { [key: string]: AbstractControl } {
    return this.form2.controls;
  }

}
