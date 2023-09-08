import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import PSPDFKit from 'pspdfkit'

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
// Configuration of the PSPDFKit library to display PDF
export class StepsComponent implements AfterViewInit {
  currentStep = 1;
  

  constructor(public route: Router) {}

  nextStep(): void {
    this.currentStep++;

  }

  back(){
   this.route.navigate(['/questions']) 
   }
  ngAfterViewInit() {
    PSPDFKit.load({
      baseUrl:
        location.protocol + '//www.cipc.co.za/wp-content/uploads/Forms/Companies/CoR-14_1/' + location.host + '/assets/',
      document: '/assets/CoR-14_1.pdf',
      container: '#pspdfkit-container',
    }).then((instance:any) => {
      (window as any).instance = instance;
    });
  }
}