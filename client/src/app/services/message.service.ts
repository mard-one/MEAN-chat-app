import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from "./auth.service";

@Injectable()
export class MessageService {

  domain = "http://localhost:8080"

  constructor(private http: Http, private authService: AuthService) { }

  sendMessage(message, reciever){
    this.authService.createAuthenticationHeader()
    return this.http.post(this.domain + "/message/sendMessage", {message: message, reciever: reciever}, this.authService.options).map(res=>res.json())
  }

}
