import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class LoadingService {

  private loadings = [];

  private isLoadingSource = new Subject<boolean>();

  public isLoading = this.isLoadingSource.asObservable();

  constructor() { }

  addLoading() {
    this.loadings.push(true);
    this.showLoading();
  }

  showLoading() {
    this.isLoadingSource.next( !!this.loadings.length );
  }

  hideLoading() {
    this.loadings.pop();
    this.showLoading();
  }
  

}
