var port = chrome.extension.connect({name: "tabs"});
var scroll_amount = 50;
var vi_cmd_line = null;
var vi_bar=false;
var bar_style = "position:fixed;width:100%;bottom:0px;background:black;"

//always defined
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
        $(document).bind('keydown', {combi:inKey, disableInInput: true}, keyFunc);
}

function specialKey(inKey, keyFunc) {
        $(document).bind('keydown', {combi:inKey, disableInInput: false}, keyFunc);
}

function deleteTab() {
        port.postMessage({method:"delete"});
}

function refresh() {
        location.reload(true);
}

// big and hairy like a whale
function createCmdLine() {
        if (!vi_cmd_line) 
        {
                $('body').append('<div id="vi_bar" style=' + bar_style + '><input id="vi_cmd_line" onblur="vi_bar.setAttribute(\'style\', \'display:none;\');" type="text" style="width:100%" /></div>');
                vi_bar = $('#vi_bar')
                vi_cmd_line = $('#vi_cmd_line');
        }
        else
        {
                vi_bar.show();
                vi_bar.css = bar_style;
        }
        vi_cmd_line.focus();
}

// changes all key commands, binds all kinds of stuff
function find() {
        var links = $("a")
        links.addClass("vim_link")
        $("a:visible").each(function (link) {
                        add_number(links[link], link);
                        });
        createCmdLine();
        vi_cmd_line.value="";
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
function unsearch() {
        $("a,:button").removeClass("vim_link");
        $(".vim_nums").remove();
}

        inputKey('j', scrollDown);
        inputKey('k', scrollUp);
        inputKey('h', scrollLeft);
        inputKey('l', scrollRight);
        specialKey('ctrl+o', function () {history.go(-1);return false;});
        specialKey('ctrl+i', function () {history.go(1);return false;});
        inputKey('r', refresh);
        inputKey('d', deleteTab);
        specialKey('esc', function () {$(":input").blur(); unsearch();});
        inputKey('f', find);
