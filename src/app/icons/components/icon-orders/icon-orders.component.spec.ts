import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconOrdersComponent } from './icon-orders.component';

describe('IconOrdersComponent', () => {
  let component: IconOrdersComponent;
  let fixture: ComponentFixture<IconOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
