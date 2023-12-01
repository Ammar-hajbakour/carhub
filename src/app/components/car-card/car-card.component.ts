import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage, UpperCasePipe } from '@angular/common';
import { CarViewModel } from '../../types';
import { DataService } from '../../data.service';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import {MatDialog, MatDialogConfig, MatDialogModule} from '@angular/material/dialog';
import { CarDetailsComponent } from '../car-details/car-details.component';

@Component({
  selector: 'app-car-card',
  standalone: true,
  imports: [CommonModule, CustomButtonComponent,CarDetailsComponent,MatDialogModule, NgOptimizedImage, UpperCasePipe],
  templateUrl: './car-card.component.html',
  styleUrl: './car-card.component.scss'
})
export class CarCardComponent implements OnChanges{

  @Input() car!: CarViewModel
  dataService = inject(DataService)
  carRent!:number

  dialog = inject(MatDialog);

  viewDetails(item: CarViewModel){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = item;
    dialogConfig.maxHeight = '95dvh';
    dialogConfig.maxWidth = '90dvw';
    this.dialog.open(CarDetailsComponent, dialogConfig);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.carRent = this.dataService.calculateCarRent(this.car['city_mpg'], this.car['year'])
  }

}
