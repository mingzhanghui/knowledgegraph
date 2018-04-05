/**
 * Created by Mch on 4/5/18.
 */
$(function() {
    var jqxhr = $.getJSON(window.CONTEXT_PATH + "/Index/listStructures", function() {
       console.log("success");
    }).done(function(data) {
        var $box = $("#J_listbox").empty();

        data.forEach(function(item) {
            var $li = $("<li>").appendTo($box);
            var $a = $("<a>").attr("href", "structure.html?structid=" + item.id);
            $("<div>").addClass("colorbox").appendTo($a);
            $("<div>").addClass("boxphoto").html("<img src=\"./images/web/newimgs/structimg.gif\">").appendTo($a);
            $("<div>").addClass("title").text(item.name).appendTo($a);
            $("<div>").addClass("numbs").html("<em>"+item.count+"</em>条知识内容").appendTo($a);
            $li.append($a);
        });

    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("error: [" + textStatus + "] " + errorThrown);
    }).always(function() {
        console.log("complete");
    });

    jqxhr.complete(function() {
       console.log("second complete.");
    });
});
