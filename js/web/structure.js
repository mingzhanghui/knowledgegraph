/**
 * Created by Mch on 3/24/18.
 */
var structid = null;

$(function() {
    structid = UrlParam.hasParam('structid') ? UrlParam.param("structid") : 1;  // default value for test

    $("#J_preview").on("click", function (e) {
        e.preventDefault();
        // chart.html?structid=1
        location.href = this.href + "?structid=" + structid;
    });

    // load 左边收藏列表
    $.ajax({
        type: 'GET',
        url: window.CONTEXT_PATH + "/Index/nodeTree",
        data: {structid:structid}
    }).done(function(data) {
        console.log(data);
    })
});


