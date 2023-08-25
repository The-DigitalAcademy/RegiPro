import { Component } from '@angular/core';

@Component({
  selector: 'app-business-product',
  templateUrl: './business-product.component.html',
  styleUrls: ['./business-product.component.scss']
})
export class BusinessProductComponent {

  allSet(){
    window.location.replace("/all-set")
  }
}
