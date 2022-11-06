import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'lib-nav-bar-link',
  templateUrl: './nav-bar-link.component.html',
  styleUrls: ['./nav-bar-link.component.scss'],
})
export class NavBarLinkComponent implements OnInit {
  @Input() public Text: 'Home' | 'Music' | 'Podcasts' | 'Television' | 'Playlists' | 'Player' | undefined;
  @Input() public Path = '';

  constructor() {}

  ngOnInit(): void {}
}
