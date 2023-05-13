export function filterString(string, character) {
  let newStr = '';
  for (let i = 0; i < string.length; i++) {
    if (string[i] !== character) {
      newStr += string[i];
    }
  }
  return newStr;
}