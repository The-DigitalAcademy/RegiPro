import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.scss']
})
export class LoadingIndicatorComponent implements OnInit {

  loading$: Observable<boolean> | undefined; // Observable to bind to the loader state

  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    this.loading$ = this.loaderService.loading$;
  }

}
