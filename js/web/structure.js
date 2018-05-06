/**
 * Created by Mch on 3/24/18.
 */
var STRUCT_ID, NODE_ID;

STRUCT_ID = UrlParam.hasParam('structid') ? UrlParam.param("structid") : 1; // default value for test
NODE_ID = UrlParam.hasParam('node') ? UrlParam.param('node') : null;

var $mask = null, nodetree;

var load_cookie = function(fn) {
    if ($.cookie) {
        fn.apply(this, arguments);
    } else {
        var script = new Script(function() {
            fn.apply(this, arguments);
        });
        script.set("./js/web/libs/jquery.cookie.js");
    }
};

// load structure info
$.get(window.CONTEXT_PATH + "/Index/structInfo", {'structid':STRUCT_ID}, function(data) {
    var url = data.url;
    // relative url to absolute url
    if (url.indexOf('http://')<0 || url.indexOf('https://')<0) {
        var prefix = location.href.substring(0, location.href.lastIndexOf('/'));
        function ltrim(s, c) {
            (typeof c === "undefined") && (c = ' ');
            var i;
            for (i = 0; i < s.length; i++) {
                if (s.charAt(i) != c && s.charAt(i) != c) break;
            }
            return s.substring(i, s.length);
        }
        url = prefix + '/'+ltrim(url, '/');
    }
    $("#J_struct_title").html("<a href='"+url+"'>"+data.title+"</a><em>(<i>包括"+data.n+"条内容</i>)</em>");
    $("#fe_text").attr("href", url).css("color", "#2092d9").text(url).css("color", "color: rgb(32, 146, 217)");
    $("#clip_button").attr("data-clipboard-text", url);
    // <script src=""></script>-->
    var script = new Script(function() {
        (new Script()).set("./js/web/my_clipboard.js");
    });
    script.set("./min/clipboard.min.js");
    $(".spantitle").html(data.title);

    var h = "chart.html?" + "structid=" + STRUCT_ID + "&title=" + encodeURIComponent(data.title);
    $("#J_preview").attr("href", h).prev().attr("href", h).attr("target", "_blank");
});

// load 左边收藏列表
$.ajax({
    type: 'GET',
    url: window.CONTEXT_PATH + "/Index/nodeTree",
    data: { structid: STRUCT_ID },
    cache: true
}).done(function(data) {
    var nodetree = data;

    var $menu = $("#J_menu").empty();
    var $box = $("<ul>").addClass("menubox").addClass("treeboxnew");
    $menu.append($box);
    // depth = 1;
    data.childs && data.childs.forEach(function(a) {
        var $li = $("<li>").attr("data-id", a.id);
        $box.append($li);
        var $whiteblank = $("<span>").addClass("whiteblank").html("<em class=\"cirle\"></em>");
        $li.append($whiteblank);
        var $a = $("<a>").attr("href", a.href).attr("data-id", a.id).attr("data-depth", 1);
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
            var $a = $("<a>").attr("data-id", b.id).attr("data-depth", 2); // addClass("roots") highlight
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
                var $a = $("<a>").attr("data-id", c.id).attr("href", c.href).attr("data-depth", 3);
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
                var $li = $("<li>").addClass("clearfix").addClass("ncol").attr("data-id", elem.id);

                var $text = $("<p>").addClass("text").html("<a href='"+elem.url+"' target='_blank'>"+elem.name+"</a>");
                $li.append($text);

                var $opt = $("<div>").addClass("opt").addClass("optbtns");
                var $opedits = $("<div>").addClass("opedits").hide();
                var $editbtn = $("<a href=\"javascript:void(0);\" class=\"editbtn editopt\">编辑</a>");
                $opedits.append($editbtn);

                var $listall = $("<div class=\"listspan listall\">").hide();
                var $edit, $move, $del;
                // content id
                // $submit = $("<a>").addClass("submit").attr("href", "javascript:;").attr("target", "_blank").attr("data-id", elem.id).text("提交");
                $edit = $("<a>").addClass("modify").addClass("modifybtn").attr("href", "javascript:;").attr("data-id", elem.id).text("编辑");
                $move = $("<a>").addClass("move").addClass("moveifybtn").attr("href", "javascript:;").attr("data-id", elem.id).text("移动");
                $del = $("<a>").addClass("delete").addClass("deleteifybtn").attr("href", "javascript:;").attr("data-id", elem.id).text("删除");
                $listall.append($edit).append($move).append($del);

                $opedits.append($listall);
                $opt.append($opedits);
                $li.append($opt);

                $ul.append($li);

                // 编辑按钮 $opedits
                $li.on("mouseover", function() {$opedits.show();}).on("mouseleave", function() {$opedits.hide();});

                $editbtn.on("click", function() {}).on("mouseover", function() {
                    $listall.show();
                });

                // 删除内容
                $del.on("click", function() {
                    var contentid = $(this).attr("data-id");
                    $.get(window.CONTEXT_PATH +'/Index/contentDel/id/' + contentid, function(data) {
                        $("#J_menu").find("a.roots").trigger("click");
                        console.log("delete "+data.count+" content#" + data.id);
                    });
                });
                // 编辑内容
                $edit.on("click", function() {
                    var $t = $(this);

                    $mask.show();
                    var $modal = $("#J_modal_edit").show();
                    $modal.css({
                        "margin-top": "-"+$modal.height()/2+"px",
                        "margin-left": "-"+$modal.width()/2+"px"
                    });
                    var $form = $modal.find("form");
                    $form.find("input[type='hidden']").val( $t.attr("data-id") );

                    var $li = $t.parent().parent().parent().parent();
                    var $a = $li.children(".text").children("a");
                    $form.find("input[name='name']").val($a.text());
                    $form.find("input[name='url']").val($a.attr("href"));
                });
                // 移动内容
                $move.on("click", function() {
                    $mask.show();
                    var $modal = $("#J_modal_move").show();
                    $modal.css({
                        "margin-top": "-"+$modal.height()/2+"px",
                        "margin-left": "-"+$modal.width()/2+"px"
                    });
                    var $form = $modal.find("form");
                    var $t = $(this);
                    $form.find("input[name='id']").val($t.attr("data-id"));
                    // 三级联动
                    var $sl = $modal.find(".selectlayer").empty();
                    var $sd1 = $("<div>").addClass("selectdiv").appendTo($sl);
                    var $select1 = $("<select>").appendTo($sd1);
                    nodetree.childs.forEach(function(node1) {
                        var $option = $("<option>").val(node1.id).html(node1.name);
                        $select1.append($option);
                    });
                    $select1.on("change", function() {
                        var node1 = nodetree.childs[this.selectedIndex];
                        var $sd2 = $sd1.next(), $sd3 = null;
                        if (!node1.childs) {
                            if ($sd2.length > 0) {
                                $sd2.remove();
                                $sd3 = $sd2.next();
                                0 < $sd3.length && $sd3.remove();
                            }
                            return !!0;
                        }
                        if ($sd2.length===0) {
                            $sd2 = $("<div>").addClass("selectdiv").appendTo($sl);
                        }
                        $sd2.empty();
                        var $select2 = $("<select>").appendTo($sd2);
                        node1.childs.forEach(function(node2) {
                            var $option = $("<option>").val(node2.id).html(node2.name);
                            $select2.append($option);
                        });
                        $select2.val(-1);  // force trigger change
                        $select2.val(0);
                        $select2.on("change", function() {
                            var node2 = node1.childs[this.selectedIndex];
                            $sd3 = $sd2.next();
                            if (!node2.childs) {
                                0 < $sd3.length && $sd3.remove();
                                return !!0;
                            }
                            if ($sd3.length === 0) {
                                if ($sd2.parent().children().length <=3 ) {
                                    $sd3 = $("<div>").addClass("selectdiv").appendTo($sl);
                                }
                            }
                            $sd3.empty();
                            var $select3 = $("<select>").appendTo($sd3);
                            node2.childs.forEach(function(node3) {
                                var $option = $("<option>").val(node3.id).html(node3.name);
                                $select3.append($option);
                            });
                            $modal.css({"margin-top": "-"+$modal.height()/2+"px"})
                        });
                    });
                    $select1.val(-1);  // force trigger change
                    console.log(nodetree);
                });
            });
            $ul.find("a").first().trigger("click");
        });

        $alist.not($t).removeClass("roots");
        $t.addClass("roots");

        NODE_ID = $t.attr("data-id");

        // put NODE_ID to cookie
        load_cookie( function () {
            $.cookie('nodeid', NODE_ID);
        } );

        var $p = $t.parent().parent();
        $p.show();
        $p.parent().parent().show();

        return false;
    });
    // END 点击节点获取内容

    // 刷新页面保存上次点击的node状态
    (function($aa) {
        var nodeid = null;
        load_cookie(function() {
            nodeid = UrlParam.hasParam('node') ? UrlParam.param('node') : $.cookie('nodeid');
            var i = 0, n = $aa.length, $a = null;
            var f = false;
            for (; i < n; i++) {
                $a = $aa.eq(i);
                if ($a.attr("data-id") == nodeid) {
                    $a.trigger("click");
                    f = true;
                }
            }
            f || $aa.first().trigger("click");
        });
    })($alist);

    // 新增内容 add nodeid > content
    $("#J_content_add").on("click", function() {
        var $modal = $("#J_modal_add");
        $mask.show();
        $modal.show();

        var modal = $modal.get(0);
        $modal.css({
            "margin-top": "-"+modal.clientHeight/2+"px",
            "margin-left": "-"+modal.clientWidth/2+"px"
        });

        var $a = $menu.find(".roots");
        var nodename = $a.text();
        var depth = parseInt($a.attr("data-depth"));

        switch (depth) {
            case 1: break;
            case 2:
                nodename = $a.parent().parent().prev().text() + " - " + nodename;
                break;
            case 3:
                var $p = $a.parent().parent().prev();
                nodename = $p.text() + " - " + nodename;
                $p = $p.parent().parent().prev();
                nodename = $p.text() + " - " + nodename;
                break;
            default:        
        }
        $modal.find(".inputs.path").text(nodename);

        // 当前选中节点ID
        $modal.find("input[type='hidden']").val(NODE_ID);
    });
    var $modaladd = $("#J_modal_add");
    $modaladd.find(".addbutn").on("click", function(e) {
        e.preventDefault();
        var $form = $modaladd.find("form");
        var $inputs = $form.find("input[type='text']");
        for (var i = 0, n = $inputs.length; i < n; i++) {
            var input = $inputs.get(i);
            input.value = $.trim(input.value);
            if (input.value.length===0) {
                input.nextElementSibling.style.display = 'block';
                return false;
            }
        }
        $.ajax({
            type: 'POST',
            url: window.CONTEXT_PATH + "/Index/contentAdd",
            data: $form.serialize()
        }).done(function(data) {
            $modaladd.find(".cancelbtn").trigger("click");  // modal.hide
            $("#J_menu").find("a.roots").trigger("click");  // refresh content list
            console.log("add content#" + data.id);
        }).always(function() {
            
        });
    });
    $modaladd.find(".cancelbtn").on("click", function() {
        $mask.hide();
        $modaladd.hide();
        $modaladd.find(".error").hide();
        var $form = $modaladd.find("form");
        $form.get(0).reset();   // reset form input
        $form.find(".error").hide();
    });

});

$(function() {
    // modal mask
    $mask = $("#J_mask").css({height:document.body.clientHeight, display:'none'});

    $(".closec").click(function(e) {
        e.preventDefault();
        var $t = $(this);
        var $modal = $t.parent().parent().parent().parent();
        $modal.hide();
        $modal.find(".error").hide();
        $mask.hide();
    });

    document.body.onkeydown = function(e) {
        switch (e.keyCode) {
            // Esc
            case 27: $mask.hide(); $(".windowLayer").hide(); break;
            default:
        }
    };

    // 修改内容
    var $modaledit = $("#J_modal_edit");
    $modaledit.find(".addbutn").on("click", function(e) {
        e.preventDefault();
        var $form = $modaledit.find("form");
        var $inputs = $form.find("input[type='text']");
        for (var i = 0, n = $inputs.length; i < n; i++) {
            var input = $inputs.get(i);
            input.value = $.trim(input.value);
            if (input.value.length===0) {
                input.nextElementSibling.style.display = 'block';
                return false;
            }
        }
        $.ajax({
            type: 'POST',
            url: window.CONTEXT_PATH + "/Index/contentEdit",
            data: $form.serialize()
        }).done(function(data) {
            $modaledit.find(".cancelbtn").trigger("click"); // modal.hide
            $("#J_menu").find("a.roots").trigger("click");  // refresh content list
        });
    });
    $modaledit.find(".cancelbtn").on("click", function(e) {
        e.preventDefault();
        var $t = $modaledit;
        $mask.hide();
        $t.hide();
        $t.find(".error").hide();
        var $form = $t.find("form");
        $form.get(0).reset();   // reset form input
        $form.find(".error").hide();
    });

    // 移动内容
    var $modalmove = $("#J_modal_move");
    $modalmove.find(".addbutn").on("click", function(e) {
        e.preventDefault();
        var $form = $modalmove.find("form");
        var $select = $modalmove.find(".selectdiv").last().children("select");
        var nodeid = $select.val();
        $form.find("input[name='nodeid']").val( nodeid );
        $.ajax({
            type: 'POST',
            url: window.CONTEXT_PATH + "/Index/contentMove",
            data: $form.serialize()
        }).done(function(data) {
            $modalmove.find(".cancelbtn").trigger("click"); // modal.hide
            $("#J_menu").find("a.roots").trigger("click");  // refresh content list
            console.log(data);
        }).always(function() {
            $modalmove.find(".selectlayer").empty();
        });
    });
    $modalmove.find(".cancelbtn").on("click", function(e) {
        e.preventDefault();
        var $t = $modalmove;
        $mask.hide(), $t.hide(), $t.find(".error").hide();
        var $form = $t.find("form");
        $form.get(0).reset();   // reset form input
        $form.find(".error").hide();
        $modalmove.find(".selectlayer").empty();
    });

    // 修改图谱node
    $("#J_edit").attr("href", "edit.html?structid=" + STRUCT_ID);
});

/**
 * 空内容的节点添加内容
 * @private
 */
function _addBtn() {
    $("#J_content_add").trigger("click");
}

