import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSongComponent } from './app-song.component';

describe('AppSongComponent', () => {
  let component: AppSongComponent;
  let fixture: ComponentFixture<AppSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppSongComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
