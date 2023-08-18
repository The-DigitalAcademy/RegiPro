import { Injectable, signal } from '@angular/core';
import { answers } from 'src/app/interfaces/questions';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  public businessList = signal<answers[]>([])

  addBusinessSignal(business: answers){
    this.businessList.mutate((val) => {
      val.push(business);
    })
  }

}
