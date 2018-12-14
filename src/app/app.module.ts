import { PlaceService } from './services/place.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapViewComponent } from './restaurants-view/map-view/map-view.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RestaurantsListComponent } from './restaurants-view/restaurants-list/restaurants-list.component';
import { RestaurantReviewsComponent } from './restaurants-view/restaurant-reviews/restaurant-reviews.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { RestaurantsViewComponent } from './restaurants-view/restaurants-view.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'restaurants-view', component: RestaurantsViewComponent },
  { path: '', redirectTo: 'restaurants-view', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'restaurants-view' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapViewComponent,
    RestaurantsListComponent,
    RestaurantReviewsComponent,
    FourOhFourComponent,
    SignupComponent,
    SigninComponent,
    RestaurantsViewComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXoe_E_QM1YIjMO22IU28UCqX1HI7Uets',
      libraries: ['places']
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService, PlaceService, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }


