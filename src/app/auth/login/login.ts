import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { Validator } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../services/user/user';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

    private authService =inject(Auth)
    private userServie = inject(User)
    private router = inject(Router)
    loginForm!:FormGroup
  

    constructor(private fb:FormBuilder){
      this.loginForm = this.fb.group({
          email:['',[Validators.required,Validators.email]],
          password:['',[Validators.required,Validators.minLength(6)]]
      })
    }



    onSubmit(){
      if(this.loginForm.invalid){
         this.loginForm.markAllAsTouched();
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

                  const safeUser ={
                    email:user.email,
                    userName:user.userName,
                    name:user.name
                  }
                  // localStorage.setItem ('user',JSON.stringify(safeUser))
                  this.userServie.setUser(safeUser)
                  
                    
                  this.router.navigate(['/'])
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
