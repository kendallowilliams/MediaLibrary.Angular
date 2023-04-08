export class ModalConfig<T = void> {
  public static = false;
  public backdrop: 'visible' | 'hidden' = 'visible';
  public parameters?: { [key: string]: unknown };

  public configureComponentInput?: (component: T) => void;
}