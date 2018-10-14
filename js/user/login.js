/**
 * Created by Mch on 10/14/18.
 */
window.onload = function(e) {
    load_captcha();

    // remember password to be done
    var $label = $("#J_label_remember_me"), checked = 0;
    $label.on("click", function() {
        alert(1);
        checked ^= 1;
        $(".mt-checkbox>span:after, .mt-radio>span:after").css({
            display: checked ? 'inline-block' : 'none'
        });
    });

    var $form = $("#form-login"), submit_handler = (function(e) {
        e.preventDefault();
        var $alert = $(".alert");

        var $name = $("#login_name"), $password = $("#login_password");
        if ($.trim($name.val()).length < 1 || $.trim($password.val()).length < 1) {
            $alert.find("span").html("请输入用户名和密码");
            $alert.show();
            return false;
        }

        var $inputCaptcha = $("#register_captcha");
        if ($.cookie("captcha").toUpperCase() !== $inputCaptcha.val().toUpperCase()) {
            $inputCaptcha.parent().prepend("<span class='help-block'><strong>验证码错误</strong></span>").addClass('has-error');
            return false;
        }

        var $btn = $(this).find("button[type=submit]");
        $.ajax({
            type: 'POST',
            url: window.CONTEXT_PATH + '/User/login',
            data: $(this).serialize(),
            withCredential: true
        }).done(function(data) {
            if (data.code === 0) {
                window.location.href = "index.html?userid=" + data.data;
            } else {
                $form.find("span").html(data.msg).show();
                $form.find(".alert").show();
            }
            $btn.html("登录");
        });
        $btn.html('登录中...');
    }).bind($form);

    submit_handler = submit_handler.before(function() {
        // hide last error
        $('.alert').hide();
        $(".help-block").remove();
    }).after(function() {
        // update captcha
        $("#captcha-wrapper").find("a").trigger("click");
    });

    $form.on("submit", submit_handler);
};