export interface DirectoryModel {
  name: string;
  path?: string;
  subDirectories?: DirectoryModel[];
}