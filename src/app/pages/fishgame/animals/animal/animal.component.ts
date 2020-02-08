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
      
      var newLeft = 0;
      var newTop = 0;

      let distanceToMove = this.species.Speed * time;

      if(this.isAtDestination(distanceToMove)){
        newLeft = this.destination[0];
        newTop = this.destination[1];
      }else{
        
        newLeft = ((this.destination[0] - this.left) * distanceToMove) + this.left;
        newTop = ((this.destination[1] - this.top) * distanceToMove) + this.top;
      }


      this.left = newLeft;
      this.top = newTop;

      this.getStyle().left = newLeft + 'px';
      this.getStyle().top = newTop + 'px';
    

    
      for(var animal of animals){

        //console.log(animal.getType());
        //console.log(this.species.FoodType);
        //console.log(this.species.FoodType.indexOf(animal.getType()));

        var foodFound = false;
        var predatorFound = false;
        var closestFood = 2000;

        if(this.species.FoodType.indexOf(animal.getType()) >= 0){
          
          foodFound = true;

          if(this.distanceToAnimal(animal) < closestFood){
            this.destination = [animal.getLeft(),animal.getTop()];
            closestFood = this.distanceToAnimal(animal);
          }

          if(this.targetIsInRange(animal)){
            animal.kill();
          }

        }



        if(this.species.PredatorType.indexOf(animal.getType()) >= 0){
          predatorFound = true;

          var distanceToPredator = this.distanceToAnimal(animal);


          let newLeft = this.getLeft() - ((animal.getLeft() - this.getLeft()) * 10 / distanceToPredator);
          let newTop = this.getTop() - ((animal.getTop() - this.getTop()) * 10 / distanceToPredator);

          //console.log(newLeft);
          //console.log(newTop);

          //console.log(this.getLeft());
          //console.log(this.getTop());

          this.destination = [newLeft, newTop];
        }


        

      }

      if(!foodFound && !predatorFound){
        if(this.isAtDestination(time)){
          console.log('New Destination Chosen');
          this.randomDestination();
        }
      }

    }


  }

  isAtDestination(distanceToMove){
    
    return this.distanceToDestination() < distanceToMove;
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

  randomDestination(){

    var randomLeft = (Math.random() * 1000);
    var randomTop = (Math.random() * 400);

    var newDestination = [randomLeft, randomTop];

    //var newDestination = [Math.max(this.destination[0] + randomLeft, 0), Math.max(this.destination[1] + randomTop, 0)];

    this.destination = newDestination;
  }

  distanceToPoint(left, top){
    var distance = Math.sqrt(Math.pow(this.getLeft() - left,2) + Math.pow(this.getTop() - top,2));
    //console.log(distance);
    return distance;
  }

  distanceToDestination(){
    return this.distanceToPoint(this.destination[0], this.destination[1]);
  }

  distanceToAnimal(animal){
    return this.distanceToPoint(animal.getLeft(), animal.getTop());
  }

  targetIsInRange(animal){
    return this.distanceToPoint(animal.getLeft(), animal.getTop()) < this.tolerance;
  }

}
