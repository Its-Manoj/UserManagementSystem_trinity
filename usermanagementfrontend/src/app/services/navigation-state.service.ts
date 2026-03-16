import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationStateService {
  openedFromMenu = false;
  returnPage: '/login' | '/signup' = '/login';

  setMenuNavigation(returnPage: '/login' | '/signup') {
    this.openedFromMenu = true;
    this.returnPage = returnPage;
  }

  clearMenuNavigation() {
    this.openedFromMenu = false;
  }
}
