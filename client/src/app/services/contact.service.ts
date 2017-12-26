import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from "./auth.service";

@Injectable()
export class ContactService {

  domain = "http://localhost:8080"

  constructor(private http: Http, private authService: AuthService) { }

  addContact(username){
    this.authService.createAuthenticationHeader()
    console.log("username", username)
    return this.http.post(this.domain + "/contact/addContact", username, this.authService.options ).map(res=>res.json())
  }
  getAllContacts(){
    this.authService.createAuthenticationHeader()
    return this.http.get(this.domain + "/contact/getAllContacts", this.authService.options ).map(res=>res.json())
  }

}
