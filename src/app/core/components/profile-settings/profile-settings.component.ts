import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { IconProfileComponent } from '../../../icons/components/icon-profile/icon-profile.component';
import { NgClass } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { TranslateService } from '@ngx-translate/core';

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
  translate = inject(TranslateService); // Injection du service

  useLanguage(language: string): void {
    this.translate.use(language);
  }

  changeUi() {
    this.iSUiChange.emit();
  }

  signOut() {
    this.authService.signOut();
  }
}
