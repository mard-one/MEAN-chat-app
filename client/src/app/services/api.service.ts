import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from "./auth.service";

@Injectable()
export class ApiService {

  domain = "http://localhost:8080"

  constructor(private http: Http, private authService: AuthService) { }

  pageInit(){
    this.authService.createAuthenticationHeader()
    return this.http.get(this.domain + "/api/pageInit", this.authService.options).map(res=>res.json())
  }


}
