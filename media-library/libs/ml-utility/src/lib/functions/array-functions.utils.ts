export function unique<T>(
  items: Array<T>, 
  itemComparer: (itemToFind: T, itemToMatch: T) => boolean = (a, b) => a === b
) : Array<T> {
  return items.filter((itemToFind: T, index: number) => 
    items.findIndex((itemToMatch) => itemComparer(itemToFind, itemToMatch)) === index);
}