import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppArtistComponent } from './app-artist.component';

describe('AppArtistComponent', () => {
  let component: AppArtistComponent;
  let fixture: ComponentFixture<AppArtistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppArtistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppArtistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
