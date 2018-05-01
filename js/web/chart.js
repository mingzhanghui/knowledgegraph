/**
 * Created by Mch on 3/24/18.
 */
var structid = null;

$(function () {
    structid = UrlParam.hasParam('structid') ? UrlParam.param("structid") : 1;  // default value for test

    var dw = 1140, dh = 940, options;
    options = {
        width: dw,
        height: dh
    };

    var URL_NODE = window.CONTEXT_PATH + "/Index/listNode";  // './data/node.json',
    var URL_LINK = window.CONTEXT_PATH + "/Index/listLink"; // './data/link.json';
    var node, link;

    $.ajax({
        type: 'GET',
        url: URL_NODE,
        data: {'structid':structid},
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
    }).done(function(n) {
        node = n;
        $.getJSON(URL_LINK, {'structid':structid}, function(l) {
            link = l;
            loadMap(options, node, link);

            // 全屏 buggy
            var isFull = false;
            var w = $(window).width();
            var h = $(window).height();
            $("#fullscreen").on('click', function () {
                $('#mapRow').empty();
                var $t = $(this);
                if (!isFull) {
                    // 进入全屏
                    $t.find('.fa').removeClass('fa-expand').addClass('fa-compress');
                    $t.find('em').text('退出全屏');
                    $("#kl_screen").css({
                        "width": w,
                        "height": h
                    }).addClass('kl_str_screen');
                    isFull = true;
                    options = {
                        'width': w,
                        'height': h
                    };
                    loadMap(options, node, link);
                } else {
                    // 取消全屏
                    $t.find('.fa').removeClass('fa-compress').addClass('fa-expand');
                    $t.find('em').text('全屏');
                    $("#kl_screen").css({
                        "width": 'auto',
                        "height": 'auto'
                    }).removeClass('kl_str_screen');
                    isFull = false;
                    options = {
                        'width': dw,
                        'height': dh
                    };
                    loadMap(options, node, link);
                }
            });
        });   // $.getJSON(URL_LINK, ...)
    }); // $.ajax({url: URL_NODE, ...})



    // 图谱名称
    var title = decodeURI(UrlParam.param("title"));
    $("#J_title").text(title).on("click", function(e) {
       window.location.href = "structure.html?structid=" + structid;
    }).css("cursor","pointer");
});
