import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { AuthService } from "./auth.service";

@Injectable()
export class UserService {
  domain = "http://localhost:8080";

  constructor(private http: Http, private authService: AuthService) {}

  currentUser() {
    console.log("current user");
    this.authService.createAuthenticationHeader();
    return this.http
      .get(this.domain + "/user/currentUser", this.authService.options)
      .map(res => res.json());
  }
  changeAvatar(inputEvent) {
    if (inputEvent && inputEvent.files && inputEvent.files.length) {
      let file = inputEvent.files[0];
      let formData = new FormData();
      formData.append("inputAvatar", file);
      this.authService.createFileHeader();
      return this.http
        .post(
          this.domain + "/user/changeAvatar",
          formData,
          this.authService.optionsFile
        )
        .map(res => res.json());
    } else {
      let chosenDefaultAvatarUrl = inputEvent,
        avatarName = chosenDefaultAvatarUrl.substring(chosenDefaultAvatarUrl.lastIndexOf("/"), chosenDefaultAvatarUrl.length),
        avatarJson = { avatarName: avatarName };
      this.authService.createAuthenticationHeader();
      return this.http
        .post(
          this.domain + "/user/changeAvatar",
          avatarJson,
          this.authService.options
        )
        .map(res => res.json());
    }
  }
}
