import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreDevtoolsModule } from "@ngrx/store-devtools"

import { reducers, effects } from "./store"

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { AppRoutingModule } from './app-routing.module';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { ContactService } from './services/contact.service';
import { ThreadService } from './services/thread.service';
import { MessageService } from './services/message.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ChatroomComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument({
      maxAge: 25 //  Retains last 25 states
    })
  ],
  providers: [
    ApiService,
    AuthService,
    ContactService,
    ThreadService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
