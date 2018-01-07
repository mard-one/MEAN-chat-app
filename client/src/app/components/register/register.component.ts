import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router"


import { AuthService } from '../../services/auth.service'

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formRegister: FormGroup;
  message;
  messageClass;
  blocked = false;
  

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.createForm();
  }
  createForm() {
    this.formRegister = this.formBuilder.group({
      username: "",
      password: ""
    });
  }

  onRegisterSubmit() {
    const user = {
      username: this.formRegister.get("username").value,
      password: this.formRegister.get("password").value
    };
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        setTimeout(() => {
          this.router.navigate(["/login"]);
        });
      }
    });
    return false;
  }

  ngOnInit() {}
}
