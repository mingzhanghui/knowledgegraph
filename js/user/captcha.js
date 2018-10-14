/**
 * Created by Mch on 10/14/18.
 */
function load_captcha() {
    var captchaWrapper = document.getElementById('captcha-wrapper'),
        captcha = new Image();
    const URL_CAPTCHA = window.CONTEXT_PATH + "/User/captcha";

    captcha.src = URL_CAPTCHA + '?t=' + (new Date()).getTime();
    captchaWrapper.appendChild(captcha);

    var $captcha = $(captcha);
    $captcha.on("click", function(e) {
        e.target.src = URL_CAPTCHA + '?t=' + (new Date()).getTime();
    });

    var $refresh = $("<a href='javascript:;'>").css({
        "display": "inline-block",
        "padding-left": "6px"
    }).on("click", function() {
        $captcha.attr("src", URL_CAPTCHA + '?t=' + (new Date()).getTime());
    }).html("点击刷新");

    $captcha.parent().append($refresh);
}

Function.prototype.before = function(beforefn) {
    var __self = this;
    return function() {
        beforefn.call(this, arguments);
        return __self.apply(this, arguments);
    }
};

Function.prototype.after = function(afterfn) {
    var __self = this;
    return function() {
        var ret = __self.apply(this, arguments);
        afterfn.apply(this, arguments);
        return ret;
    }
};

var script = new Script(function() {

});
script.set("./js/web/libs/jquery.cookie.js");
