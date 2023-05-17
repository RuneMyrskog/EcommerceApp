import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isMenuCollapsed = true;

  constructor(public auth: AuthService){
    
  }

  logout() {
    this.auth.logout();
  }

  toggle(){
    this.isMenuCollapsed = !this.isMenuCollapsed;
    console.log(this.isMenuCollapsed);
  }
}
