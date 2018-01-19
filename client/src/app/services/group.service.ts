import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

import { AuthService } from "./auth.service";

@Injectable()
export class GroupService {
  domain = "http://localhost:8080";

  constructor(private http: Http, private authService: AuthService) {}

  newGroup(groupFormData) {
    // console.log("groupFormData", groupFormData);

    if (groupFormData.avatar) {
      this.authService.createFileHeader();
      let formData = new FormData();
      // for(let i = 0; i>groupFormData.members.length; i++){}
      formData.append("name", groupFormData.name);
      formData.append("description", groupFormData.description);
      formData.append("groupAvatar", groupFormData.avatar);
      formData.append("members", JSON.stringify(groupFormData.members));
      return this.http
        .post(
          this.domain + "/group/newGroup",
          formData,
          this.authService.optionsFile
        )
        .map(res => res.json());
    } else {
      this.authService.createAuthenticationHeader();
      return this.http
        .post(
          this.domain + "/group/newGroup",
          groupFormData,
          this.authService.options
        )
        .map(res => res.json());
    }
  }
  editGroup(groupFormData) {
    // console.log("groupFormData", groupFormData);

    if (groupFormData.avatar) {
      // console.log('form with data');
      this.authService.createFileHeader();
      let formData = new FormData();
      formData.append("editGroupForm", groupFormData.avatar);
      formData.append("members", JSON.stringify(groupFormData.members));
      formData.append("currentGroupId", JSON.stringify(groupFormData.currentGroupId));
      return this.http
      .post(
        this.domain + "/group/editGroup",
        formData,
        this.authService.optionsFile
      )
      .map(res => res.json());
    } else {
      // console.log('form without data');
      this.authService.createAuthenticationHeader();
      return this.http
        .post(
          this.domain + "/group/editGroup",
          groupFormData,
          this.authService.options
        )
        .map(res => res.json());
    }
  }
}
