/**
 * Created by mzh on 2/13/18.
 * 我的知识库 submenu show/hide
 */
var t = null, time = 300, _this;
$(".my_knowledge").hover(function () {
  $(this).addClass('curoot').next(".submenu").show();
}, function () {
  _this = $(this);
  t = setTimeout(function () {
    _this.removeClass('curoot').next(".submenu").hide();
  }, time);
  showsubmenu(_this.next(".submenu"));
});
function showsubmenu(obj) {
  obj.hover(function () {
    clearTimeout(t);
    t = null;
    obj.show();
  }, function () {
    obj.prev('.my_knowledge').removeClass('curoot').end().hide();
  });
}
