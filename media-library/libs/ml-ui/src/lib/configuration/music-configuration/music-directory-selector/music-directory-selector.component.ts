import { Component, Input, OnInit, ViewEncapsulation } from "@angular/core";
import { AppApiService, DirectoryModel, ListItem } from "@media-library/ml-data";
import { faFolderOpen, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { MessageBoxService } from "../../../message-box";

@Component({
  selector: 'ml-music-directory-selector',
  templateUrl: './music-directory-selector.component.html',
  encapsulation: ViewEncapsulation.None
})
export class MusicDirectorySelectorComponent implements OnInit {
  @Input({required: true}) public rootPath!: string;

  public directory?: DirectoryModel;
  public breadcrumbs: ListItem[] = [];
  public faFolderOpen = faFolderOpen;
  public faPlus = faPlus;
  public faTrashCan = faTrashCan;

  constructor(private _appApiService: AppApiService, private _messageBoxService: MessageBoxService) {}

  public ngOnInit(): void {
    this.handleClick(this.rootPath);
  }

  public handleBreadcrumbClick(breadcrumb: ListItem) : void {
    const index = this.breadcrumbs.indexOf(breadcrumb);
    this.breadcrumbs = this.breadcrumbs.slice(0, index);
    this.handleClick(breadcrumb.value.toString());
  }

  public handleClick(path: string) : void {
    this._appApiService.getDirectory(path)
      .subscribe({
        next: directory => {
          this.breadcrumbs.push({ name: directory.name, value: directory.path || directory.name });
          this.directory = directory;
        }
      });
  }

  public handleAdd(directory: DirectoryModel) : void {
    this._messageBoxService.confirm(
      'Add Music Path', 
      `Are you sure that you want to add ${directory.path}?`,
      true)
      .subscribe({
        next: answer => {
          answer && this._appApiService.addMusicDirectory(directory.path)
          .subscribe({
            next: pathId => directory.pathId = pathId
          });
        }
      });
  }

  public handleRemove(directory: DirectoryModel) : void {
    this._messageBoxService.confirm(
      'Remove Music Path', 
      `Are you sure that you want to remove ${directory.path}?`,
      true)
      .subscribe({
        next: answer => {
          answer && directory.pathId && this._appApiService.removeMusicDirectory(directory.pathId)
            .subscribe({
              next: success => success && (directory.pathId = null)
            });
          }
        });
  }
}