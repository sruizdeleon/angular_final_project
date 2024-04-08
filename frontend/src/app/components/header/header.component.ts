import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit{

  constructor(private userService:UserService) { }

  token!: String;
  role!: String;
  session!: Boolean

  ngOnInit(): void {
    this.token = this.userService.getToken()
    this.role = this.userService.getRole()
    this.token.length > 0 ? this.session = true : this.session = false;
    console.log("Largo del token",this.token.length);
    // this.userService.getTokenObservable().subscribe((token)=>{
    //   this.token = token;
    //   console.log("Observable", token);
    // })
    // this.userService.getRoleObservable().subscribe((role)=>{
    //   this.role = role;
    //   console.log('Observable', role);
    // })
  }

  changeSesionState(status: boolean){
    this.session = status;
  }

  onLogout() {
    this.changeSesionState(!this.session);
    this.userService.logOut();
  }
}
