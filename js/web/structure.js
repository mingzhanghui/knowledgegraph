/**
 * Created by Mch on 3/24/18.
 */
var structid = null;

$(function() {
    structid = UrlParam.hasParam('structid') ? UrlParam.param("structid") : 1; // default value for test

    $("#J_preview").on("click", function(e) {
        e.preventDefault();
        // chart.html?structid=1
        location.href = this.href + "?structid=" + structid;
    });

    // load 左边收藏列表
    $.ajax({
        type: 'GET',
        url: window.CONTEXT_PATH + "/Index/nodeTree",
        data: { structid: structid }
    }).done(function(resp) {
        var data = resp[0];

        var $menu = $("#J_menu").empty();
        var $box = $("<ul>").addClass("menubox").addClass("treeboxnew");
        $menu.append($box);
        // depth = 1;
        data.childs && data.childs.forEach(function(a) {
            var $li = $("<li>").attr("data-id", a.id);
            $box.append($li);
            var $whiteblank = $("<span>").addClass("whiteblank").html("<em class=\"cirle\"></em>");
            $li.append($whiteblank);
            var $a = $("<a>").attr("href", a.href).attr("data-id", a.id);
            var $em = $("<em>").text(a.name);
            var $i = a.childs ? $("<i>").attr("class", "fa iconfa fa-angle-down") : null;
            // toggle hide/show
            $i && $i.on("click", function(e) {
                e.preventDefault();
                var t = this,
                    a = t.parentNode;
                if (this.classList.contains("fa-angle-down")) {
                    $(this).addClass("fa-angle-up").removeClass("fa-angle-down");
                    a.nextElementSibling.style.display = "block";
                } else {
                    $(this).addClass("fa-angle-down").removeClass("fa-angle-up");
                    a.nextElementSibling.style.display = "none";
                }
            });
            $a.append($em).append($i);
            $li.append($a);

            // depth = 2
            var $subul;
            a.childs && ($subul = $("<ul>").addClass("subul").appendTo($li)) && a.childs.forEach(function(b) {
                var $subli = $("<li>").attr("data-id", b.id);
                $subul.append($subli);
                var $a = $("<a>").attr("data-id", b.id); // addClass("roots") highlight
                $subli.append($a);
                $em = $("<em>").addClass("iless").appendTo($a);
                var $i = b.childs ? $("<i>").attr("class", "fa iconfa fa-angle-down") : null;
                $i && $i.on("click", function(e) {
                    e.preventDefault();
                    var t = this, $t = $(this),
                        a = t.parentNode.parentNode;
                    if (this.classList.contains("fa-angle-down")) {
                        $t.addClass("fa-angle-up").removeClass("fa-angle-down");
                        a.nextElementSibling.style.display = "block";
                        $t.parent().prev().addClass("iplus").removeClass("iless");
                    } else {
                        $t.addClass("fa-angle-down").removeClass("fa-angle-up");
                        a.nextElementSibling.style.display = "none";
                        $t.parent().prev().addClass("iless").removeClass("iplus");
                    }
                });
                $("<span>").text(b.name).append($i).appendTo($a);

                // depth = 3
                var $leaful;
                b.childs && ($leaful = $("<ul>").addClass("subul").appendTo($subli)) && b.childs.forEach(function(c) {
                    var $leafli = $("<li>").attr("data-id", c.id);
                    $leaful.append($leafli);
                    var $a = $("<a>").attr("data-id", c.id).attr("href", c.href);
                    $("<em>").addClass("iless").appendTo($a);
                    $("<span>").text(c.name).appendTo($a);
                    $leafli.append($a);
                });
            });
        });
        // end data.childs.forEach

        // click (.treeboxnew a) for highlight
        var $alist = $box.find("a");
        $alist.on("click", function(e) {
            e.preventDefault();
            var $t = $(this);
            $alist.not($t).removeClass("roots");
            $t.addClass("roots");
            return false;
        });

    })
});