import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(public storageService: StorageService,
    public route: Router
    ) {}
  ngOnInit(): void {
    this.currentUser = this.storageService.getUser()
  }
  currentUser!: user;

  back(){
   this.currentUser ? this.route.navigate(['/home']) : this.route.navigate(['/landing']) 
  }
  
}
