import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/users/user.service';
import { UserLoginData } from '../../../interfaces/dto/user-login-data';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit{
  hidePassword: boolean = true;
  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.sesionExist()
  }

  doLogin() {
    const data: UserLoginData = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    this.userService.login(data).subscribe({
      next: (res: any) => {
        this.userService.setToken(res.token)
        this.userService.setLoginTime(this.userService.saveTime())
        this.userService.setRole(res.role)
        console.log(res)
        Swal.fire({
          title: `¡Hola de nuevo ${res.name}!`,
          icon: 'success',
        })
        this.router.navigate(['/restaurants'])
      },
      error: (err) => console.log(err),
    });
  }
}
