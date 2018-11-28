import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MapViewComponent } from './map-view/map-view.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { RestaurantListComponent } from './restaurant-view/restaurant-list/restaurant-list.component';
import { RestaurantReviewsComponent } from './restaurant-view/restaurant-reviews/restaurant-reviews.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MapViewComponent,
    RestaurantListComponent,
    RestaurantReviewsComponent,
    FourOhFourComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatIconModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCXoe_E_QM1YIjMO22IU28UCqX1HI7Uets'
    }),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }


