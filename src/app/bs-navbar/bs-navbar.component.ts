import { Component } from '@angular/core';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isMenuCollapsed = true;

  toggle(){
    this.isMenuCollapsed = !this.isMenuCollapsed;
    console.log(this.isMenuCollapsed);
  }
}
