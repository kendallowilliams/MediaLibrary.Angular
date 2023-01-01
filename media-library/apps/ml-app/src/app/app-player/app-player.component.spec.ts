import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPlayerComponent } from './app-player.component';

describe('AppPlayerComponent', () => {
  let component: AppPlayerComponent;
  let fixture: ComponentFixture<AppPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPlayerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
