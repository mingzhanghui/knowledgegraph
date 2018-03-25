/**
 * Created by Mch on 3/24/18.
 */
var structid = null;

$(function () {
    structid = UrlParam.hasParam('structid') ? UrlParam.param("structid") : 1;  // default value for test

    var w, h, dw = 1140, dh = 940, options;
    w = $(window).width();
    h = $(window).height();
    options = {
        width: dw,
        height: dh
    };

    var URL_NODE = window.CONTEXT_PATH + "/Index/listNode";  // './data/node.json',
    var URL_LINK = window.CONTEXT_PATH + "/Index/listLink"; // './data/link.json';

    $.ajax({
        type: 'GET',
        url: URL_NODE,
        data: {'structid':structid},
        dataType: 'json',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8'
    }).done(function(node) {
        $.getJSON(URL_LINK, {'structid':structid}, function(link) {
            console.log(link);
            loadMap(options, node, link);
        });
    });

    // 全屏
    /*
     var isAll = false;
     $("#fullscreen").on('click', function () {
     $('#mapRow').html('');
     !isAll ? ($(this).find('.fa').removeClass('fa-expand').addClass('fa-compress'), $(this).find('em').text('退出全屏'), $("#kl_screen").css({
     "width": w,
     "height": h
     }).addClass('kl_str_screen'), isAll = true, options = {
     'width': w,
     'height': h
     }, loadMap(options, node, linnk)) : ($(this).find('.fa').removeClass('fa-compress').addClass('fa-expand'), $(this).find('em').text('全屏'), $("#kl_screen").css({
     "width": 'auto',
     "height": 'auto'
     }).removeClass('kl_str_screen'), isAll = false, options = {
     'width': dw,
     'height': dh
     }, loadMap(options, node, link));
     return false;
     });
     */
});
