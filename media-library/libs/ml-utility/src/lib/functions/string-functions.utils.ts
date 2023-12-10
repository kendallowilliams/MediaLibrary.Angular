export function strMatch(str: string, strMatch: string, partial: boolean, caseInsensitive: boolean) {
  str = caseInsensitive ? str?.toLowerCase() : str;
  strMatch = caseInsensitive ? strMatch?.toLowerCase() : strMatch;

  return !!str && 
    !!strMatch && 
    (
      str === strMatch ||
      (partial && str.includes(strMatch))
    ) 
}