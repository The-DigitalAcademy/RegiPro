import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { StorageService } from '../services/storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private storageService: StorageService, private router: Router) {}

  // canActivate(): boolean {
  //   if (this.storageService.isLoggedIn()) {
  //     return true;
  //   } else {
  //     return false;
  //     window.alert('Access Denied, Login is Required to Access This Page!');
  //     this.router.navigate(['/login']);
  //   }
  // }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | UrlTree | boolean {
    if (!this.storageService.isLoggedIn()) {
      window.alert('Access Denied, Login is Required to Access This Page!');
      this.router.navigate(['login']);
    }
    return true;
  }
}
