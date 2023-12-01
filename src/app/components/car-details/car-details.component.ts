import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CarViewModel } from '../../types';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-car-details',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatDialogModule, NgOptimizedImage],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {
  data: CarViewModel = inject(MAT_DIALOG_DATA)
  dataService = inject(DataService)
  dataEntries = Object.entries(this.data)
}
