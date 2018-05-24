import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../loading.service';



@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  public visible = false;

  constructor(
    private loading:LoadingService
  ) {

      this.loading.isLoading.subscribe( visible => this.visible = visible )

  }

  ngOnInit() {
  }
  

}
