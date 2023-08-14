import { Component, AfterViewInit } from '@angular/core';
import PSPDFKit from 'pspdfkit';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements AfterViewInit {
  currentStep = 1;

  nextStep(): void {
    this.currentStep++;
  }

  ngAfterViewInit() {
    PSPDFKit.load({
      baseUrl:
        location.protocol + '//www.cipc.co.za/wp-content/uploads/Forms/Companies/CoR-14_1/' + location.host + '/assets/',
      document: '/assets/CoR-14_1.pdf',
      container: '#pspdfkit-container',
    }).then((instance) => {
      (window as any).instance = instance;
    });
  }
}
