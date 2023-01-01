import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPodcastComponent } from './app-podcast.component';

describe('AppPodcastComponent', () => {
  let component: AppPodcastComponent;
  let fixture: ComponentFixture<AppPodcastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPodcastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppPodcastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
