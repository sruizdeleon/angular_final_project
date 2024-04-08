import { RestaurantService } from './../../services/restaurants/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../../interfaces/restaurant';
import { ActivatedRoute, Router } from '@angular/router';
import { GoBackComponent } from '../../components/go-back/go-back.component';
import Swal from 'sweetalert2';
import { RestaurantAdminData } from '../../interfaces/dto/restaurant-admin-data';
import { InfluencerService } from '../../services/influencers/influencer.service';

@Component({
  selector: 'app-restaurant',
  standalone: true,
  imports: [GoBackComponent],
  templateUrl: './restaurant.component.html',
  styleUrl: './restaurant.component.scss',
})
export class RestaurantComponent implements OnInit {
  id!: string;
  restaurant!: Restaurant;

  constructor(
    private restaurantService: RestaurantService,
    private influencerService: InfluencerService,
    private rutaActiva: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.rutaActiva.paramMap.subscribe((params: any) => {
      this.id = params.params.id;
      console.log(this.id);
      this.restaurantService
        .getRestaurantsById(this.id)
        .subscribe((data: any) => {
          this.restaurant = data;
          console.log('Restaurante', this.restaurant);
        });
    });
  }

  onEdit(restaurant: RestaurantAdminData) {
    this.influencerService.setVisibilityInfluencerForm(false);
    this.restaurantService.setVisibilityRestaurantForm(true);
    this.restaurantService.editRestaurantAdminData(restaurant);
    this.router.navigate(['/settings-admin']);
  }

  onDelete() {
    Swal.fire({
      title: `¿Seguro que deseas eliminar: ${this.restaurant.name}`,
      confirmButtonText: 'Eliminar',
      showConfirmButton: true,
      denyButtonText: 'Cancelar',
      showDenyButton: true,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.restaurantService
          .deleteRestaurantsById(this.id)
          .subscribe((data) => {
            console.log(data);
            Swal.fire({
              title: 'Restaurante eliminado con éxito',
              icon: 'success',
            }).then(() => this.router.navigate(['/restaurants']));
          });
      } else if (result.isDenied) {
        Swal.fire({
          title: 'Restaurante a salvo',
          icon: 'info',
        });
      }
    });
  }
}
