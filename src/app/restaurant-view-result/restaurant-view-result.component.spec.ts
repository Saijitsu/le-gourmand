import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantViewResultComponent } from './restaurant-view-result.component';

describe('RestaurantViewResultComponent', () => {
  let component: RestaurantViewResultComponent;
  let fixture: ComponentFixture<RestaurantViewResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantViewResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantViewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
