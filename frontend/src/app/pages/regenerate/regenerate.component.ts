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

  constructor(
    private router: ActivatedRoute,
    private response: ResponsesService,
    public loaderService: LoaderService
  ) {}

  ngOnInit(): void {
    this.bId = this.router.snapshot.paramMap.get('bId');
    
    this.loaderService.show(); // Show the loader
    
    this.response.getResponseById(this.bId).subscribe((data) => {
      
      
      this.bus = data;

      console.log(this.bus, 'this the business')

    },
    (error) => {},
    () => {
      this.loaderService.hide();; // Hide the loader after request completion
    }
    
    );
  }
}
