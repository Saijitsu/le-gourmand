import { TestBed } from '@angular/core/testing';

import { PlaceService } from './place.service';

describe('PlacesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PlaceService = TestBed.get(PlaceService);
    expect(service).toBeTruthy();
  });
});
