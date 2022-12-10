import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFlyoutComponent } from './card-flyout.component';

describe('CardFlyoutComponent', () => {
  let component: CardFlyoutComponent;
  let fixture: ComponentFixture<CardFlyoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardFlyoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardFlyoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
