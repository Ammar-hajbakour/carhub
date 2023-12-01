import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { CarsFilter, CarViewModel } from './types';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  constructor() { }
  readonly total = signal(0);
  calculateCarRent(city_mpg: number, year:number){
    const basePricePerDay = generateRandomInt(50+(year%5),60+(year%5) );
    const mileageFactor = 0.1;
    const ageFactor = 0.05;
    const mileageRate = city_mpg * mileageFactor;
    const ageRate = (new Date().getFullYear() - year) * ageFactor;

    const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

    return Math.round(rentalRatePerDay);
  }
  getCars(filter?: CarsFilter) : Observable<any[]> {
    const headers = {
      'X-RapidAPI-Key': '998a428398msh98c541e1a564adfp159b40jsnc677b11d5804',
      'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
 
    const q = {
      make: filter?.manufacturer ?? '',
      model: filter?.model ?? '',
      fuel_type: filter?.fuel ?? '',
      year: filter?.year,
      limit: filter?.limit ?? 10
    } as any

    const qstr = Object.keys(q).map(key => `${key}=${q[key]}`).join('&');
    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${qstr}`;
    
    return this.http.get<any[]>(url, {headers}).pipe(tap(res=> {
      this.total.set(res.length)
      console.log(res.length);
      
    }));
  }

  generateCarImageUrl(car: CarViewModel, angle?:string){
    const { make, model, year } = car
    const url = new URL('https://cdn.imagin.studio/getimage');
    url.searchParams.append('customer', 'hrjavascript-mastery');
    url.searchParams.append('make', make);
    url.searchParams.append('modelFamily', model.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);

    if(angle) url.searchParams.append('angle', angle);

    return `${url}`
  }
}

function generateRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}