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

  	for(var fish of this.fishes){

  		if(!fish.style){
  			fish.style = fish.view._view.nodes[1].renderElement.style;
  			fish.style.top = 0;
  			fish.style.left = 0;
  		}

  		console.log(fish.style.top);

  		fish.style.top = (parseInt(fish.style.top,10) + 1) + 'px';

  	}

  	for(var bug of this.bugs){
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

  	console.log(view);

  	//let style = view._view.nodes[1].renderElement.style;

  	//style.top = 0;
  	//style.left = 0;

  	this.fishes.push({
  		'view': view,
  		'typeName': 'fish',
  		'left':0,
  		'top':0,
  		'style': undefined
  	});

  	console.log(this.fishes);
  }

  addBug(){
  	console.log('add bug');
  	let view = this.bug.createEmbeddedView(null);

  	this.vc.insert(view);

  	this.bugs.push({
  		'view': view,
  		'typeName': 'bug',
  		'left':0,
  		'top':0
  	})

  }

}
