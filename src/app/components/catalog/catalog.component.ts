import { Component, DestroyRef, OnInit, Signal, afterNextRender, computed, inject, signal } from '@angular/core';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { Observable, map, tap } from 'rxjs';
import { DataService } from '../../data.service';
import { CarCardComponent } from '../car-card/car-card.component';
import { CarViewModel, CarsFilter } from '../../types';
import { CustomButtonComponent } from '../custom-button/custom-button.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, SearchBarComponent, CarCardComponent, CustomButtonComponent, AsyncPipe, JsonPipe],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent {
  destroy = inject(DestroyRef)
  router = inject(Router);
  route = inject(ActivatedRoute)
  dataService = inject(DataService)
  perPage = 12;
  limit = signal(12);
  pageNumber = 1;
 
  filter = signal<CarsFilter>({year:new Date().getFullYear().toString(),limit: this.limit()});
  hasNext = computed(() => this.dataService.total() >= this.limit()) //
  cars: CarViewModel[] = [];
  cars$: Observable<CarViewModel[]> = this.dataService.getCars(this.filter())

  constructor(){
    this.route.queryParams.subscribe(params => {
      const q = Object.keys(params).filter(key=> params[key])
      .reduce((a,cur)=> ({...a, [cur]: params[cur]}),{});
      this.filter.update(prev=>({...prev, ...q}));
      this.cars$ = this.dataService.getCars(this.filter());
    })
  }

  onSearchSubmit(filter: CarsFilter){
    const params = filter as any
    
    const q = Object.keys(params).filter(key=> params[key])
    .reduce((a,cur)=> ({...a, [cur]: params[cur]}),{});
    this.filter.set({...q as any});
    this.router.navigate([], {queryParams: {...q}});
  }

  showMore(total: number){
    // this.hasNext.set(total > this.limit())
    this.limit.set(++this.pageNumber * this.perPage);
    this.onSearchSubmit({...this.filter(),limit:this.limit()});
  }
}
