import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public corporacao = this.authService.getCorporacao();

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.corporacao = this.authService.getCorporacao();
  }
}
