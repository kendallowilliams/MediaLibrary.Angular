import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTogglerComponent } from './navbar-toggler.component';

describe('NavbarTogglerComponent', () => {
  let component: NavbarTogglerComponent;
  let fixture: ComponentFixture<NavbarTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarTogglerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
