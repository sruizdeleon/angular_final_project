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
  selector: 'app-user-form-by-admin',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form-by-admin.component.html',
  styleUrl: './user-form-by-admin.component.scss',
})
export class UserFormByAdminComponent implements OnInit {
  userForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}
  newUserAdmin = this.userService.userAdminData;

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      name: [
        this.newUserAdmin.name,
        [Validators.required, Validators.minLength(4)],
      ],
      surname: [
        this.newUserAdmin.surname,
        [Validators.required, Validators.minLength(4)],
      ],
      email: [
        this.newUserAdmin.email,
        [Validators.required, Validators.minLength(4)],
      ],
      password: [
        this.newUserAdmin.password,
        [Validators.required, Validators.minLength(4)],
      ],
      phoneNumber: [this.newUserAdmin.phoneNumber, [Validators.required]],
      enabled: [this.newUserAdmin.enabled, [Validators.required]],
      role: [this.newUserAdmin.role, [Validators.required]],
    });

    this.userForm.valueChanges.subscribe((changes: any) => {
      this.newUserAdmin = changes;
      console.log(changes);
    });
  }

  onSubmit() {
    this.userService.registerAdmin(this.newUserAdmin).subscribe({
      next: (res: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado con éxito',
          showConfirmButton: true,
          confirmButtonText: 'Ok',
        });
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
    console.log('Registrando...');
  }
}
