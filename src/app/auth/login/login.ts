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
           const email = this.loginForm.value.email
          const password = this.loginForm.value.password
          
          this.authService.login(email).subscribe({
            next:(Response :any[]) =>{
              if(Response.length>0){
                const user =Response[0];
                if(user.password == password){
                  console.log("login success")
                  }else {
                    console.log("password is inccorect")
                  }
              }else{
                console.error("no user was found")
              } 
            }

          });

        }
    }


  

}
