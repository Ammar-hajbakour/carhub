export type CarViewModel = {
  city_mpg: number,
  class: string,
  combination_mpg: number,
  cylinders: number,
  displacement: number,
  drive: string,
  fuel_type: string,
  highway_mpg: number,
  make: string,
  model: string,
  transmission: string,
  year: number
}

export type CarsFilter = {
  manufacturer?: string, 
  model?: string,
  fuel?: string,
  year: string,
  limit?: number
}