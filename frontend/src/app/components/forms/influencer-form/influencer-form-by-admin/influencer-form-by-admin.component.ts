import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { InfluencerService } from '../../../../services/influencers/influencer.service';
import { UserService } from '../../../../services/users/user.service';

@Component({
  selector: 'app-influencer-form-by-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './influencer-form-by-admin.component.html',
  styleUrl: './influencer-form-by-admin.component.scss',
})
export class InfluencerFormByAdminComponent implements OnInit{
  influencerForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private influencerService: InfluencerService,
    private userService:UserService,
    private router: Router
  ) {}
  newInfluencerAdmin = this.influencerService.influencerAdminData;
  newInfluencerAdminId = this.influencerService.influencerAdminData._id;
  userRole!: String;

  ngOnInit(): void {
    this.userRole = this.userService.getRole();
    this.influencerService.clearInfluencerAdminData();
    this.influencerForm = this.formBuilder.group({
      nickName: [
        this.newInfluencerAdmin.nickName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      accountIG: [
        this.newInfluencerAdmin.accountIG,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(255),
        ],
      ],
      description: [
        this.newInfluencerAdmin.description,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(400),
        ],
      ],
      subscribers: [
        this.newInfluencerAdmin.subscribers,
        [Validators.required, Validators.minLength(2), Validators.maxLength(7)],
      ],
      logo: [this.newInfluencerAdmin.images.logo, [Validators.required]],
      miniature: [
        this.newInfluencerAdmin.images.miniature,
        [Validators.required, Validators.minLength(10), Validators.maxLength(400)],
      ],
      frontPage: [
        this.newInfluencerAdmin.images.frontPage,
        [Validators.required, Validators.minLength(10), Validators.maxLength(400)],
      ],
      userId: [this.newInfluencerAdmin.userId, [Validators.required, Validators.maxLength(24), Validators.minLength(24)]],
    });

    this.influencerForm.valueChanges.subscribe((changes: any) => {
      this.newInfluencerAdmin = {
        _id: "",
        nickName: changes.nickName,
        accountIG: changes.accountIG,
        description: changes.description,
        subscribers: changes.subscribers,
        images: {
          logo: changes.logo,
          miniature: changes.miniature,
          frontPage: changes.frontPage,
        },
        userId: changes.userId,
      };
      console.log(this.newInfluencerAdmin);
    });
  }

  onSubmit() {
    console.log(this.newInfluencerAdmin)
    if(this.newInfluencerAdminId !== "") {
      this.influencerService
        .patchInfluencerByAdmin(
          this.newInfluencerAdmin,
          this.newInfluencerAdminId
        )
        .subscribe({
          next: (res: any) => {
            Swal.fire({
              icon: 'success',
              title: 'Influencer modificado con éxito',
              showConfirmButton: true,
              confirmButtonText: 'Ok',
            });
            this.influencerForm.reset();
            this.router.navigate([`/influencers/${res.data._id}}`]);
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
      this.influencerService.postInfluencerByAdmin(this.newInfluencerAdmin).subscribe({
        next: (res: any) => {
          Swal.fire({
            icon: 'success',
            title: 'Influencer creado con éxito',
            showConfirmButton: true,
            confirmButtonText: 'Ok',
          });
            this.influencerForm.reset();
            this.router.navigate([`/influencers/${res.data._id}}`]);
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

  onClear() {
    this.influencerService.clearInfluencerAdminData();
    this.newInfluencerAdmin = this.influencerService.influencerAdminData;
    this.newInfluencerAdminId = this.influencerService.influencerAdminData._id;
    this.influencerForm.reset();
    console.log(this.newInfluencerAdmin)
  }
}
