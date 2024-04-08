import { Component, Input } from '@angular/core';
import { Influencer } from '../../../interfaces/influencer';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-influencer-miniature',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './influencer-miniature.component.html',
  styleUrl: './influencer-miniature.component.scss'
})
export class InfluencerMiniatureComponent {

  @Input() influencer?: Influencer;
}
