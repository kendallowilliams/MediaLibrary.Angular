export function getAtoZKey(label: string) : string {
  const firstChar = label.charAt(0).toUpperCase() || '';
  if (/^[A-z]$/.test(firstChar)) {
    return firstChar;
  } else if (/^[0-9]$/.test(firstChar)) {
    return '#';
  }
  return '&';
}