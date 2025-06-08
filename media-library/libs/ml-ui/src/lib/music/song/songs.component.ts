import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Track, Genre, MediaPages } from '@media-library/ml-data';
import { PlayerService } from '../../media-player';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, fromEvent, tap } from 'rxjs';
import { getAtoZKey } from '@media-library/ml-utility';

@Component({
    selector: 'ml-songs',
    templateUrl: './songs.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: false
})
export class SongsComponent {
  @HostBinding('class') private _class = 'block h-full';
  @Input() public songs!: Track[] | null;
  @Input() public artists!: Artist[] | null;
  @Input() public albums!: Album[] | null;
  @Input() public genres!: Genre[] | null;

  @Output() public editSong = new EventEmitter<number>();
  @Output() public addToPlaylist = new EventEmitter<number>();

  constructor(private _playerService: PlayerService) {}
}
