
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/regenerate.service';

@Component({
  selector: 'app-regenerate',
  templateUrl: './regenerate.component.html',
  styleUrls: ['./regenerate.component.scss'],
})
export class RegenerateComponent implements OnInit {
  data: any[] = []; 
  item: any;

  constructor(private dataService: DataService) { }
  ngOnInit() {
    this.getDataFromServer();
  }

  getDataFromServer() {
    this.dataService.getData().subscribe(
      (response: any[]) => {
        this.data = response;
      },
      (error: any[]) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}