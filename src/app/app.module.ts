import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { StoreModule } from '@ngrx/store';
import { AppReducer } from './app.reducer';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.provideStore({ messages: AppReducer })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
