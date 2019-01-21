import { Component, OnInit, ViewChild, ViewContainerRef, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-fishgame',
  templateUrl: './fishgame.component.html',
  styleUrls: ['./fishgame.component.css']
})
export class FishgameComponent implements OnInit {
	@ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
	@ViewChild("fish") fish: TemplateRef<any>;
	@ViewChild("bug") bug: TemplateRef<any>;

	private fishes = [];
  	private bugs = [];
  	private running = false;

  constructor() { 

  	

  }

  ngOnInit() {

  	console.log('init');
  	window.requestAnimationFrame(this.animate.bind(this));

  	this.running = false;

  }


  animate(time){
  	
  	console.log(time);

  	var fish;
  	var bug;

  	for(var i in this.fishes){
  		fish = this.fishes[i];
  		console.log(fish);
  	}

  	for(var i in this.bugs){
  		bug = this.bugs[i];
  		console.log(bug);
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


  addFish(){
  	console.log('add fish');
  	let view = this.fish.createEmbeddedView(null);

  	this.vc.insert(view);

  	this.fishes.push({
  		'view': view,
  		'typeName': 'fish'
  	})

  	console.log(this.fishes);
  }

  addBug(){
  	console.log('add bug');
  	let view = this.bug.createEmbeddedView(null);

  	this.vc.insert(view);

  	this.bugs.push({
  		'view': view,
  		'typeName': 'bug'
  	})

  }

}
