window.CONTEXT_PATH = "http://localhost:8082/index.php";
// window.CONTEXT_PATH = "http://47.93.27.106:8082/index.php";

var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};

document.getElementById = (function(func) {
    return function() {
        return func.apply(document, arguments);
    }
})(document.getElementById);
var getId = document.getElementById;

Function.prototype.bind = function(context) {
    var self = this,
        context = [].shift.call(arguments),
        args = [].slice.call(arguments);
    return function() {
        return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
};

$.ajaxSetup({
    widthCredentials: true,
});

/**
 * var load_js = new Script(script_onload);
 * load_js.set("http://static.gongju.com/js/jquery-1.4.4.min.js");
 *
 * @param callback
 */
function Script(callback) {
    var js = document.createElement("script");
    this.js = js;
    js.type = "text/javascript";
    document.body.appendChild(js);

    if (callback) {
        if (navigator.appName.toLowerCase().indexOf('netscape') === -1) {
            js.onreadystatechange = function() {
                js.readyState === 'complete' && callback(this);
            }
        } else {
            js.onload = function() {
                callback(this);
            }
        }
    }
}

Script.prototype.set = function(url) {
    this.js.src = url;
};

var ng = {
    user: {
        utility: {},
        acl: []
    }
};

ng.user.utility.logoff = function(callbackFunc, backUrl) {
    $.get(window.CONTEXT_PATH + "/User/logout", function(data) {
        console.log(data);
        $.cookie("ng_userid", null);
        $.cookie("ng_username", null);
        backUrl = backUrl || window.location.href;
        window.location.href = 'login.html?referer='+encodeURIComponent(backUrl);
    });
    if (callbackFunc) {
        callbackFunc();
    }
};

ng.user.utility.getcookie = function(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg)) {
        return decodeURIComponent(arr[2]);
    }
    return '';
};

ng.user.acl = [
    '/login.html',
    '/register.html'
];

(function() {
    if (ng.user.acl.indexOf(window.location.pathname) < 0) {
        var userid = ng.user.utility.getcookie("ng_userid");
        if (!userid) {
            window.location.href = "login.html?referer=" +
                encodeURIComponent(window.location.href);
        }
    }
})();