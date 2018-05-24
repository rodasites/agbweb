import { AuthService } from './auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {

    if (authService.autenticado) {
      this.router.navigateByUrl('eventos/');
    } else {
      this.router.navigateByUrl('home/');
    }


  }


}
