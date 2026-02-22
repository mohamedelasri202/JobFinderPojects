import { Component, inject } from '@angular/core';
import { FollowService } from '../../services/follow/follow-service';
import { Follow } from '../../modules/job/follow.';
import { CommonModule, NgClass, AsyncPipe, DatePipe } from '@angular/common';
import { BehaviorSubject, switchMap } from 'rxjs';

@Component({
  selector: 'app-follow-list',
  standalone: true,
  imports: [CommonModule, NgClass, AsyncPipe, DatePipe],
  templateUrl: './follow-list.html'
})
export class FollowList {
  private followService = inject(FollowService); 

  private refresh$ = new BehaviorSubject<void>(undefined);
  follows$ = this.refresh$.pipe(
    switchMap(() => this.followService.getFollows())
  );

  updateStatus(follow: Follow, event: any) {
    const selectElement = event.target as HTMLSelectElement;
    const newStatus = selectElement.value;
    const updatedFollow = { ...follow, status: newStatus };

    this.followService.updateFollowStatus(updatedFollow).subscribe({
      next: () => {
        this.refresh$.next(); 
        console.log('Statut mis à jour !');
      },
      error: (err) => console.error('Erreur de mise à jour', err)
    });
  }

  deleteJob(id: string | number | undefined) {
    if (!id) return;

    if (confirm('Voulez-vous vraiment supprimer ce suivi ?')) {
      this.followService.deleteFollow(id).subscribe({
        next: () => {
          this.refresh$.next(); 
          console.log('Suivi supprimé');
        },
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }
}