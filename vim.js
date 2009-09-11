Vim = {};
Vim.port = chrome.extension.connect({name: "tabs"});
Vim.scroll_amount = 50;
Vim.key_buffer = "";
Vim.multiBinds = [];

//always defined
function scrollDown() {
        window.scrollBy(0,Vim.scroll_amount);
}

function scrollUp() {
        window.scrollBy(0,-Vim.scroll_amount);
}

function scrollLeft() {
        window.scrollBy(-Vim.scroll_amount,0);
}

function scrollRight() {
        window.scrollBy(Vim.scroll_amount,0);
}

function topOfPage() {
        window.scroll(0,0);
}

function inputKey(inKey, keyFunc) {
        $(document).bind('keydown', {combi:inKey, disableInInput: true}, keyFunc);
}

function specialKey(inKey, keyFunc) {
        $(document).bind('keydown', {combi:inKey, disableInInput: false}, keyFunc);
}

function multiBind(inKeys, keyFunc) {
        inKey = inKeys.split(" ")[0];
        specialKey(inKey, function () {Vim.key_buffer = inKey;console.log(Vim.key_buffer);});
}

function unKey(inkey) {
        $(document).unbind('keydown', inKey);
}

var multiKeyFunc = null;
var multiKeysArr = null;
function multiBind(inKeys, keyFunc) {
        if (inKeys.indexOf(" ") != -1) {
                inKeysArr = inKeys.split(' ');
                inKey = inKeysArr.shift();
                Vim.multiBinds.push(inKey);
                multiKeyFunc = keyFunc;
                multiKeysArr = inKeysArr;
                inputKey(inKey, function () {
                                Vim.key_buffer = inKey;
                                unKey(inKey);
                                setTimeout(function (Vim) {
                                        multiBind(inKeysArr.join(" "), multiKeyFunc)}, 100);
                                });
        } else {
                inputKey(inKeys, function () {
                                keyFunc();
                                unKey(inKeys);
                                setTimeout(bindDefaults, 100);
                                });
        }
}

function deleteTab() {
        Vim.port.postMessage({method:"delete"});
}

function refresh() {
        location.reload(true);
}

function nextTab() {
        Vim.port.postMessage({method:"next"});
        return false;
}

function prevTab() {
        Vim.port.postMessage({method:"previous"});
        return false;
}

// big and hairy like a whale
function createCmdLine() {
        //do something good
}

// changes all key commands, binds all kinds of stuff
function find() {
        //do something good
}

function add_number(elem, num) {
        console.log(elem);
        var elem_top = elem.offsetTop;
        var elem_left = elem.offsetLeft;
        console.log(elem_top);
        console.log(elem_left);
        $(elem).after('<div class="vim_nums" style="position:absolute;left:' + elem_left + 'px;top:' + elem_top + 'px" "id="' + num + '" url="' + elem.href + '">' + num + '</div>')
}

//rebinds all the standard commands
function bindDefaults() {
        console.log("Binding Defaults");
        inputKey('j', scrollDown);
        inputKey('k', scrollUp);
        inputKey('h', scrollLeft);
        inputKey('l', scrollRight);
        specialKey('ctrl+o', function () {history.go(-1);return false;});
        specialKey('ctrl+i', function () {history.go(1);return false;});
        inputKey('r', refresh);
        specialKey('ctrl+p', prevTab);
        specialKey('ctrl+n', nextTab);
        inputKey('d', deleteTab);
        specialKey('esc', function () {$(":input").blur();});
        inputKey('f', find);
        multiBind('g g', topOfPage);
}

bindDefaults();
