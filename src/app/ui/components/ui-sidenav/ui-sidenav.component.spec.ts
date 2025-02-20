import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiSidenavComponent } from './ui-sidenav.component';

describe('UiSidenavComponent', () => {
  let component: UiSidenavComponent;
  let fixture: ComponentFixture<UiSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
