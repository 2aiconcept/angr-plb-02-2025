import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconEditComponent } from './icon-edit.component';

describe('IconEditComponent', () => {
  let component: IconEditComponent;
  let fixture: ComponentFixture<IconEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
