import { Component } from '@angular/core';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  showpadLogo: string = "../../assets/img/showpad_logo.png" 
  pokeball: string = "../../assets/img/pokeball.png"
  pokeballTransparent: string = "../../assets/img/pokeball_transparent.png"
  star: string = "../../assets/img/star.png"
  faSearch = faSearch
  faStar = faStar
  tooltipAnimation: boolean = true
}
