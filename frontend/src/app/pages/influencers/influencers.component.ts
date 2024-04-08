import { Component, OnInit } from '@angular/core';
import { InfluencerService } from '../../services/influencers/influencer.service';
import { Influencer } from '../../interfaces/influencer';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import Swal from 'sweetalert2';
import { InfluencerMiniatureComponent } from '../../components/components/influencer-miniature/influencer-miniature.component';

@Component({
  selector: 'app-influencers',
  standalone: true,
  imports: [RouterLink, InfluencerMiniatureComponent],
  templateUrl: './influencers.component.html',
  styleUrl: './influencers.component.scss',
})
export class InfluencersComponent implements OnInit {

  influencerList: Influencer[] = [];
  constructor(private servicio: InfluencerService, private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    const loggedUser = this.userService.sesionExist();
    console.log(loggedUser);
    if (loggedUser === true) {
    this.servicio.getInfluencers().subscribe({
      next: (res:any) =>{
      this.influencerList = res;
      console.log(this.influencerList)
        },
        error: (err) => {
          let msgError;
          err.msg ? msgError = err.msg : msgError = "fallo interno del servidor."
          console.log(err)
          Swal.fire({
            title: `Error: ${msgError}`,
            text: "Prueba de nuevo más tarde.",
            confirmButtonText: "Cerrar",
            showConfirmButton: true,
            icon: "error"
          })
        }
      })
    } else {
      this.userService.logOut()
      // this.router.navigate(['/login'])
    }
  }
}
