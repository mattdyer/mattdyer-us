import { Component } from '@angular/core';
import { AnimalComponent } from '../animal/animal.component';
//import { SpeciesService } from '../../../../services/species.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css','../animal/animal.component.css']
})
export class BugComponent extends AnimalComponent {


	getType(){
	  	return 'bug';
	  }
  
}
