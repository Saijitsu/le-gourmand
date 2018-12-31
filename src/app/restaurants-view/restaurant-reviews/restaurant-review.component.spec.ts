import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantReviewComponent } from './restaurant-review.component';

describe('RestaurantReviewsComponent', () => {
  let component: RestaurantReviewComponent;
  let fixture: ComponentFixture<RestaurantReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
