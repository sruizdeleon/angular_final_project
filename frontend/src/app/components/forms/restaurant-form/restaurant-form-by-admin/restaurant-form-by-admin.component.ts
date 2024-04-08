import { RestaurantService } from './../../../../services/restaurants/restaurant.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-restaurant-form-by-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './restaurant-form-by-admin.component.html',
  styleUrl: './restaurant-form-by-admin.component.scss',
})
export class RestaurantFormByAdminComponent implements OnInit {
  restaurantForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private restaurantService: RestaurantService,
    private userService: UserService,
    private router: Router
  ) {}
  newRestaurantAdmin = this.restaurantService.restuarantAdminData;
  newRestaurantAdminId = this.restaurantService.restuarantAdminData._id;
  userRole!: String;

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.restaurantService.clearRestaurantAdminData();
    this.restaurantForm = this.formBuilder.group({
      name: [
        this.newRestaurantAdmin.name,
        [
          Validators.required,
        ],
      ],
      phoneNumber: [
        this.newRestaurantAdmin.phoneNumber,
        [
          Validators.required,
        ],
      ],
      frontPage: [
        this.newRestaurantAdmin.images.frontPage,
        [
          Validators.required,
        ],
      ],
      miniature: [
        this.newRestaurantAdmin.images.miniature,
        [
          Validators.required,
        ],
      ],
      street: [
        this.newRestaurantAdmin.address.street,
        [
          Validators.required,
        ],
      ],
      postalCode: [
        this.newRestaurantAdmin.address.postalCode,
        [
          Validators.required,
        ],
      ],
      population: [
        this.newRestaurantAdmin.address.population,
        [
          Validators.required,
        ],
      ],
      province: [
        this.newRestaurantAdmin.address.province,
        [
          Validators.required,
        ],
      ],
      minPrice: [
        this.newRestaurantAdmin.price.minPrice,
        [
          Validators.required,
        ],
      ],
      maxPrice: [
        this.newRestaurantAdmin.price.maxPrice,
        [
          Validators.required,
        ],
      ],
      foodTaste: [
        this.newRestaurantAdmin.influencerScores.foodTaste,
        [
          Validators.required,
        ],
      ],
      decoration: [
        this.newRestaurantAdmin.influencerScores.decoration,
        [
          Validators.required,
        ],
      ],
      service: [
        this.newRestaurantAdmin.influencerScores.service,
        [
          Validators.required,
        ],
      ],
      priceQuality: [
        this.newRestaurantAdmin.influencerScores.priceQuality,
        [
          Validators.required,
        ],
      ],
      influencerId: [
        this.newRestaurantAdmin.influencerId,
        [
          Validators.required,
        ],
      ]
    });

    this.restaurantForm.valueChanges.subscribe((changes: any) => {
      this.newRestaurantAdmin = {
      _id: '',
      name: changes.name,
      phoneNumber: changes.phoneNumber,
      images: {
          frontPage: changes.frontPage,
          miniature: changes.miniature,
      },
      address: {
          street: changes.street ,
          postalCode: changes.postalCode,
          population: changes.population,
          province: changes.province,
      },
      price: {
          minPrice: changes.minPrice,
          maxPrice: changes.maxPrice,
      },
      influencerScores: {
          foodTaste: changes.foodTaste,
          decoration: changes.decoration,
          service: changes.service,
          priceQuality: changes.priceQuality,
      },
      usersScores: {
          average: changes.average,
          reviews: changes.reviews,
      },
      influencerId: changes.influencerId,
      };
      console.log(this.newRestaurantAdmin);
    });
  }

  onSubmit() {
    console.log(this.newRestaurantAdmin);
    console.log(this.userRole)
    if(this.userRole === "admin"){
      if (this.newRestaurantAdminId !== '') {
        this.restaurantService
          .patchRestaurantByAdmin(
            this.newRestaurantAdmin,
            this.newRestaurantAdminId
          )
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Restaurante modificado con éxito',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
              });
              this.restaurantForm.reset();
              this.router.navigate([`/restaurants/${res.data._id}`]);
            },
            error: (err: any) => {
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
            },
          });
      } else {
        this.restaurantService
          .postRestaurantByAdmin(this.newRestaurantAdmin)
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Restaurante creado con éxito',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
              });
              this.restaurantForm.reset();
              this.router.navigate([`/restaurants/${res.data._id}`]);
            },
            error: (err: any) => {
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
            },
          });
      }
    } else if (this.userRole === "influencer") {
      if (this.newRestaurantAdminId !== '') {
        this.restaurantService
          .patchRestaurantByInfluencer(
            this.newRestaurantAdmin,
            this.newRestaurantAdminId
          )
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Restaurante modificado con éxito',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
              });
              this.restaurantForm.reset();
              this.router.navigate([`/restaurants/${res.data._id}`]);
            },
            error: (err: any) => {
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
            },
          });
      } else {
        this.restaurantService
          .postRestaurantByInfluencer(this.newRestaurantAdmin)
          .subscribe({
            next: (res: any) => {
              Swal.fire({
                icon: 'success',
                title: 'Restaurante creado con éxito',
                showConfirmButton: true,
                confirmButtonText: 'Ok',
              });
              this.restaurantForm.reset();
              this.router.navigate([`/restaurants/${res.data._id}`]);
            },
            error: (err: any) => {
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
            },
          });
      }
    }
  }

  onClear() {
    this.restaurantService.clearRestaurantAdminData();
    this.newRestaurantAdmin = this.restaurantService.restuarantAdminData;
    this.newRestaurantAdminId = this.restaurantService.restuarantAdminData._id;
    this.restaurantForm.reset();
    console.log(this.newRestaurantAdmin);
  }
}
