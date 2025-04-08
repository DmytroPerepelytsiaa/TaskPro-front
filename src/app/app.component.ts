import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, EMPTY } from 'rxjs';

import { UsersService } from '@shared/auth/services';

@UntilDestroy()
@Component({
  selector: 'tp-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private usersService = inject(UsersService);
  private router = inject(Router);
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.usersService.getCurrentUser$()
        .pipe(
          catchError(() => {
            localStorage.removeItem('token');
            this.router.navigate(['welcome']);
            return EMPTY;
          }),
          untilDestroyed(this),
        )
        .subscribe();
    }
  }
}
