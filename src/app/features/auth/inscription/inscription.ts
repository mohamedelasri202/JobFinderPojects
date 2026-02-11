import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule,Validator, Validators } from '@angular/forms';
import { Auth } from '../../../services/auth/auth';
import { email, required } from '@angular/forms/signals';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  imports: [ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {

  private authservice =inject(Auth)
  private router =inject(Router)
  registerForm!:FormGroup

    constructor(private fb: FormBuilder) {}


    ngOnInit():void{
      this.registerForm =this.fb.group({
        userName:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{3,}$/)]],
        name:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{3,}$/)]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      })

    }
  
  onSubmit(){
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

     const user = this.registerForm.value
     this.authservice.register(user).subscribe({
      next:(Response)=>{
        this.registerForm.reset();
        this.router.navigate(['/login'])

      },
      error:(err)=>{
        console.error('Registration failed', err)
      }
     })

  }

}
