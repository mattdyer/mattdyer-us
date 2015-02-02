'use strict';

angular.module('myApp.lifegame-directive', [])

.directive('appLifegame', [function() {
  return function(scope, elm, attrs) {
    /*var NextDivID = 1;
	var GameHeight = 600;
	var GameWidth = 600;
	var Paused = false;

	var Species = new Object();
	var Plant = new Object();
	Plant['Speed'] = 0;
	Plant['BurstSpeed'] = 0;
	Plant['Life'] = 5;
	Plant['Width'] = 1;
	Plant['Height'] = 1;
	Plant['AdultWidth'] = 30;
	Plant['AdultHeight'] = 30;
	Plant['ImagePath'] = '/life/plant.gif';
	Plant['FoodType'] = new Array();
	Plant['FoodType'][0] = 'None';
	Plant['ReproduceLife'] = 30;
	Plant['DeadLife'] = 10;
	Plant['PredatorType'] = new Array();
	Plant['PredatorType'][0] = 'Bug';
	Plant['SiteDistance'] = 100;
	Plant['LifePerTurn'] = 0.0001;
	Plant['LifeSpan'] = 6000;
	Plant['GrowthRate'] = 0.01;
	Plant['ReproductionLifeCost'] = 15;
	Plant['RotationAdjustment'] = 0;
	var Bug = new Object();
	Bug['Speed'] = 1;
	Bug['BurstSpeed'] = 2;
	Bug['Life'] = 20;
	Bug['Width'] = 1;
	Bug['Height'] = 1;
	Bug['AdultWidth'] = 10;
	Bug['AdultHeight'] = 15;
	Bug['ImagePath'] = '/life/bug.jpg';
	Bug['FoodType'] = new Array();
	Bug['FoodType'][0] = 'Plant';
	Bug['ReproduceLife'] = 50;
	Bug['DeadLife'] = 10;
	Bug['PredatorType'] = new Array();
	Bug['PredatorType'][0] = 'Fish';
	Bug['SiteDistance'] = 50;
	Bug['LifePerTurn'] = -0.0001;
	Bug['LifeSpan'] = 5000;
	Bug['GrowthRate'] = 0.01;
	Bug['ReproductionLifeCost'] = 0;
	Bug['RotationAdjustment'] = 90;
	var Fish = new Object();
	Fish['Speed'] = 1.1;
	Fish['BurstSpeed'] = 3;
	Fish['Life'] = 20;
	Fish['Width'] = 15;
	Fish['Height'] = 5;
	Fish['AdultWidth'] = 116;
	Fish['AdultHeight'] = 38;
	Fish['ImagePath'] = '/life/fish.gif';
	Fish['FoodType'] = new Array();
	Fish['FoodType'][0] = 'Bug';
	Fish['ReproduceLife'] = 200;
	Fish['DeadLife'] = 10;
	Fish['PredatorType'] = new Array();
	Fish['PredatorType'][0] = 'None';
	Fish['SiteDistance'] = 200;
	Fish['LifePerTurn'] = -0.0001;
	Fish['LifeSpan'] = 10000;
	Fish['GrowthRate'] = 0.01;
	Fish['ReproductionLifeCost'] = 15;
	Fish['RotationAdjustment'] = 0;

	

	Species['Bug'] = Bug;
	Species['Fish'] = Fish;
	Species['Plant'] = Plant;

	var AnimalInfo = new Object();

	Object.find = function(ary, element){
		for(var i=0; i<ary.length; i++){
			if(ary[i] == element){
				return true;
			}
		}
		return false;
	}

	Object.filter = function(fun , thisp)
	  {
		var len = this.length;
		if (typeof fun != "function")
		  throw new TypeError();

		var res = new Object();
		var thisp = arguments[1];
		for (var i = 0; i < len; i++)
		{
		  if (i in this)
		  {
			var val = this[i]; // in case fun mutates this
			if (fun.call(thisp, val, i, this))
			  res.push(val);
		  }
		}

		return res;
	  };

	function TogglePause(){
		if(Paused){
			Paused = false;
			document.getElementById('PauseButton').innerHTML = 'Pause';
		}else{
			Paused = true;
			document.getElementById('PauseButton').innerHTML = 'Play';
		}
	}

	function Start(){
		GameArea = elm;
		//TimeCell = document.getElementById('TimeCell');
		editingAnimal = 0;
		var ControlArea = document.getElementById('ControlCell');
		ControlArea.innerHTML = '';
		for(Type in Species){
			ControlArea.innerHTML+='<div><button onclick="AddAnimal(\'' + Type + '\',0,0,true,false)">Add ' + Type + '</button> <button onclick="EditType(\'' + Type + '\');">Edit ' + Type + '</button> <span id="' + Type + 'Count">0</span></div>';
		}
	}

	function EditType(Type){
		
		EditForm = document.getElementById('SpeciesEditForm');
		if(EditForm){
			EditForm.parentNode.removeChild(EditForm);
		}
		
		var SpeciesEdit = document.createElement('div');
		GameArea.appendChild(SpeciesEdit);
		SpeciesEdit.id = 'SpeciesEditForm';
		SpeciesEdit.style.position = 'absolute';
		SpeciesEdit.style.top = '4px';
		SpeciesEdit.style.left = '4px';
		SpeciesEdit.style.zIndex = 1000;
		SpeciesEdit.style.backgroundColor = 'white';
		SpeciesEdit.style.padding = '4px';
		SpeciesEdit.style.border = '1px solid black';
		for(property in Species[Type]){
			if(typeof Species[Type][property] == 'number' | typeof Species[Type][property] == 'string' | typeof Species[Type][property] == 'object'){
				var nextLabel = document.createElement('span');
				nextLabel.innerHTML = property + ':';
				SpeciesEdit.appendChild(nextLabel);
				var nextInput = document.createElement('input');
				nextInput.type = 'text';
				nextInput.name = property;
				nextInput.id = property;
				if(typeof Species[Type][property] == 'number' | typeof Species[Type][property] == 'string'){
					nextInput.value = Species[Type][property];
				}
				if(typeof Species[Type][property] == 'object'){
					for(thing in Species[Type][property]){
						nextInput.value += Species[Type][property][thing];
						if(thing + 1 < Species[Type][property].length){
							nextInput.value += ',';
						}
					}
				}
				SpeciesEdit.appendChild(nextInput);
				var nextBreak = document.createElement('br');
				SpeciesEdit.appendChild(nextBreak);
			}
		}
		
		editingType = Type;
		
		var nextInput = document.createElement('input');
		nextInput.type = 'button';
		nextInput.name = 'Finish';
		nextInput.value = 'Save ' + Type;
		nextInput.onclick = FinishEditingType;
		SpeciesEdit.appendChild(nextInput);
		
	}

	function FinishEditingType(){
		for(property in Species[editingType]){
			if(typeof Species[editingType][property] == 'number' | typeof Species[Type][property] == 'string' | typeof Species[Type][property] == 'object'){
				var inputField = document.getElementById(property);
				
				if(typeof Species[Type][property] == 'string'){
					Species[editingType][property] = inputField.value;
				}
				if(typeof Species[Type][property] == 'number'){
					Species[editingType][property] = inputField.value * 1;
				}
				if(typeof Species[Type][property] == 'object'){
					Species[editingType][property] = inputField.value.split(',');
				}
			}
		}
		
		EditForm = document.getElementById('SpeciesEditForm');
		EditForm.parentNode.removeChild(EditForm);
	}

	function AddAnimal(Type,Top,Left,RandomPosition,HasParent,ParentID){
		document.getElementById(Type + 'Count').innerHTML++;
		var NewAnimal = document.createElement('div');
		var NewAnimalLife = document.createElement('div');
		var ThisSpecies = Species[Type];
		
		if(HasParent)
		{
			var Parent = AnimalInfo[ParentID];
			var Mutation = (Math.random() * 0.02) - 0.01;
		}
		else
		{
			var Parent = Species[Type];
			var Mutation = 0;
		}
		
		NewAnimalID = NextDivID;
		NextDivID++;
		
		NewAnimal.id = Type + NewAnimalID;
		NewAnimal.style.height = ThisSpecies['Height'] + 'px';
		NewAnimal.style.width = ThisSpecies['Width'] + 'px';
		NewAnimal.style.position = 'absolute';
		NewAnimal.style.top = Top + 'px';
		NewAnimal.style.left = Left + 'px';
		if(RandomPosition)
		{
			var RandomTop = Math.floor(Math.random() * GameHeight);
			var RandomLeft = Math.floor(Math.random() * GameWidth);
			
			NewAnimal.style.top = RandomTop + 'px';
			NewAnimal.style.left = RandomLeft + 'px';
		}
		NewAnimal.innerHTML = '<img src="' + ThisSpecies['ImagePath'] + '" id="' + Type + NewAnimalID + 'Image" border="0" alt="' + ThisSpecies['ImagePath'] + '" style="width:' + ThisSpecies['Width'] + 'px; height:' + ThisSpecies['Height'] + 'px;">';
		NewAnimal.onclick = showAnimalInfo;
		GameArea.appendChild(NewAnimal);
		NewAnimalInfo = new Object();
		NewAnimalInfo['ID'] = Type + NewAnimalID;
		NewAnimalInfo['Type'] = Type;
		NewAnimalInfo['Life'] = ThisSpecies['Life'];
		NewAnimalInfo['Speed'] = Parent['Speed'] * (1 + Mutation);
		NewAnimalInfo['BurstSpeed'] = Parent['BurstSpeed'] * (1 + Mutation);
		NewAnimalInfo['Top'] = Top;
		NewAnimalInfo['Left'] = Left;
		if(RandomPosition)
		{
			NewAnimalInfo['Top'] = RandomTop;
			NewAnimalInfo['Left'] = RandomLeft;
		}
		NewAnimalInfo['Width'] = ThisSpecies['Width'];
		NewAnimalInfo['Height'] = ThisSpecies['Height'];
		NewAnimalInfo['LifeSpan'] = ThisSpecies['LifeSpan'];
		NewAnimalInfo['GrowthRate'] = ThisSpecies['GrowthRate'];
		NewAnimalInfo['Dead'] = false;
		NewAnimalInfo['LeftMultiplier'] = Math.floor(Math.random() * 3) - 1;
		NewAnimalInfo['TopMultiplier'] = Math.floor(Math.random() * 3) - 1;
		AnimalInfo[Type + NewAnimalID] = NewAnimalInfo;
		
		
		
		var AnimalImage = document.getElementById(Type + NewAnimalID + 'Image');
		
		MoveAnimal(NewAnimal,AnimalImage);
	}

	function calculateRotation(newLeft,oldLeft,newTop,oldTop,Adjustment){
		
		var NewRotation = Math.atan(Math.abs(newTop - oldTop) / Math.abs(newLeft - oldLeft));
		NewRotation = NewRotation * (180 / Math.PI);
		
		if(newTop > oldTop){
			if(newLeft > oldLeft){
				//NewRotation += 180;
				//$(fish).html('down right ' + NewRotation);
			}else{
				NewRotation = 180 - NewRotation;
				//$(fish).html('down left ' + NewRotation);
			}
		}else{
			if(newLeft > oldLeft){
				NewRotation = 360 - NewRotation;
				//$(fish).html('up right ' + NewRotation);
			}else{
				NewRotation = NewRotation + 180;
				//$(fish).html('up left ' + NewRotation);					
			}
		}
		
		return NewRotation + Adjustment;
	}

	function MoveAnimal(ThisAnimal,ThisAnimalImage){
		
		if(!Paused){
			//TimeCell.innerHTML++;
			if(AnimalInfo[ThisAnimal.id])
			{
				var ThisAnimalInfo = AnimalInfo[ThisAnimal.id];
				var ThisSpeciesInfo = Species[ThisAnimalInfo['Type']];
				var ThisAnimalArea = ThisAnimalInfo['Height'] * ThisAnimalInfo['Width'];
				
				var newTime = new Date().getTime();
				
				if(newTime % 20 == 0){
					ThisAnimalInfo['LeftMultiplier'] = Math.floor(Math.random() * 3) - 1;
					ThisAnimalInfo['TopMultiplier'] = Math.floor(Math.random() * 3) - 1;
				}
				
				var NewLeft = ThisAnimalInfo['Left'] + (ThisAnimalInfo['Speed'] * ThisAnimalInfo['LeftMultiplier']);
				var NewTop = ThisAnimalInfo['Top'] + (ThisAnimalInfo['Speed'] * ThisAnimalInfo['TopMultiplier']);
				
				
				
				ThisAnimalInfo['Life']+=ThisSpeciesInfo['LifePerTurn'] * ThisAnimalArea;
				ThisAnimalInfo['LifeSpan']--;
				
				if(ThisAnimalInfo['Height'] < ThisSpeciesInfo['AdultHeight'])
				{
					ThisAnimalInfo['Height']+=ThisAnimalInfo['GrowthRate'];
					ThisAnimal.style.height = ThisAnimalInfo['Height'] + 'px';
					ThisAnimalImage.style.height = ThisAnimalInfo['Height'] + 'px';
				}
				
				if(ThisAnimalInfo['Width'] < ThisSpeciesInfo['AdultWidth'])
				{
					ThisAnimalInfo['Width']+=ThisAnimalInfo['GrowthRate'];
					ThisAnimal.style.width = ThisAnimalInfo['Width'] + 'px';
					ThisAnimalImage.style.width = ThisAnimalInfo['Width'] + 'px';
					ThisAnimal.style.zIndex =  Math.round(ThisAnimalInfo['Width']);
				}
				
				
				if (ThisAnimalInfo['Life'] <= 0 | ThisAnimalInfo['LifeSpan'] <= 0){
					ThisAnimalInfo['Dead'] = true;
				}
				
				
				if(!ThisAnimalInfo['Dead'])
				{
					
					if(ThisAnimalInfo['Life'] >= ThisSpeciesInfo['ReproduceLife'])
					{
						ThisAnimalInfo['Life']-= ThisSpeciesInfo['Life'];
						ThisAnimalInfo['Life']-= ThisSpeciesInfo['ReproductionLifeCost'];
						var ReproduceTop = ThisAnimalInfo['Top'] + Math.floor((Math.random() * (ThisAnimalInfo['Height'] * 6)) - (ThisAnimalInfo['Height'] * 3));
						var ReproduceLeft = ThisAnimalInfo['Left'] + Math.floor((Math.random() * (ThisAnimalInfo['Width'] * 6)) - (ThisAnimalInfo['Width'] * 3));
						var ReproduceType = ThisAnimalInfo['Type'];
						if(ReproduceLeft > GameWidth)
						{
							ReproduceLeft = ReproduceLeft - GameWidth;
						}
						if(ReproduceLeft < 0)
						{
							ReproduceLeft = GameWidth + ReproduceLeft;
						}
						if(ReproduceTop > GameHeight)
						{
							ReproduceTop = ReproduceTop - GameHeight;
						}
						if(ReproduceTop < 0)
						{
							ReproduceTop = GameHeight + ReproduceTop;
						}
						AddAnimal(ReproduceType,ReproduceTop,ReproduceLeft,false,true,ThisAnimal.id);
					}
					
					if(ThisAnimalInfo['Speed'] > 0 || ThisAnimalInfo['BurstSpeed'] > 0){
						
						var ClosestFoodDistance = 2000;
						var ClosestFoodID = '';
						for(var AnimalIDs in AnimalInfo){
							var ThisFood = AnimalInfo[AnimalIDs];
							var ThisFoodArea = ThisFood['Height'] * ThisFood['Width'];
							if(Object.find(ThisSpeciesInfo['FoodType'],ThisFood['Type']) && ThisAnimalArea > ThisFoodArea && AnimalIDs != ThisAnimal.id){
								var FoodDistance = Math.sqrt(Math.pow(ThisAnimalInfo['Left']-ThisFood['Left'],2) + Math.pow(ThisAnimalInfo['Top']-ThisFood['Top'],2));
								if (FoodDistance < ClosestFoodDistance){
									ClosestFoodDistance = FoodDistance;
									ClosestFoodID = ThisFood['ID'];
								}
							}
						}
						
						
						var ClosestPredatorDistance = 2000;
						var ClosestPredatorID = '';
						for(var AnimalIDs in AnimalInfo){
							var ThisPredator = AnimalInfo[AnimalIDs];
							var ThisPredatorArea = ThisPredator['Height'] * ThisPredator['Width'];
							if(Object.find(ThisSpeciesInfo['PredatorType'],ThisPredator['Type']) && ThisPredatorArea > ThisAnimalArea && !ThisPredator['Dead'] && AnimalIDs != ThisAnimal.id){
								var PredatorDistance = Math.sqrt(Math.pow(ThisAnimalInfo['Left']-ThisPredator['Left'],2) + Math.pow(ThisAnimalInfo['Top']-ThisPredator['Top'],2));
								if (PredatorDistance < ClosestPredatorDistance){
									ClosestPredatorDistance = PredatorDistance;
									ClosestPredatorID = ThisPredator['ID'];
								}
							}
						}
						
						
						if(ClosestPredatorDistance < ThisSpeciesInfo['SiteDistance'] | ClosestFoodDistance < ThisSpeciesInfo['SiteDistance'])
						{
							var MoveSpeed = ThisAnimalInfo['BurstSpeed'];
						}
						else
						{
							var MoveSpeed = ThisAnimalInfo['Speed'];
						}
						
						
						if(AnimalInfo[ClosestFoodID] && ClosestFoodDistance < ThisSpeciesInfo['SiteDistance'])
						{
							var ClosestFoodInfo = AnimalInfo[ClosestFoodID];
						
						
							
							if(ClosestFoodDistance < 5){
								ClosestFoodSpeciesInfo = Species[ClosestFoodInfo['Type']];
								ThisAnimalInfo['Life']+=ClosestFoodInfo['Life'];
								ClosestFoodInfo['Dead'] = true;
								RemoveAnimal(ClosestFoodID);
							}
						
						
							ThisAnimalInfo['Life']-= MoveSpeed * 0.01;
							var NewLeft = ThisAnimalInfo['Left'] + ((ClosestFoodInfo['Left']-ThisAnimalInfo['Left']) * MoveSpeed/ClosestFoodDistance);
							
							var NewTop = ThisAnimalInfo['Top'] + ((ClosestFoodInfo['Top']-ThisAnimalInfo['Top']) * MoveSpeed/ClosestFoodDistance);
							
							
							
						}
						
						
						if(AnimalInfo[ClosestPredatorID] && ClosestPredatorDistance < ThisSpeciesInfo['SiteDistance'])
						{
							var ClosestPredatorInfo = AnimalInfo[ClosestPredatorID];
							
							
							ThisAnimalInfo['Life']-= MoveSpeed * 0.005;
							var NewLeft = ThisAnimalInfo['Left'] - ((ClosestPredatorInfo['Left']-ThisAnimalInfo['Left']) * MoveSpeed/ClosestPredatorDistance);
							
						
							var NewTop = ThisAnimalInfo['Top'] - ((ClosestPredatorInfo['Top']-ThisAnimalInfo['Top']) * MoveSpeed/ClosestPredatorDistance);
							
							
						}
						
						if(NewLeft <= 0)
						{
							NewLeft = GameWidth + NewLeft;
						}
						
						if(NewLeft >= GameWidth)
						{
							NewLeft = NewLeft - GameWidth;
						}
						
						if(NewTop <= 0)
						{
							NewTop = GameHeight + NewTop;
						}
						
						if(NewTop >= GameHeight)
						{
							NewTop = NewTop - GameHeight;
						}
						
						var NewRotation = calculateRotation(NewLeft,AnimalInfo[ThisAnimal.id]['Left'],NewTop,AnimalInfo[ThisAnimal.id]['Top'],ThisSpeciesInfo['RotationAdjustment'])//Math.tan(Math.abs(NewTop - AnimalInfo[ThisAnimal.id]['Top']) / Math.abs(NewLeft - AnimalInfo[ThisAnimal.id]['Left']));
						
						ThisAnimalImage.style.MozTransform = 'rotate(' + NewRotation + 'deg)';
						ThisAnimalImage.style.WebkitTransform = 'rotate(' + NewRotation + 'deg)';
						
						ThisAnimal.style.left = NewLeft + 'px';
						AnimalInfo[ThisAnimal.id]['Left'] = NewLeft;
						ThisAnimal.style.top = NewTop + 'px';
						AnimalInfo[ThisAnimal.id]['Top'] = NewTop;
						
					}
					
					AnimalInfo.Timeout = setTimeout(function(){MoveAnimal(ThisAnimal,ThisAnimalImage);},100);
				}
				else
				{
					ThisAnimal['Life'] = ThisSpeciesInfo['DeadLife'];
					AnimalInfo.DeadTimeout = setTimeout('RemoveAnimal(\'' + ThisAnimal.id + '\')',20000);
				}
			}
		}else{
			AnimalInfo.PauseTimeout = setTimeout(function(){MoveAnimal(ThisAnimal,ThisAnimalImage);},1000);
		}
	}

	function RemoveAnimal(AnimalID){
		
		ThisAnimalInfo = AnimalInfo[AnimalID];
		var Type = ThisAnimalInfo['Type'];
		document.getElementById(Type + 'Count').innerHTML--;
		delete AnimalInfo[AnimalID];
		var ThisAnimal = document.getElementById(AnimalID);
		GameArea.removeChild(ThisAnimal);
	}

	function showAnimalInfo(){
		
			EditForm = document.getElementById('SpeciesEditForm');
			if(EditForm){
				EditForm.parentNode.removeChild(EditForm);
			}
			
			if(document.getElementById(editingAnimal)){
				document.getElementById(editingAnimal).style.border = 'none';
			}
			
			this.style.border = '1px solid red';
			
			var AnimalEdit = document.createElement('div');
			GameArea.appendChild(AnimalEdit);
			AnimalEdit.id = 'SpeciesEditForm';
			AnimalEdit.style.position = 'absolute';
			AnimalEdit.style.top = '4px';
			AnimalEdit.style.left = '4px';
			AnimalEdit.style.zIndex = 1000;
			AnimalEdit.style.backgroundColor = 'white';
			AnimalEdit.style.padding = '4px';
			AnimalEdit.style.border = '1px solid black';
			for(property in AnimalInfo[this.id]){
				if(typeof AnimalInfo[this.id][property] == 'number'){
					var nextLabel = document.createElement('span');
					nextLabel.innerHTML = property + ':';
					AnimalEdit.appendChild(nextLabel);
					var nextInput = document.createElement('input');
					nextInput.type = 'text';
					nextInput.name = property;
					nextInput.id = property;
					nextInput.value = AnimalInfo[this.id][property];
					AnimalEdit.appendChild(nextInput);
					var nextBreak = document.createElement('br');
					AnimalEdit.appendChild(nextBreak);
				}
			}
			
			editingAnimal = this.id;
			
			var nextInput = document.createElement('input');
			nextInput.type = 'button';
			nextInput.name = 'Finish';
			nextInput.value = 'Save Animal';
			nextInput.onclick = FinishEditingAnimal;
			AnimalEdit.appendChild(nextInput);
		
	}

	function FinishEditingAnimal(){
		
		for(property in AnimalInfo[editingAnimal]){
			if(typeof AnimalInfo[editingAnimal][property] == 'number'){
				var inputField = document.getElementById(property);
				AnimalInfo[editingAnimal][property] = inputField.value * 1;
			}
		}
		
		document.getElementById(editingAnimal).style.border = 'none';
		EditForm = document.getElementById('SpeciesEditForm');
		EditForm.parentNode.removeChild(EditForm);
		editingAnimal = 0;
	}

	


	Start();*/
  };
}]);