import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-business-product',
  templateUrl: './business-product.component.html',
  styleUrls: ['./business-product.component.scss']
})
export class BusinessProductComponent {

  constructor(private router: Router) {}


navigateTo() {
  const targetRoute = '/all-set';
  this.router.navigate([targetRoute]);
}


}
