import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { catchError, EMPTY } from 'rxjs';

import { UserService } from '@shared/auth/services';

@UntilDestroy()
@Component({
  selector: 'tp-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private userService = inject(UserService);
  private router = inject(Router);
  
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this.userService.getCurrentUser$()
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
