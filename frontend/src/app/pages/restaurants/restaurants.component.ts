import { RestaurantService } from './../../services/restaurants/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import Swal from 'sweetalert2';
import { RestaurantMiniatureComponent } from '../../components/components/restaurant-miniature/restaurant-miniature.component';

@Component({
  selector: 'app-restaurants',
  standalone: true,
  imports: [RouterLink, RestaurantMiniatureComponent],
  templateUrl: './restaurants.component.html',
  styleUrl: './restaurants.component.scss'
})
export class RestaurantsComponent implements OnInit{
  restaurants: Restaurant[] = []

  constructor(private restaurantService: RestaurantService, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    const loggedUser = this.userService.sesionExist();
    console.log(loggedUser);
    if (loggedUser === true) {
      this.restaurantService.getRestaurants().subscribe({
        next: (res) => {
          this.restaurants = res as Restaurant[];
          console.log(res)
        },
        error: (err) => {
          let msgError;
          err.msg
            ? (msgError = err.msg)
            : (msgError = 'fallo interno del servidor.');
          console.log(err);
          Swal.fire({
            title: `Error: ${msgError}`,
            text: 'Prueba de nuevo más tarde.',
            confirmButtonText: 'Cerrar',
            showConfirmButton: true,
            icon: 'error',
          });
        }
      })
    } else {
      this.userService.logOut()
      // this.router.navigate(['/login'])
    }
  }
}
