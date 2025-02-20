import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() iSUiChange = new EventEmitter<boolean>();

  changeUi() {
    this.iSUiChange.emit();
  }
}
