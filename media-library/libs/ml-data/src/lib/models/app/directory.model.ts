export interface DirectoryModel {
  name: string;
  path: string;
  pathId?: number | null;
  subDirectories?: DirectoryModel[];
}