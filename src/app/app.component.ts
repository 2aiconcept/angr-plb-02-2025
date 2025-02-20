import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiComponent } from './ui/components/ui/ui.component';
import { HeaderComponent } from './core/components/header/header.component';
import { NavComponent } from './core/components/nav/nav.component';
import { ProfileSettingsComponent } from './core/components/profile-settings/profile-settings.component';
import { IconBootstrapComponent } from './icons/components/icon-bootstrap/icon-bootstrap.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UiComponent,
    HeaderComponent,
    NavComponent,
    ProfileSettingsComponent,
    IconBootstrapComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
