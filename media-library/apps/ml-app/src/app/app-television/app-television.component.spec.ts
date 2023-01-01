import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTelevisionComponent } from './app-television.component';

describe('AppTelevisionComponent', () => {
  let component: AppTelevisionComponent;
  let fixture: ComponentFixture<AppTelevisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppTelevisionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppTelevisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
