// src/app/shared/directives/state.directive.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { StateDirective } from './state.directive';

@Component({
  standalone: true,
  // Importer la directive dans le composant hôte afin qu'elle soit disponible dans le template
  imports: [StateDirective],
  template: `<div [appState]="state">Test Content</div>`,
})
class TestHostComponent {
  state = 'OPTION';
}

describe('StateDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let divElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Importer le composant hôte standalone directement dans "imports"
      imports: [TestHostComponent],
    });
    fixture = TestBed.createComponent(TestHostComponent);
    hostComponent = fixture.componentInstance;
    divElement = fixture.nativeElement.querySelector('div');
    fixture.detectChanges();
  });

  it('should set the initial class based on the state input', () => {
    // "OPTION" devrait donner "state-option"
    expect(divElement.className).toBe('state-option');
  });

  it('should update the class when the input changes', () => {
    hostComponent.state = 'CONFIRMED';
    fixture.detectChanges();
    expect(divElement.className).toBe('state-confirmed');
  });
});
