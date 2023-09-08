import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-set',
  templateUrl: './all-set.component.html',
  styleUrls: ['./all-set.component.scss']
})
export class AllSetComponent {
constructor(private router:Router){}
  onClick(){
    Swal.fire({
      title: 'Congratulation!',
      text: 'Thank you for choosing RegiPro.',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#10b981',
    }).then(() => {
      this.router.navigate(['/home'])
    });
  }
}
