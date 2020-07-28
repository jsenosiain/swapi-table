import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { load } from './store/people/people.actions';
import { PeopleEffects } from './store/people/people.effects';
import { peopleReducer } from './store/people/people.reducer';
import { SwapiModule } from './swapi/swapi.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    EffectsModule.forRoot([PeopleEffects]),
    FontAwesomeModule,
    HttpClientModule,
    MatPaginatorModule,
    StoreModule.forRoot({
      people: peopleReducer,
    }),
    SwapiModule,

    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store) => () => store.dispatch(load()),
      multi: true,
      deps: [Store],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
