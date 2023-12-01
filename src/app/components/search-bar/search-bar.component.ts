import { Component, EventEmitter, Input, OnInit, Output, afterNextRender, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AsyncPipe} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FilterComponent } from '../filter/filter.component';
import { FormsModule, NgForm } from '@angular/forms';
import { CarsFilter } from '../../types';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule, 
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    FilterComponent,
    FormsModule
  ],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  manufacturer = signal('')
  model = signal('')
  fuel = signal('')
  year = signal('')

  private _value!: CarsFilter;
  @Input()
  public get value(): CarsFilter {
    return this._value;
  }
  public set value(value: CarsFilter) {
    this._value = value;
    this.manufacturer.set(value.manufacturer??'');
    this.model.set(value.model??'');
    this.fuel.set(value.fuel??'');
    this.year.set(value.year??'');
    
  }
 

  @Output() submitEvent = new EventEmitter();

  onSubmit(form: NgForm){
    const filter:CarsFilter = {
      manufacturer: this.manufacturer(),
      model: this.model(),
      fuel: this.fuel(),
      year: this.year()
    }
    
    this.submitEvent.emit(filter);
  }

}
