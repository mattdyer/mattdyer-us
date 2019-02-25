import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SpeciesService {

	public species;

  constructor(private http: HttpClient) {
    	/*this.getJSON().subscribe(data => {
	        this.species = data;
	        console.log(data)
	    });*/
	}

	public getSpecies(): Observable<any> {
        return this.http.get("../assets/species.json")
    }

    public getSpeciesByName(name){
    	return this.species[name];
    }

}
