import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantAddReviewComponent } from './restaurant-add-review.component';

describe('RestaurantAddReviewComponent', () => {
  let component: RestaurantAddReviewComponent;
  let fixture: ComponentFixture<RestaurantAddReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantAddReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantAddReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
