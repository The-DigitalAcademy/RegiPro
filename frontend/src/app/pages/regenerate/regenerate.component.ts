import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { ResponsesService } from 'src/app/services/responses.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-regenerate',
  templateUrl: './regenerate.component.html',
  styleUrls: ['./regenerate.component.scss'],
})
export class RegenerateComponent implements OnInit {

  bId!: any;
  business: any[] = [];
  bus:any;

  loading$: boolean = true; // Initialize as false


  constructor(
    private router: ActivatedRoute,
    private response: ResponsesService,
    public loaderService: LoaderService
  ) {}
// Retrieving the name of the business and the industry data based on a parameter (bId) from the route, using the Angular Router, and making an HTTP request using an injected service (response).
  
// Download the business plan word document
public download(): void {
  saveAs(this.bus.businessPlanUrl, 'business-plan.docx');
}

ngOnInit(): void {
  this.loading$ = true; // Show loader while waiting for API response

  console.log('Starting API call');
  this.bId = this.router.snapshot.paramMap.get('bId');

  this.response.getResponseById(this.bId).subscribe((data) => {
    console.log('API call completed');

    this.bus = data;
    console.log(this.bus, 'this the business');
  });
}

}
