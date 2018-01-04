import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from "./auth.service";

@Injectable()
export class UserService {

  domain = "http://localhost:8080"

  constructor(private http: Http, private authService: AuthService) { }

  currentUser(){
    console.log("current user");
    this.authService.createAuthenticationHeader()
    return this.http.get(this.domain + "/user/currentUser", this.authService.options).map(res=>res.json())
  }


}