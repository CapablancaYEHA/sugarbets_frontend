export const linkify = (inputText) => {
  let replacedText;
  let replacePattern1;

  replacePattern1 =
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank" rel="nofollow noopener noreferrer">$1</a>'
  );

  return replacedText;
};
