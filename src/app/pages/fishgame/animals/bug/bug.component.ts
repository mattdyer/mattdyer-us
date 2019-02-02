import { Component, OnInit } from '@angular/core';
import { AnimalComponent } from '../animal/animal.component';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.css']
})
export class BugComponent extends AnimalComponent {

	private type = 'bug';

  constructor() {
  	super();
  }

  
}
