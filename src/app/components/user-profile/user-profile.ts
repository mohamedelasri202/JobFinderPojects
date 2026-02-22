import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { Auth } from '../../services/auth/auth';
import { CommonModule } from '@angular/common'; 
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-user-profile',
  standalone: true, 
  imports: [
    CommonModule,         
    ReactiveFormsModule   
  ],
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css',
})
export class UserProfile  implements OnInit{

  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  
  profileForm!: FormGroup;
  user = this.authService.getCurrentUser(); 

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [this.user?.name, [Validators.required]],
      userName: [this.user?.userName, [Validators.required]],
      email: [this.user?.email, [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.profileForm.valid && this.user) {
      const updatedData = this.profileForm.value;
      
      
      this.authService.updateProfile(this.user.id, updatedData).subscribe({
        next: (updatedUser) => {
          toast.success('Profile updated successfully!');
          
          localStorage.setItem('user', JSON.stringify(updatedUser));
        },
        error: () => toast.error('Failed to update profile')
      });
    }
  }

}
