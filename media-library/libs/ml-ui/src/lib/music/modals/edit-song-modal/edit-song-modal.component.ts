import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Genre, Track } from '@media-library/ml-data';
import { ModalRef } from '../../../modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectOption } from '../../../controls';

@Component({
  selector: 'ml-edit-song-modal',
  templateUrl: './edit-song-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditSongModalComponent implements OnInit {
  @Input({required: true}) public song: Track | null = null;
  @Input({required: true}) public albums: Album[] | null = null;
  @Input({required: true}) public artists: Artist[] | null = null;
  @Input({required: true}) public genres: Genre[] | null = null;

  public songForm!: FormGroup;
  public albumOptions: SelectOption[] = [];
  public artistOptions: SelectOption[] = [];
  public genreOptions: SelectOption[] = [];

  constructor(private mlModalRef: ModalRef<EditSongModalComponent>, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.songForm = this.fb.group({
      title: this.fb.control(this.song?.title),
      artist: this.fb.control(this.song?.artistId),
      album: this.fb.control(this.song?.albumId),
      genre: this.fb.control(this.song?.genreId),
      position: this.fb.control(this.song?.position)
    });
    this.albumOptions = this.albums?.map(album => ({
      text: album.title,
      value: album.id
    })) || [];
    this.artistOptions = this.artists?.map(artist => ({
      text: artist.name,
      value: artist.id
    })) || [];
    this.genreOptions = this.genres?.map(genre=> ({
      text: genre.name,
      value: genre.id
    })) || [];
  }

  public close() : void {
    this.mlModalRef.hide();
  }
}
