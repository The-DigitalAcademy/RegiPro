import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';
const USER_TYPE = 'user-type';
const BUSINESS_PLAN = 'business-plan'

@Injectable({
  providedIn: 'root'
})

export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public saveUserTypeSession(user: any): void {
    window.sessionStorage.setItem(USER_TYPE, JSON.stringify(user));
  }

  public saveBusinessPlan(url: any): void {
    window.sessionStorage.removeItem(BUSINESS_PLAN);
    window.sessionStorage.setItem(BUSINESS_PLAN, JSON.stringify(url));
  }

  public getBusinessPlan(): any {
    const business = window.sessionStorage.getItem(BUSINESS_PLAN);
    if (business) {
      return JSON.parse(business);
    }
    return {};
  }


  public getLoggedUser(): any {
    const logged = window.sessionStorage.getItem(USER_KEY);

    if (logged) {
      return JSON.parse(logged);
    }

    return null;
  }


  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) 
    {
      return true;
    }
    return false;
  }

  public saveAnswers(answers: any): void {
    window.sessionStorage.setItem('answers', JSON.stringify(answers));
  }

  public getAnswers(): any {
    const answers = window.sessionStorage.getItem('answers');
    if (answers) {
      return JSON.parse(answers);
    }
    return null;
  }
}
