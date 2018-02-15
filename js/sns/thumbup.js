/**
 * Created by mzh on 2/13/18.
 */
(function () {
  $("a").find(".fa-thumbs-o-up").on("click", function (e) {
    var login = csdn.knowledge_web._verificaUser();
    if (login) {
      var obj = $(e.target), num = parseInt(obj.parents("span").text().replace(/[^0-9]/ig, "")), _html;
      var _dataid = $(e.target).parent("a").attr("data-id");
      $.get("/dynamic/support", {data: _dataid}, function (res) {
        if (res.status) {
          num++;
          obj.removeClass("fa-thumbs-o-up").addClass("fa-thumbs-up");
          _html = $(obj).parent()[0].outerHTML + num;
          obj.parents("span").html(_html);
        }
        else if (res.error == 1) {
          var _url = "https://passport.csdn.net/account/login?from=" + encodeURI(location.href);
          window.location = _url;
        }
      });
    }
    e.preventDefault();
    return false;
  });
  if ($(".showarrow").length > 0) {
    $(document).on("mouseenter", ".showarrow", function () {
      $(this).find('.showdown').show();
    });
    $(document).on("mouseleave", ".showarrow", function () {
      $(this).find('.showdown').hide();
    });
  }
}).call();