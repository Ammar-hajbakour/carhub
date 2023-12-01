import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, signal } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';

import { searchItems } from '../../constants';
import { Observable, map, of, startWith, tap } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    TitleCasePipe
  ],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnChanges {

  canUnset = signal(true);

  @Input() type!: any;
  @Input() value!: any;

  private _hasUnset: boolean = true;
  @Input()
  public get hasUnset(): boolean {
    return this._hasUnset;
  }
  public set hasUnset(value: boolean) {
    this._hasUnset = value;
    this.canUnset.set(value);
  }
  @Output() filterEvent = new EventEmitter();


  formControl = new FormControl('');
  
  options!: string[];
  setOptions(type: string){
    switch (type) {
      case 'manufacturer': 
        return searchItems.manufacturer;
      case 'fuel':
        return searchItems.fuel;
      case 'year':
        return searchItems.year;
      default:
        return []
    }
  }
  filteredOptions$: Observable<string[]>= of([]);

  ngOnInit() {
    this.filteredOptions$ = this.formControl.valueChanges.pipe(
      tap((value) => this.filterEvent.emit(value)),
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  ngOnChanges(changes: SimpleChanges): void {
      if(changes['type']){
        this.options = this.setOptions(changes['type'].currentValue)
      }
      if(changes['value']){
        this.formControl.setValue(changes['value'].currentValue,{emitEvent: false})
      }
  }
}
