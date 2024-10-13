import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Track } from '@media-library/ml-data';
import { ModalRef } from '../../../modal';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ml-edit-song-modal',
  templateUrl: './edit-song-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class EditSongModalComponent implements OnInit {
  @Input({required: true}) public song: Track | null = null;

  public songForm!: FormGroup;

  constructor(private mlModalRef: ModalRef<EditSongModalComponent>, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.songForm = this.fb.group({
      title: this.fb.control(this.song?.title),
      artist: this.fb.control(this.song?.artistId),
      album: this.fb.control(this.song?.albumId),
      genre: this.fb.control(this.song?.genreId),
      position: this.fb.control(this.song?.position)
    });
  }

  public close() : void {
    this.mlModalRef.hide();
  }
}
