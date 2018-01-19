import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  messageRegister;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }
  createForm() {
    this.formRegister = this.formBuilder.group({
      username: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          this.validateUsername()
        ])
      ],
      password: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(25)
        ])
      ]
    });
  }
  validateUsername() {
    return control => {
      const regExp = new RegExp(/^[a-zA-Z0-9.\-_$@*!]{0,20}$/);
      if (regExp.test(control.value)) {
        return null;
      } else {
        return { validateUsername: true };
      }
    }
  }

  onRegisterSubmit() {
    console.log("this.fromRegister", this.formRegister);
    if (this.formRegister.valid) {
      const user = {
        username: this.formRegister.get("username").value.toLowerCase(),
        password: this.formRegister.get("password").value.toLowerCase()
      };
      this.authService.registerUser(user).subscribe(data => {
        this.messageRegister = data;
        if (data.success) {
          setTimeout(() => {
            this.messageRegister = "";
            this.router.navigate(["/login"]);
          }, 1000);
        }
      });
      return false;
    }
  }

  ngOnInit() {}
}
