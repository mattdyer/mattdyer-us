import { Component, ComponentFactoryResolver, Type, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FishComponent } from './animals/fish/fish.component';
import { BugComponent } from './animals/bug/bug.component';

@Component({
  selector: 'app-fishgame',
  templateUrl: './fishgame.component.html',
  styleUrls: ['./fishgame.component.css']
})
export class FishgameComponent implements OnInit {
	@ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;

	//@ViewChild("fish") fish: TemplateRef<any>;
	//@ViewChild("bug") bug: TemplateRef<any>;

	private animals = [];
  private running = false;
  private lastTime;

  FishComponentClass = FishComponent;
  BugComponentClass = BugComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { 

  	

  }

  ngOnInit() {

  	console.log('init');
  	//window.requestAnimationFrame(this.animate.bind(this));

  	this.running = false;

  }


  animate(time){
  	
    if(!this.lastTime){
      this.lastTime = time;
    }

    var timeDifference = time - this.lastTime;

  	//console.log(timeDifference);

  	for(var animal of this.animals){


      animal.move(timeDifference, this.animals);

  	}

    var cleanedAnimals = [];

    for(var animal of this.animals){

      if(!animal.isDead()){
        cleanedAnimals.push(animal);
      }

    }

    this.animals = cleanedAnimals;

  	if(this.running){
	  	window.requestAnimationFrame(this.animate.bind(this));
      this.lastTime = time;
	 }


  }


  start(){
  	this.running = true;
    this.lastTime = undefined;
  	window.requestAnimationFrame(this.animate.bind(this));
  }

  stop(){
  	this.running = false;
  }


  addFish(componentClass: Type<any>){
  	console.log('add fish');
  	
  	this.addAnimal(componentClass);

  }

  addBug(componentClass: Type<any>){
  	console.log('add bug');

  	this.addAnimal(componentClass);

  }

  addAnimal(componentClass: Type<any>){
  	
  	const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.vc.createComponent(componentFactory);

    //console.log(this.vc);

    component.instance._ref = component;

    component.instance.getStyle().top = 0;
    component.instance.getStyle().left = 0;

  	this.animals.push(component.instance);
  }

}
