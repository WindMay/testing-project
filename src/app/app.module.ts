import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TestingCrudComponent} from './testing-crud/testing-crud.component';
import {HttpClientModule} from '@angular/common/http';
import {FakeApiService} from '../assets/services/fake-api.service';

@NgModule({
  declarations: [
    AppComponent,
    TestingCrudComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ FakeApiService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
