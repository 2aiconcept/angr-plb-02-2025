import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconProductsComponent } from './icon-products.component';

describe('IconProductsComponent', () => {
  let component: IconProductsComponent;
  let fixture: ComponentFixture<IconProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconProductsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
