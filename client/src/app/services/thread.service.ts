import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from "./auth.service";


@Injectable()
export class ThreadService {
  domain = "http://localhost:8080";

  constructor(private http: Http, private authService: AuthService) {}

  getAllMessageThread() {
    this.authService.createAuthenticationHeader();
    return this.http
      .get(
        this.domain + "/thread/getAllMessageThread",
        this.authService.options
      )
      .map(res => res.json());
  }

  setCurrentThread(user) {
    // console.log("user", user)
    this.authService.createAuthenticationHeader();
    return this.http
      .post(
        this.domain + "/thread/setCurrentThread",
        user,
        this.authService.options
      )
      .map(res => res.json());
  }
  removeUnreadMessage(thread) {
    // console.log("thread", thread);
    return this.http
      .post(
        this.domain + "/thread/removeUnreadMessage",
        thread
      )
      .map(res => res.json());
  }
}
