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

window.onload = function () {
    load_captcha();

    var script = new Script(function() {

    });
    script.set("./js/web/libs/jquery.cookie.js");

    var $noFix = $(".placeholder-no-fix");

    $noFix.on("focus", function () {
        var i = $(this).index(".placeholder-no-fix");
        $(".form-group").eq(i).removeClass('has-error');
        $(this).prevAll().remove();
    });

    $("#register-submit-btn").on("click", function (e) {
        e.preventDefault();

        var bool = true;

        if (bool) {
            $.ajax({
                type: 'POST',
                url: window.CONTEXT_PATH + '/User/register',
                data: $("#form-register").serialize(),
                beforeSend: function(jqXHR) {
                    // jqXHR.setRequestHeader("")
                },
                withCredentials: true
            }).done(function(data) {
                console.log(data);
            });
        }

        var $inputCaptcha = $("#register_captcha");
        if ($.cookie("captcha").toUpperCase() !== $inputCaptcha.val().toUpperCase()) {
            $inputCaptcha.parent().prepend("<span class='help-block'><strong>验证码错误</strong></span>").addClass('has-error');
            bool = false;
        }

        $noFix.each(function (k, v) {
            var text_v = $(v).val();
            var label = $(v).attr("placeholder");
            var span_len = $(".form-group:eq(" + k + ") span").length;
            if (text_v.length <= 0) {
                if (span_len == 0) {
                    $(".form-group:eq(" + k + ")").prepend("<span class='help-block'><strong>" + label + "&nbsp;不能为空" + "</strong></span>").addClass('has-error');
                }
                bool = false;
            }
            if (k == 2 && text_v.length < 6 && text_v.length > 0) {
                if (span_len == 0) {
                    $(".form-group:eq(" + k + ")").prepend("<span class='help-block'><strong>" + label + "&nbsp;长度不能少于6位" + "</strong></span>").addClass('has-error');
                }
                bool = false;
            }
        });

        // 验证邮箱
        var $email = $("#register_email"), pat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!pat.test($email.val())) {
            if ($email.val().length > 0) {
                $email.parent().prepend("<span class='help-block'><strong>" + "邮箱格式不正确" + "</strong></span>").addClass('has-error');
                bool = false;
            }
        }

        var $pwd = $("#register_password"), $confirm = $("#register_confirmation");
        if ($pwd.val() !== $confirm.val()) {
            if ($pwd.prevAll().length == 0) {
                var pass = $pwd.parent();
                pass.prepend("<span class='help-block'><strong>" + "两次密码输入不一致" + "</strong></span>").addClass('has-error');
            }
            bool = false;
        }

        return true;
    });

};


