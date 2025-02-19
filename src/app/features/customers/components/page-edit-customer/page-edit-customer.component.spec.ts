import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageEditCustomerComponent } from './page-edit-customer.component';

describe('PageEditCustomerComponent', () => {
  let component: PageEditCustomerComponent;
  let fixture: ComponentFixture<PageEditCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageEditCustomerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageEditCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
