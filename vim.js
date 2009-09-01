// smelly
function scrollDown() {
  window.scrollBy(0,50);
}
function scrollUp() {
  window.scrollBy(0,-50);
}
function scrollLeft() {
  window.scrollBy(-50,0);
}
function scrollRight() {
  window.scrollBy(50,0);
}
function inputKey(inKey, keyFunc) {
  $(document).bind('keydown', {combi:inKey, disableinInput: true}, keyFunc)
}

function deleteTab() {
  console.log(chrome.csi());
}
inputKey('j', scrollDown);
inputKey('k', scrollUp);
inputKey('h', scrollLeft);
inputKey('l', scrollRight);
inputKey('alt+1', function () {});
