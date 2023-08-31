import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { answers } from 'src/app/interfaces/questions';
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

  loading$: boolean = false; // Initialize as false

  constructor(
    private router: ActivatedRoute,
    private response: ResponsesService,
    private loaderService: LoaderService
  ) {}
// Retrieving the name of the business and the industry data based on a parameter (bId) from the route, using the Angular Router, and making an HTTP request using an injected service (response).
  
  ngOnInit(): void {

    this.loading$ = true; // Show loader while waiting for API response

    this.bId = this.router.snapshot.paramMap.get('bId');
    
    
    this.response.getResponseById(this.bId).subscribe((data) => {

    this.loading$ = false; // Hide loader after API response

    this.bus = data;

    console.log(this.bus, 'this the business')

    }
    
    );
  }
}
