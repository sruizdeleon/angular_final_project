import { Component, OnInit } from '@angular/core';
import { InfluencerService } from '../../services/influencers/influencer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Influencer } from '../../interfaces/influencer';
import { GoBackComponent } from '../../components/go-back/go-back.component';
import Swal from 'sweetalert2';
import { InfluencerAdminData } from '../../interfaces/dto/influencer-admin-data';
import { UserService } from '../../services/users/user.service';
import { RestaurantService } from '../../services/restaurants/restaurant.service';


@Component({
  selector: 'app-influencer',
  standalone: true,
  imports: [GoBackComponent],
  templateUrl: './influencer.component.html',
  styleUrl: './influencer.component.scss'
})
export class InfluencerComponent implements OnInit{
  id!:string;
  influencer!:Influencer;
  constructor(
    private influencerService:InfluencerService,
    private restaurantSercice:RestaurantService,
    private rutaActivada:ActivatedRoute,
    private router: Router){}


  ngOnInit(): void {
    this.rutaActivada.paramMap.subscribe((params:any)=>{
      this.id = params.params.id;
      console.log(this.id)
      this.influencerService.getInfluencerById(this.id).subscribe((data:any)=>{
        console.log(data);
        this.influencer = data;
      })
    })
  }

  onEdit(influencer:InfluencerAdminData) {
    this.restaurantSercice.setVisibilityRestaurantForm(false);
    this.influencerService.setVisibilityInfluencerForm(true);
    this.influencerService.editInfluencerAdminData(influencer);
    this.router.navigate(['/settings-admin']);
  }

  onDelete() {
    Swal.fire({
      title: `¿Seguro que deseas eliminar el influencer: ${this.influencer.nickName}?`,
      showConfirmButton: true,
      showDenyButton: true,
      confirmButtonText: "Eliminar",
      denyButtonText: "Cancelar",
      icon: "warning"
    }).then((result)=>{
      if(result.isConfirmed){
        this.influencerService.deleteInfluencerById(this.influencer._id).subscribe((data:any)=>{
          console.log(data);
          Swal.fire({
            title: "Influencer eliminado con éxito",
            icon: "success"
          }).then(()=> this.router.navigate(['/influencers']));
        })
      } else if (result.isDenied){
        Swal.fire({
          title: "¡Influencer a salvo!",
          icon: "info"
        })
      }
    })
  }
}
