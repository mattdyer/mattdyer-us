import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { AnimalComponent } from '../animal/animal.component';


@Component({
  selector: 'app-fish',
  templateUrl: './fish.component.html',
  styleUrls: ['./fish.component.css']
})
export class FishComponent extends AnimalComponent {
	

	private type = 'fish';

  constructor() { 
  	super();
  }

  
}
