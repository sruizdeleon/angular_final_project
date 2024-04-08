import { Component, Input } from '@angular/core';
import { Restaurant } from '../../../interfaces/restaurant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-restaurant-miniature',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './restaurant-miniature.component.html',
  styleUrl: './restaurant-miniature.component.scss'
})
export class RestaurantMiniatureComponent{
  @Input() restaurant?: Restaurant;
}
