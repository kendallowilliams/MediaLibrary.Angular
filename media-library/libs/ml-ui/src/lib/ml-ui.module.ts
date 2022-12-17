import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarBrandComponent } from './navbar/navbar-brand/navbar-brand.component';
import { NavbarNavComponent } from './navbar/navbar-nav/navbar-nav.component';
import { NavbarTogglerComponent } from './navbar/navbar-toggler/navbar-toggler.component';
import { NavbarControlsComponent } from './navbar/navbar-controls/navbar-controls.component';
import { NavbarMenuComponent } from './navbar/navbar-menu/navbar-menu.component';
import { NavItemComponent } from './navbar/navbar-nav/nav-item/nav-item.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SwitchComponent } from './controls/switch/switch.component';
import { HomeComponent } from './content/home/home.component';
import { MusicComponent } from './content/music/music.component';
import { PodcastComponent } from './content/podcast/podcast.component';
import { TelevisionComponent } from './content/television/television.component';
import { PlaylistComponent } from './content/playlist/playlist.component';
import { PlayerComponent } from './content/player/player.component';
import { SearchResultsComponent } from './content/search-results/search-results.component';
import { CheckboxDirective } from './controls/checkbox/checkbox.directive';
import { NavbarIconComponent } from './navbar/navbar-controls/navbar-icon/navbar-icon.component';
import { SettingsComponent } from './content/settings/settings.component';
import { CardModule } from './controls/card/card.module';
import { LoadingComponent } from './controls/loading/loading.component';
import { ThemeToggleDirective } from './controls/theme-toggle/theme-toggle.directive';

@NgModule({
  imports: [CommonModule, FontAwesomeModule, CardModule],
  declarations: [
    NavbarComponent,
    NavbarBrandComponent,
    NavbarNavComponent,
    NavbarTogglerComponent,
    NavbarControlsComponent,
    NavbarMenuComponent,
    NavItemComponent,
    SwitchComponent,
    HomeComponent,
    MusicComponent,
    PodcastComponent,
    TelevisionComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchResultsComponent,
    CheckboxDirective,
    NavbarIconComponent,
    SettingsComponent,
    LoadingComponent,
    ThemeToggleDirective,
  ],
  exports: [
    NavbarComponent,
    NavbarBrandComponent,
    NavbarNavComponent,
    NavbarTogglerComponent,
    NavbarControlsComponent,
    NavbarMenuComponent,
    NavItemComponent,
    SwitchComponent,
    HomeComponent,
    MusicComponent,
    PodcastComponent,
    TelevisionComponent,
    PlaylistComponent,
    PlayerComponent,
    SearchResultsComponent,
    CheckboxDirective,
    NavbarIconComponent,
    SettingsComponent,
    LoadingComponent,
    ThemeToggleDirective,
  ],
})
export class MlUiModule {}
