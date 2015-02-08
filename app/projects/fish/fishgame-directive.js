'use strict';

angular.module('myApp.projects.fish.fishgame-directive', [])

.directive('appFishgame', ['$timeout',function($timeout) {

  return function(scope, elm, attrs) {
  	var nextDivID = 0;

  	var imageLocation = 'projects/fish/images/';

		var imageNum = padout(Math.floor(Math.random()*250) + 1);
		var foodLocation = new Array(0);
		var allfish = new Array(1);
		function UpdateInfo(Result){
			document.getElementById('stats').innerHTML = Result;
		}
		function Donothing(Result){
		}
		function padout(number) {
			var newnumber = number;
			if (number < 100){
				newnumber = '0' + number;
			}
			if (number < 10){
				newnumber = '00' + number;
			}
			return newnumber; }
		
		function removeDiv(thisDiv){
			thisDiv.style.height = '0px';
			thisDiv.style.width = '0px';
		}
		
		function addFood(){
			nextDivID = nextDivID + 1;
			var xcoor = Math.floor(Math.random()*600) + 1;
			var ycoor = Math.floor(Math.random()*600) + 1;
			var newdiv = document.createElement('div');
						
			newdiv.id = 'Food' + nextDivID;
			newdiv.style.height = '30px';
			newdiv.style.width = '20px';
			newdiv.style.position = 'absolute';
			newdiv.style.backgroundColor = '#999999';
			newdiv.innerHTML = '<img src="' + imageLocation + '/bug.jpg" height="30" width="20">';
			newdiv.style.top = ycoor + 'px';
			newdiv.style.left = xcoor + 'px';
			var bigDiv = document.getElementById('fishDiv');
			bigDiv.appendChild(newdiv);
			
			var newIndex = foodLocation.length;

			foodLocation[newIndex] = new Array(3);
			foodLocation[newIndex][0] = xcoor;
			foodLocation[newIndex][1] = ycoor;
			foodLocation[newIndex][2] = 'Food' + nextDivID;
			newdiv.setAttribute('onClick', 'removeFood(' + newIndex + ')');
			//moveFish(200, 200, 'Food' + nextDivID, 200, 200);
		}
		
		function removeFood(foodIndex){
			var bigDiv = document.getElementById('fishDiv');
			bigDiv.removeChild(document.getElementById(foodLocation[foodIndex][2]));
			foodLocation.splice(foodIndex,1);	
		}		

		function newFish(startingSpeed, startingLife)
		{
			
			nextDivID = nextDivID + 1;
			//HTTP.get('getallfish.php', UpdateInfo, nextDivID);
				
				
				//for ( var nextDivID=1; nextDivID<2; nextDivID++ ){
					if(!document.getElementById(nextDivID)){
						var color = Math.floor(Math.random()*600000) + 100000;
						var newdiv = document.createElement('div');
						
						newdiv.id = nextDivID;
						//newdiv.innerHTML = '<img src="jessica.jpg" width="100">';
						newdiv.style.backgroundRepeat = 'no-repeat';
						newdiv.style.position = 'absolute';
						newdiv.style.backgroundColor = '#999999';
						newdiv.style.color = '#FF0000';
						newdiv.style.width = '116px';
						newdiv.style.height = '38px';
						var bigDiv = document.getElementById('fishDiv');
						bigDiv.appendChild(newdiv);
					}

					var move = document.getElementById(nextDivID);
					move.style.backgroundImage = 'url(' + imageLocation + '/fish.jpg)';
					move.setAttribute('onClick', 'removeDiv(this)');
					//move.style.backgroundImage = 'url(sunsetfog.jpg)';
						
					
					var xcoor = Math.floor(Math.random()*600) + 1;
					var ycoor = Math.floor(Math.random()*600) + 1;

					//move.style.backgroundPosition = -xcoor + 'px ' + -ycoor + 'px';

					moveFish(xcoor, ycoor, nextDivID, startingLife, startingSpeed);
				
					
				//}
		
			return;
		}

		function moveFish(xdestination, ydestination, divid, life, movespeed)
		{	
			var thisone = document.getElementById(divid);
			var yposition = thisone.style.top;
			var xposition = thisone.style.left;
			var xlength = xposition.indexOf('p');
			var ylength = yposition.indexOf('p');
			yposition = yposition.substring(0,ylength) * 1;
			xposition = xposition.substring(0,xlength) * 1;
			var moveadd = 1;
			var remainingLife = life - Math.pow(movespeed,2)/400;
			var closestFood = 2000;
			

			/*if(foodLocation.length > 0){
					var foodIndex = Math.floor(Math.random()*foodLocation.length);
					xdestination = foodLocation[foodIndex][0];
					ydestination = foodLocation[foodIndex][1];
				}*/

			for(var i=0;i<foodLocation.length;i++){

				var fooddistance = Math.sqrt(Math.pow(xposition-foodLocation[i][0],2) + Math.pow(yposition-foodLocation[i][1],2));

			

				if(fooddistance <= closestFood){
						xdestination = foodLocation[i][0];
						ydestination = foodLocation[i][1];
						closestFood = fooddistance;
					}
				
				if(Math.abs(foodLocation[i][0]-xposition) < 10 && Math.abs(foodLocation[i][1]-yposition) < 10){
					
					remainingLife = remainingLife + 25;
					//statsDiv = document.getElementById('stats');
					//HTTP.get('updatefish.php?DivID=' + divid + '&Life=' + remainingLife + '&Speed=' + movespeed, Donothing, movespeed);
					//HTTP.get('getallfish.php', UpdateInfo, movespeed);
					if(remainingLife > 100)
					{
						var offspringMovespeed = movespeed + Math.random() - 0.5;
						var offspringStartingLife = Math.random()*80;
						newFish(offspringMovespeed, offspringStartingLife);
						remainingLife = remainingLife - offspringStartingLife;
					}
					removeFood(i);
					addFood();
				}
					
			}

	//thisone.innerHTML = Math.floor(life) + '|' + Math.round(movespeed*100)/100 + '<br>' + xdestination + '|' + ydestination;
	
				var xpos = xposition + ((xdestination-xposition) * movespeed/closestFood);
				thisone.style.left = xpos + 'px';
				
				var ypos = yposition + ((ydestination-yposition) * movespeed/closestFood);
				thisone.style.top = ypos + 'px';
				
			if (xdestination>xposition)
			{
				thisone.style.backgroundImage = 'url(' + imageLocation + '/fish.jpg)';
				//thisone.style.width = '116px';
				//thisone.style.height = '38px';
			}
			if (xdestination<xposition)
			{
				//var xpos = xposition - (movespeed * (Math.abs(xposition-xdestination)/Math.abs(yposition-ydestination)));
				//thisone.style.left = xpos + 'px';
				thisone.style.backgroundImage = 'url(' + imageLocation + '/fishleft.jpg)';
				//thisone.style.width = '116px';
				//thisone.style.height = '38px';
			}
			
				
				//thisone.style.backgroundImage = 'url(fishdown.jpg)';
				//thisone.style.width = '38px';
				//thisone.style.height = '116px';
				
			
			/*if (ydestination<yposition)
			{
				var ypos = yposition - (movespeed * (Math.abs(yposition-ydestination)/Math.abs(xposition-xdestination)));
				thisone.style.top = ypos + 'px';
				//thisone.style.backgroundImage = 'url(fishup.jpg)';
				//thisone.style.width = '38px';
				//thisone.style.height = '116px';
				
			}*/
		
			
				
				if(thisone.style.height == '0px' || remainingLife < 1){
					var bigDiv = document.getElementById('fishDiv');
					bigDiv.removeChild(thisone);
					//HTTP.get('updatefish.php?DeleteDivID=' + divid + '&Life=' + remainingLife + '&Speed=' + movespeed, Donothing, movespeed);
					//newFish();
				}
				else{
					$timeout(function(){
						moveFish(xdestination,ydestination,divid,remainingLife,movespeed);
					}, 50);
				}
				
			
			
			return true;
		}

		scope.addFood = addFood;
		scope.newFish = newFish;
		scope.moveFish = moveFish;
  };
}]);