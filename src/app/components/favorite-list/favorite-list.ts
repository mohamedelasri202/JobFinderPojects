import { Component, inject } from '@angular/core';
import { favoriteService } from '../../services/favorite/favorite';
import { favorite } from '../../modules/job/favorite';
import { CommonModule, AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-favorite-list',
  standalone: true,
  imports: [CommonModule, AsyncPipe, DatePipe],
  templateUrl: './favorite-list.html',
  styleUrl: './/favorite-list.css'
})
export class FavoriteList {
  private favService = inject(favoriteService); 

  private refresh$ = new BehaviorSubject<void>(undefined);
  favorites$ = this.refresh$.pipe(
    switchMap(() => this.favService.getFavorites())
  );

  deleteFavorite(id: string | number | undefined) {
    if (!id) return;

    if (confirm('Supprimer de vos favoris ?')) {
      this.favService.deleteFavorite(id).subscribe({
        next: () => {
          this.refresh$.next(); 
          console.log('Deleted successfully');
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Erreur lors de la suppression');
        }
      });
    }
  }
}