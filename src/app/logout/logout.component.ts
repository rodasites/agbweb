import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.authService.setAutenticado(false)
    this.router.navigateByUrl('home/');
  }

}
