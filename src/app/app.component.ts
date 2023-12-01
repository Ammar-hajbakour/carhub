import { AfterViewInit, ChangeDetectionStrategy, Component, HostBinding, OnInit, WritableSignal, afterNextRender, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { CustomButtonComponent } from './components/custom-button/custom-button.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { MatIconModule } from '@angular/material/icon';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';


const components = [
  NavbarComponent,
  HeroComponent,
  CustomButtonComponent,
  CatalogComponent,
  FooterComponent,
  ScrollTopComponent
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIconModule, ...components],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  darkMode:WritableSignal<boolean>= signal(true);

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }
  constructor() {
    afterNextRender(() => {
      this.darkMode.set(JSON.parse(window.localStorage.getItem('darkMode')??'true'))
    }) 
  }


  toggleDarkMode() {
    this.darkMode.set(!this.darkMode());
    window.localStorage.setItem('darkMode', JSON.stringify(this.darkMode()));
  }

}
