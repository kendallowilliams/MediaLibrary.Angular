export const MODAL_BACKDROPS = ['visible', 'transparent'] as const;
export type ModalBackdrop = typeof MODAL_BACKDROPS[number];

export class ModalConfig {
  public static = false;
  public backdrop: ModalBackdrop = 'visible';
  public modeless = false;
  public parameters?: { [key: string]: unknown };
  public inputs?: { [key: string]: unknown };
}