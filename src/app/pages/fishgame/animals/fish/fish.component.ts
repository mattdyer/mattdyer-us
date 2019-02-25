import { Component } from '@angular/core';
import { AnimalComponent } from '../animal/animal.component';
//import { SpeciesService } from '../../../../services/species.service';

@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css','../animal/animal.component.css']
})
export class FishComponent extends AnimalComponent {
	


  	getType(){
	  	return 'fish';
	  }

}
