import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import "rxjs/add/operator/map";

import { AuthService } from "./auth.service";

@Injectable()
export class GroupService {
  domain = "http://localhost:8080";

  constructor(private http: Http, private authService: AuthService) {}

  newGroup(groupFormData) {
    console.log("groupFormData", groupFormData);
    this.authService.createFileHeader();
    let formData = new FormData();
    formData.append("name", groupFormData.name);
    formData.append("description", groupFormData.description);
    formData.append("groupAvatar", groupFormData.avatar);
    formData.append("members", groupFormData.members);
    return this.http
      .post(
        this.domain + "/group/newGroup",
        formData,
        this.authService.optionsFile
      )
      .map(res => res.json());
  }
}
