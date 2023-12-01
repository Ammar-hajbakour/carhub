import { Component, afterNextRender, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CustomButtonComponent } from '../custom-button/custom-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, CustomButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  constructor() {
    afterNextRender(() => {
      let prevScrollPos = window.pageYOffset || window.scrollY;
      const navbar = document.getElementById('navbar') as HTMLElement;
      window.onscroll = () => {
        if(window.scrollY > 500){
          let currentScrollPos = window.pageYOffset || window.scrollY;
          if (prevScrollPos > currentScrollPos) {
            navbar.style.top = '0';
          } else {
            navbar.style.top = '-100%';
          }
      
          prevScrollPos = currentScrollPos;
        }
      }
    })
  }

  handleScroll(to: string) {
    const element = document.getElementById(to);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
