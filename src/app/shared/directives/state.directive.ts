import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appState]',
})
export class StateDirective {
  @Input() appState!: string;
  @HostBinding('class') hostElem!: string;
  constructor() {}

  ngOnChanges() {
    this.hostElem = `state-${this.appState.toLowerCase()}`;
  }
}
