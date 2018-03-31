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
    if ($clipMsg.length===0) {
      var div = document.createElement("div");
      div.className = "clip-msg";
      div.innerHTML = "复制成功!";
      document.body.append(div);
      $clipMsg = $(div);
    }
    $clipMsg.css({
      "position": "fixed",
      "right": 0,
      "top": 0,
      "bottom": "auto",
      "z-index": "99",
      "padding": ".4em .8em",
      "background-color": "green"
    });
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
