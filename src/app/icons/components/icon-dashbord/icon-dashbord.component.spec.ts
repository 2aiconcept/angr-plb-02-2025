import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconDashbordComponent } from './icon-dashbord.component';

describe('IconDashbordComponent', () => {
  let component: IconDashbordComponent;
  let fixture: ComponentFixture<IconDashbordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconDashbordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconDashbordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
