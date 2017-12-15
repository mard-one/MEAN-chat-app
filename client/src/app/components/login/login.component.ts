import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  formLogin: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.createForm()
  }

  createForm(){
    this.formLogin = this.formBuilder.group({
      username: '',
      password: ''
    })
  }

  onLoginSubmit(){
    const user = {
      username: this.formLogin.get('username').value,
      password: this.formLogin.get('password').value
    }
    this.authService.login(user).subscribe(data=>{
      if(data.success){
        this.authService.storeUserData(data.token, data.user)
        setTimeout(()=>{
          this.router.navigate(['/chatroom'])
        })
      }
    })
    return false
  }


  ngOnInit() {

  }



}
