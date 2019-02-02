import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements AfterViewInit {
	@ViewChild("elem", {read: ElementRef}) elem: ElementRef;

	private top = 0;
	private left = 0;
	private type = '';

  constructor() { }

  ngAfterViewInit() {
  	console.log(this.elem.nativeElement);
  }
  
  getStyle(){
  	return this.elem.nativeElement.style;
  }

  getType(){
  	return this.type;
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

}
