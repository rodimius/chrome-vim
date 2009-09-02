// smelly
var port = chrome.extension.connect({name: "tabs"});
var scroll_amount = 50;
function scrollDown() {
  window.scrollBy(0,scroll_amount);
}
function scrollUp() {
  window.scrollBy(0,-scroll_amount);
}
function scrollLeft() {
  window.scrollBy(-scroll_amount,0);
}
function scrollRight() {
  window.scrollBy(scroll_amount,0);
}
function inputKey(inKey, keyFunc) {
  $(document).bind('keydown', {combi:inKey, disableinInput: true, propagate:false}, keyFunc)
}

function specialKey(inKey, keyFunc) {
  $(document).bind('keydown', {combi:inKey, disableinInput: false, propagate:false}, keyFunc)
}

function deleteTab() {
        port.postMessage({method:"delete"});
}
inputKey('j', scrollDown);
inputKey('k', scrollUp);
inputKey('h', scrollLeft);
inputKey('l', scrollRight);
specialKey('ctrl+o', function () {history.go(-1);return false;});
specialKey('ctrl+i', function () {history.go(1);return false;});
inputKey('d', deleteTab);
specialKey('esc', function () {$(":input").blur();});
