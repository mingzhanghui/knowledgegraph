/**
 * Created by mzh on 2/13/18.
 */
$(function () {
  // ---- 复制到剪贴板 ----
  var clipboard = new Clipboard('#clip_button');
  var t;
  clipboard.on('success', function (e) {
    clearTimeout(t);
    var $clipMsg = $(".clip-msg");
    $clipMsg.fadeIn(400);
    var delay = 1500;
    t = setTimeout(function () {
      $clipMsg.fadeOut(1000);
    }, delay);
    e.clearSelection();
  });
  clipboard.on('error', function (e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
  });
});
