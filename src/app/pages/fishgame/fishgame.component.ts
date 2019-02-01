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
  	
  	console.log(time);

  	for(var animal of this.animals){

  		/*if(!fish.style){
  			fish.style = fish.view._view.nodes[1].renderElement.style;
  			fish.style.top = 0;
  			fish.style.left = 0;
  		}*/

  		console.log(animal);

  		//fish.style.top = (parseInt(fish.style.top,10) + 1) + 'px';

  	}

  	if(this.running){
	  	window.requestAnimationFrame(this.animate.bind(this));
	}
  }


  start(){
  	this.running = true;
  	window.requestAnimationFrame(this.animate.bind(this));
  }

  stop(){
  	this.running = false;
  }


  addFish(componentClass: Type<any>){
  	console.log('add fish');
  	
  	this.addAnimal(componentClass,'fish');

  }

  addBug(componentClass: Type<any>){
  	console.log('add bug');

  	this.addAnimal(componentClass,'bug');

  }

  addAnimal(componentClass: Type<any>, type){
  	
  	const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const component = this.vc.createComponent(componentFactory);

  	this.animals.push({
  		'component': component,
  		'typeName': type,
  		'left':0,
  		'top':0
  	})
  }

}
