import { Injectable } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  public service: google.maps.places.PlacesService;

  constructor(public mapAPIloader: MapsAPILoader) {
  }

  getRestaurants() {
    return this.mapAPIloader.load().then(() => {
      const service = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementsByTagName('agm-map')[0]);
      console.log(service); // Doit return tableau des restaurants
    });
  }
}

// Avant rectifications:
/*
import { Injectable } from '@angular/core';
// import { GoogleMap } from '@agm/core/services/google-maps-types';
// import { promise } from 'protractor';
import { MapsAPILoader } from '@agm/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesServiceService {


 // private mapPromise: Promise<GoogleMap>;
 // private mapResolver: (value?: GoogleMap | PromiseLike<GoogleMap>) => void; // va etre sauvegardée (type de retour: rien <void>)
 // private map: GoogleMap;

  constructor(public mapAPIloader: MapsAPILoader) {
   /* this.mapPromise = new Promise<GoogleMap>((resolve, reject) => {
      this.mapResolver = resolve; // sauvegarde ici ce qui est dans resolve
    });
  }

  // Va s'exécuter en 1er
  setMap(value: GoogleMap) {
    this.mapResolver(value);  // fonction (1)
  }

  getMap() {
    if (this.map != null) {
      return Promise.resolve(this.map); // exécute de suite Then si on l'a déja.
    } else {
      return this.mapPromise.then((map) => {
        // then> 12-15 déclenche l'asy (avec mapResolver, contenu dans le then, fonction avec map en argument)(2)
        this.map = map;
        return this.map;
      });
    }
  }

  getRestaurants() {
    return this.mapAPIloader.load().then(() => {
      const service = new google.maps.places.PlacesService(<HTMLDivElement>document.getElementsByTagName('agm-map')[0]);
      console.log(service); // doit return tableau des restaurants
    });
  }
}*/
