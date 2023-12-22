import { NgModule } from "@angular/core";
import { AutoHideNavbarLinksDirective, CardModule, ControlsModule, NavbarModule } from "@media-library/ml-ui";
import { AppNavbarComponent } from "./app-navbar/app-navbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { MlUtilityModule } from "@media-library/ml-utility";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AppAlbumComponent } from "./music/app-album/app-album.component";
import { AppArtistComponent } from "./music/app-artist/app-artist.component";
import { AppSongComponent } from "./music/app-song/app-song.component";
import { AppAlbumsComponent } from "./music/app-albums/app-albums.component";

@NgModule({
  imports: [
    CommonModule,
    ControlsModule,
    FontAwesomeModule,
    NavbarModule,
    MlUtilityModule,
    AutoHideNavbarLinksDirective,
    RouterModule,
    CardModule
  ],
  exports: [
    AppNavbarComponent,
    AppAlbumComponent,
    AppArtistComponent,
    AppSongComponent,
    AppAlbumsComponent
  ],
  declarations: [
    AppNavbarComponent,
    AppAlbumComponent,
    AppArtistComponent,
    AppSongComponent,
    AppAlbumsComponent
  ]
})
export class AppComponentsModule {
}