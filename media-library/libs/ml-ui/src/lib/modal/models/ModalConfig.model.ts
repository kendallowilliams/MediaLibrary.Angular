export const MODAL_BACKDROPS = ['visible', 'hidden', 'transparent'] as const;
export type ModalBackdrop = typeof MODAL_BACKDROPS[number];

export class ModalConfig<T = void> {
  public static = false;
  public backdrop: ModalBackdrop = 'visible';
  public parameters?: { [key: string]: unknown };

  public configureComponentInputs?: (component: T) => void;
}