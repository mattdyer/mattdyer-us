import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-fishgame',
  templateUrl: './fishgame.component.html',
  styleUrls: ['./fishgame.component.css']
})
export class FishgameComponent implements AfterViewInit {
	@ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
	@ViewChild("tpl") tpl: TemplateRef<any>;

  constructor() { }

  ngAfterViewInit() {

  	let view = this.tpl.createEmbeddedView(null);

  	this.vc.insert(view);

  }

}
