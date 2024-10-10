import { Component, DestroyRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Album, Artist } from '@media-library/ml-data';
import { MlFilter, MlFilterService } from '@media-library/ml-utility';
import { SelectOption } from '../../../controls';
import { tap } from 'rxjs';

@Component({
  selector: 'ml-music-filter-modal',
  templateUrl: './music-filter-modal.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MusicFilterModalComponent implements OnInit {
  @Input() public albums: Album[] | null = [];
  @Input() public artists: Artist[] | null = [];

  public filterForm!: FormGroup;
  public albumOptions: SelectOption[] = [];
  public artistOptions: SelectOption[] = [];

  constructor(
    private _fb: FormBuilder, 
    private _filterService: MlFilterService, 
    private _destroyRef: DestroyRef
  ) {}

  public ngOnInit(): void {
    this.filterForm = this._buildFilterForm();
    this._filterService.getFilters()
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        tap(filters => {
          this._applyExistingFilters(filters);
        })
      )
      .subscribe();
    this.albumOptions = this.albums?.map(album => ({
      text: album.title,
      value: album.id
    })) || [];
    this.artistOptions = this.artists?.map(artist => ({
      text: artist.name,
      value: artist.id
    })) || [];
  }

  private _buildFilterForm() : FormGroup {
    return this._fb.group({
      artistId: this._fb.control(null),
      albumId: this._fb.control(null)
    });
  }

  private _applyExistingFilters(filters: MlFilter[]) : void {
    Object.keys(this.filterForm.controls)
      .forEach(field => {
        const filter = filters.find(f => f.name === field);
        this.filterForm.controls[field].patchValue(filter?.value);
      });
  }

  public applyFilters() : void {
    Object.keys(this.filterForm.controls)
      .map(name => ({ name, control: this.filterForm.controls[name]}))
      .map(field => ({
        name: field.name,
        value: field.control.value
      }))
      .forEach(filter => {
        if (filter.value) {
          this._filterService.add(filter);
        } else {
          this._filterService.remove(filter.name);
        }
      });
  }

  public clearFilters() : void {
    this._filterService.clear();
  }
}
