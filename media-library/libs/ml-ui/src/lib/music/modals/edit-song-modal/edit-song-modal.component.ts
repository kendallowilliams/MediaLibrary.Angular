import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Album, Artist, Genre, Track } from '@media-library/ml-data';
import { ModalRef } from '../../../modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  @Output() public songSave = new EventEmitter<Track>();

  public songForm!: FormGroup;
  public albumOptions: SelectOption[] = [];
  public artistOptions: SelectOption[] = [];
  public genreOptions: SelectOption[] = [];

  constructor(private _modalRef: ModalRef<EditSongModalComponent>, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.songForm = this.fb.group({
      title: this.fb.control(this.song?.title, Validators.required),
      artistId: this.fb.control(this.song?.artistId, Validators.required),
      albumId: this.fb.control(this.song?.albumId, Validators.required),
      genreId: this.fb.control(this.song?.genreId, Validators.required),
      position: this.fb.control(this.song?.position, Validators.required),
      year: this.fb.control(this.song?.year, Validators.required)
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

  public handleSave() : void {
    const song = Object.assign({}, this.song);

    Object.assign(song, this.songForm.value);
    this.songSave.emit(song);
    this._modalRef.hide();
  }

  public close() : void {
    this._modalRef.hide();
  }
}
