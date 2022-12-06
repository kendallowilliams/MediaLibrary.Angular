import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  protected year: number = new Date().getFullYear();

  constructor(private _router: Router) {
    
  }

  protected handleSearch(query: string) : void {
    this._router.navigate(['search', { query: query }])
  }
}
