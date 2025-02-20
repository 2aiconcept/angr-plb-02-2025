import { Component, Input } from '@angular/core';
import { IconProfileComponent } from '../../../icons/components/icon-profile/icon-profile.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile-settings',
  imports: [IconProfileComponent, NgClass],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent {
  @Input() isUiSidenav!: boolean;
  constructor() {}
  ngOnInit() {
    console.log(this.isUiSidenav);
  }
  ngOnChanges() {
    console.log('valeur input' + this.isUiSidenav);
  }
}
