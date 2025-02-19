import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOrdersComponent } from './page-orders.component';

describe('PageOrdersComponent', () => {
  let component: PageOrdersComponent;
  let fixture: ComponentFixture<PageOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageOrdersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
