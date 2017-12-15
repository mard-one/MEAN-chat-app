import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  authToken
  options

  domain = "http://localhost:8080"

  constructor( private http: Http) {

   }
  createAuthenticationHeader(){
    this.loadToken()
    this.options = new RequestOptions({
      headers: new Headers({
        "Content-Type": 'application/json',
        "authorization": this.authToken
      })
    })
  }
  loadToken(){
    this.authToken = localStorage.getItem('token')
  }

  registerUser(user){
    return this.http.post(this.domain + "/authentication/register", user).map(res=>res.json())
  }

  login(user){
    return this.http.post(this.domain + "/authentication/login", user).map(res=>res.json())
  }

  storeUserData(token, username){
    localStorage.setItem('token', token);
    localStorage.setItem('username', JSON.stringify(username))
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
