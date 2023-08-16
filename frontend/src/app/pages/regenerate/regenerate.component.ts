import { Component, OnInit } from '@angular/core';
import { answers } from 'src/app/interfaces/questions';
import { user } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-regenerate',
  templateUrl: './regenerate.component.html',
  styleUrls: ['./regenerate.component.scss']
})
export class RegenerateComponent implements OnInit {
  businesses: answers[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit() {
    this.businesses = this.storageService.getAnswers();

  }
}
