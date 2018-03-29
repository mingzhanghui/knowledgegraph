/**
 * Created by Mch on 3/24/18.
 */
var STRUCT_ID, NODE_ID;

STRUCT_ID = UrlParam.hasParam('structid') ? UrlParam.param("structid") : 1; // default value for test

$("#J_preview").on("click", function(e) {
    e.preventDefault();
    // chart.html?structid=1
    location.href = this.href + "?structid=" + STRUCT_ID;
});

// load 左边收藏列表
$.ajax({
    type: 'GET',
    url: window.CONTEXT_PATH + "/Index/nodeTree",
    data: { structid: STRUCT_ID }
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
        }).css("cursor", "pointer");
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
            }).css("cursor", "pointer");
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
    var $alist = $box.find("a").css("cursor", "pointer");
    $alist.on("click", function(e) {
        e.preventDefault();
        var $t = $(this);

        // 取得内容,当前节点+所有子节点对应
        $.ajax({
            type: 'GET',
            url: window.CONTEXT_PATH + "/Index/getContentByNodeId",
            data: {nodeid: $t.attr("data-id")}
        }).done(function(data) {
            // 知识内容为空
            var $content = $("#J_content");
            if (data.length == 0) {
                $content.html("<div class=\"simpleresult\">" +
                      "<p class=\"clearfix\"><i class=\"fa fa-frown-o\"></i><span>该知识点下还没有任何知识内容<br>你可以自主" +
                        "<a href=\"\" onclick=\"_addBtn();return false;\">添加知识内容</a>" + // 或者移动" +
                        // "<a href=\"http://lib.csdn.net/my/structure/PHP/collection\">收藏列表</a>中的内容到此知识点</span>" +
                      "</p>" +
                    "</div>");
                return 0;
            }
            // 当前选中节点+子节点对应知识内容不为空
            var $ul = $("<ul>").addClass("listuls").addClass("listhovers");
            $content.empty().append($ul);
            data.forEach(function(elem) {
                var $li = $("<li>").addClass("clearfix").addClass("ncol");

                var $text = $("<p>").addClass("text").html("<a href='"+elem.url+"' target='_blank'>"+elem.name+"</a>");
                $li.append($text);

                var $opt = $("<div>").addClass("opt").addClass("optbtns");
                var $opedits = $("<div>").addClass("opedits").hide();
                var $editbtn = $("<a href=\"javascript:void(0);\" class=\"editbtn editopt\">编辑</a>");
                $opedits.append($editbtn);

                var $listall = $("<div class=\"listspan listall\">").hide();
                var $submit, $edit, $move, $del;
                // content id
                $submit = $("<a>").addClass("submit").attr("href", "javascript:;").attr("target", "_blank").attr("data-id", elem.id).text("提交");
                $edit = $("<a>").addClass("modify").addClass("modifybtn").attr("href", "javascript:;").attr("data-id", elem.id).text("编辑");
                $move = $("<a>").addClass("move").addClass("moveifybtn").attr("href", "javascript:;").attr("data-id", elem.id).text("移动");
                $del = $("<a>").addClass("delete").addClass("deleteifybtn").attr("href", "javascript:;").attr("data-id", elem.id).text("删除");
                $listall.append($submit).append($edit).append($move).append($del);

                $opedits.append($listall);
                $opt.append($opedits);
                $li.append($opt);

                $ul.append($li);

                // 编辑按钮 $opedits
                $li.on("mouseover", function() {
                    $opedits.show();
                }).on("mouseleave", function() {
                    $opedits.hide();
                });

                $editbtn.on("click", function() {

                }).on("mouseover", function() {
                    $listall.show();
                });

            });
            $ul.find("a").first().trigger("click");
        });

        $alist.not($t).removeClass("roots");
        $t.addClass("roots");

        NODE_ID = $t.attr("data-id");

        return false;
    });
    // END 点击节点获取内容

    $("#J_addcontent").on("click", function() {
        var nodeid = NODE_ID;  // 当前选中节点ID
        var $modaladd = $("#J_modal_add").css({"margin-top": "-133px", "margin-left": "-270px"});

    });
});
