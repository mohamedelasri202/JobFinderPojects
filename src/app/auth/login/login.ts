import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Validator } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

    private authService =inject(Auth)
    loginForm!:FormGroup

    constructor(private fb:FormBuilder){
      this.loginForm = this.fb.group({
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,Validators.minLength(6)]]
      })
    }


    onSubmit(){
      if(this.loginForm.invalid){
         this.loginForm.markAllAsTouched
          return ;
        }else{
          
        }
    }


  

}
