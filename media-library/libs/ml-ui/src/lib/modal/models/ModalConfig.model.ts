export class ModalConfig<T = void> {
  public static = false;
  public backdrop: 'visible' | 'hidden' | 'transparent' = 'visible';
  public parameters?: { [key: string]: unknown };

  public configureComponentInput?: (component: T) => void;
}