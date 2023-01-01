import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPlaylistComponent } from './app-playlist.component';

describe('AppPlaylistComponent', () => {
  let component: AppPlaylistComponent;
  let fixture: ComponentFixture<AppPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPlaylistComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
