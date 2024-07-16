import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  isNavOpen = false;
  shadowApplied = false;
  isMobile = window.innerWidth <= 1000;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isMobile = window.innerWidth <= 1000;
  }

  toggleNav() {
    this.isNavOpen = !this.isNavOpen;
  }

  addShadow() {
    this.shadowApplied = true;
  }

  removeShadow() {
    this.shadowApplied = false;
  }
}
