import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiComponent } from './ui/components/ui/ui.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NavComponent } from './core/components/nav/nav.component';
import { ProfileSettingsComponent } from './core/components/profile-settings/profile-settings.component';
import { IconBootstrapComponent } from './icons/components/icon-bootstrap/icon-bootstrap.component';
import { UiSidenavComponent } from './ui/components/ui-sidenav/ui-sidenav.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    UiComponent,
    HeaderComponent,
    NavComponent,
    ProfileSettingsComponent,
    IconBootstrapComponent,
    UiSidenavComponent,
    NgIf,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isUiSidenav = false;
  change() {
    this.isUiSidenav = !this.isUiSidenav;
  }
}
