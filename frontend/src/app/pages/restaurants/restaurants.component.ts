import { RestaurantService } from './../../services/restaurants/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent implements OnInit{
  restaurants: Restaurant[] = []

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantService.findAll().subscribe({
      next: (res) => this.restaurants = res as Restaurant[],
      error: (err) => console.log(err)
    })
  }
}
