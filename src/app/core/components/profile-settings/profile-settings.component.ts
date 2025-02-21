import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IconProfileComponent } from '../../../icons/components/icon-profile/icon-profile.component';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-settings',
  imports: [IconProfileComponent, NgClass],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent {
  @Input() isUiSidenav!: boolean;
  @Output() iSUiChange = new EventEmitter<boolean>();
  authService = inject(AuthService);

  changeUi() {
    this.iSUiChange.emit();
  }

  signOut() {
    this.authService.signOut();
  }
}
