import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormGroup, FormsModule,Validator, Validators } from '@angular/forms';
import { Auth } from '../../services/auth/auth';
import { email, required } from '@angular/forms/signals';

@Component({
  selector: 'app-inscription',
  imports: [FormsModule],
  templateUrl: './inscription.html',
  styleUrl: './inscription.css',
})
export class Inscription {

//   private authservice =inject(Auth)
//   registerForm!:FormGroup

//     constructor(private fb: FormBuilder) {}


//     ngOnInit():void{
//       this.registerForm =this.fb.group({
//         userName:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9_]{3,}$/)]],
//         email:['',[Validators.required,Validators.email]],
//         password:['',[Validators.required,Validators.minLength(6)]]
//       })

//     }



    
//   onSubmet(){
//     if(this.registerForm.invalid){
//       this.registerForm.markAllAsTouched();
//     }

//   }

}
