import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

import { SpeciesService } from '../../../../services/species.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements AfterViewInit {
	@ViewChild("elem", {read: ElementRef}) elem: ElementRef;

  public _ref;

  private left = 0;
	private top = 0;
	
	private destination = [40,40];

  private species;

  private dead = false;

  private tolerance = 5;

  constructor(private speciesService: SpeciesService) { 
    
    this.speciesService.getSpecies().subscribe(data => {
          //this.species = data;
          //console.log(this.getType());
          //console.log(data);
          //console.log(data[this.getType()])

          this.species = data[this.getType()];
      }); 
  }

  ngAfterViewInit() {
  	//console.log(this.elem.nativeElement);
  }
  
  public move(time, animals){
    //console.log(time);
    
    if(this.species){
      var newLeft = ((this.destination[0] - this.left) * (this.species.Speed * time)) + this.left;
      var newTop = ((this.destination[1] - this.top) * (this.species.Speed * time)) + this.top;

      this.left = newLeft;
      this.top = newTop;

      this.getStyle().left = newLeft + 'px';
      this.getStyle().top = newTop + 'px';
    

    
      for(var animal of animals){

        //console.log(animal.getType());
        //console.log(this.species.FoodType);
        //console.log(this.species.FoodType.indexOf(animal.getType()));

        if(this.species.FoodType.indexOf(animal.getType()) >= 0){
          this.destination = [animal.getLeft(),animal.getTop()];

          if(Math.abs(animal.getLeft() - this.getLeft()) < this.tolerance && Math.abs(animal.getTop() - this.getTop()) < this.tolerance){
            animal.kill();
          }

        }

        if(this.species.PredatorType.indexOf(animal.getType()) >= 0){
          this.destination = [this.getLeft() + 10,this.getTop() + 10];
        }

      }
    }


  }

  getStyle(){
  	return this.elem.nativeElement.style;
  }

  getType(){
  	return '';
  }

  getTop(){
  	return this.top;
  }

  setTop(top){
  	this.top = top;
  }

  getLeft(){
  	return this.left;
  }

  setLeft(left){
  	this.left = left;
  }

  kill(){
    this.dead = true;
    this._ref.destroy();
  }

  isDead(){
    return this.dead;
  }

}
