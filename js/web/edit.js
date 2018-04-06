/**
 * Created by Mch on 4/1/18.
 */
var script = new Script(function() {
    var STRUCT_ID = UrlParam.param("structid");

    // load structure info
    $.get(window.CONTEXT_PATH + "/Index/structInfo", {'structid':STRUCT_ID}, function(data) {
        $("#J_struct_url").attr("href", "structure.html?structid=" + STRUCT_ID).empty().append(
            $("<span>").addClass("normals cur").text(data.title)
        );
        $("#J_title").val(data.title).attr("data-bid", data.rootid).on("blur", function() {
            if (0===this.value.length) {
                this.focus();
            }
        });
        $("#J_info").val(data.info);
    });

    // render tree
    var tree = null;
    $.ajax({
        type: 'GET',
        url: window.CONTEXT_PATH + "/Index/nodeTree",
        data: {'structid':STRUCT_ID}
    }).done(function(data) {
        var $tree = $(tree).empty();
        $tree.append($("<label>").html("图谱节点(限40字节):<em>最多可以添加三级节点</em>"));

        render(data);

        var $createNewDom = $("<a href='javascript:;'>").addClass("createNewDom").html("<i class=\"fa fa-plus\"></i>一级节点");
        var $createtext = $("<p class='createtext'>").append($("<span>").addClass("sblank")).append($createNewDom);
        $tree.append($createtext);

        var $submitdiv = $("<div>").addClass("submitdiv");
        var $addedit = $("<a href='javascript:;'>").text("保存修改").addClass("bc addsub addedit");
        var $delbtn = $("<a href='javascript:;'>").text("删除图谱").addClass("del delbtn");
        $submitdiv.append($addedit).append($delbtn);
        $tree.append($submitdiv);

        // +一级节点
        $createNewDom.click(function(e) {
            e.preventDefault();
            createDom1(this);
        });

        // 保存修改
        $addedit.click(function(e) {
            e.preventDefault();
            var $root = $("#J_title");  // 图谱名称==图谱根节点名称
            var treedata = {
                title: $root.val(),
                description: $("#J_info").val(),
                nid: $root.attr("data-bid"),
                dom: []
            };
            // check empty input
            var $inputs = $tree.find("input[type='text']");
            for (var i = 0, n = $inputs.length; i < n; i++) {
                var input = $inputs.get(i);
                var s = $.trim(input.value);
                if (0===s.length) {
                    input.focus();
                    return false;
                }
            }
            var $createdoms = $tree.children(".createdom");
            $createdoms.map(function() {
                var $t = $(this);  // .createdom
                var $n1 = $t.children(".allwrap").find("input[type='text']");
                var id, s;
                var dom1 = {title: $n1.val()};
                (id = $n1.attr("data-bid")) && (dom1.nid = id);
                (s = $n1.attr("data-status")) && (dom1.status = s);

                var $li2s = $t.children(".mapdom").children("li");
                if ($li2s.length>0) {
                    dom1.dom = [];
                    $li2s.map(function() {
                        var $allwrap2 = $(this).children(".dompos").children(".divwrap").children(".allwrap");
                        var $n2 = $allwrap2.find("input[type='text']");
                        var dom2 = {title: $n2.val()};
                        (id = $n2.attr("data-bid")) && (dom2.nid = id);
                        (s = $n2.attr("data-status")) && (dom2.status = s);

                        var $li3s = $allwrap2.next().children("li");
                        if ($li3s.length>0) {
                            dom2.dom = [];
                            $li3s.map(function() {
                                var $n3 = $(this).find("input[type='text']");
                                var dom3 = {title:$n3.val()};
                                (id = $n3.attr("data-bid")) && (dom3.nid = id);
                                (s = $n3.attr("data-status")) && (dom3.status = s);
                                dom2.dom.push(dom3);
                            });
                        }

                        dom1.dom.push(dom2);
                    });
                }

                treedata.dom.push(dom1);
            });

            alert(JSON.stringify(treedata));
            // $.ajax 编辑图谱
            /*
             * 删除node     这个node以及child nodes关联有知识内容content ? 不能删除 : 直接删除node，不等到按提交按钮
             * 新增node     {"title": "php",	"status": true} 该node没有"nid"字段表示是新增的node, 有status=true
             * 修改node名称 {"title": "linux111", "nid": 19046942,"status": true}, 带有nid字段，这个节点在数据库node表中的id，和status=true
             * node不变     {"title": "apache","nid": 19046943} 有nid字段，没有status字段
             */
        });
        // 删除图谱
        $delbtn.click(function(e) {
            e.preventDefault();
        });
    });
    tree = getId("J_tree");

    /**
     * render structure tree
     * @type {function(this:(*|jQuery|HTMLElement))}
     */
    var render = function(data) {
        var $t = $(this);

        // level 1
        data.childs && data.childs.forEach(function(c) {
            var $createdom = $("<div>").addClass("createdom");
            var $allwrap = $("<div>").addClass("allwrap clearfix");
            var $editop = $("<div>").addClass("editop");

            var $plus = $("<a href='javascript:;'>").on("click", function(e) {
                e.preventDefault();
                createDom2(this);
            }).addClass("aplus createNewDom").html("<i class='fa fa-plus'></i>");

            var $trash = $("<a href='javascript:;'>").attr("data-baseid", c.id).on("click", function(e) {
                deleteDom(this);
            }).addClass("atrash delAllDom atagbtn").html("<i class='fa fa-trash'></i>");

            $editop.append($plus).append($trash);
            $allwrap.append($editop);

            var $inputmap = $("<div>").addClass("inputmap");
            $("<input type='text'>").attr("data-bid", c.id).val(c.name)
                .attr("maxlength", 40).appendTo($inputmap);
            $allwrap.append($inputmap);

            $createdom.append($allwrap);
            $t.append($createdom);

            // level 2
            var $mapdom = $("<ul>").addClass("mapdom");
            if (c.childs) {
                c.childs.forEach(function(m) {
                    var $li = $("<li class='clearfix'>").appendTo($mapdom);
                    var $dompos = $("<div>").addClass("dompos").appendTo($li);
                    $dompos.append($("<span class='line'>").append($("<em>")));
                    var $divwrap = $("<div class='divwrap'>");
                    var $allwrap = $("<div class='allwrap'>");

                    var $editop =$("<div class='editop'>");
                    var $plus = $("<a href='javascript:;'>").on("click", function(e) {
                        e.preventDefault();
                        createDom3(this);
                    }).addClass("aplus createNewDom").html("<i class='fa fa-plus'></i>");
                    var $trash = $("<a href='javascript:;'>").attr("data-baseid", m.id).on("click", function(e) {
                        deleteDom(this);
                    }).addClass("atrash delAllDom atagbtn").html("<i class='fa fa-trash'></i>");
                    $editop.append($plus).append($trash);

                    var $inputmap = $("<div>").addClass("inputmap").append(
                        $("<input type='text'>").attr("data-bid", m.id).val(m.name).attr("maxlength", 40)
                    );
                    $allwrap.append($editop).append($inputmap);

                    $divwrap.append($allwrap);

                    // level3
                    var $md = $("<ul>").addClass("mapdom");
                    if (m.childs) {
                        m.childs.forEach(function(d) {
                            var $li = $("<li class='clearfix'>").appendTo($md);
                            var $dp = $("<div>").addClass("dompos").appendTo($li);
                            $dp.append($("<span class='line'>").append($("<em>")));

                            var $dw = $("<div class='divwrap'>");
                            var $aw = $("<div class='allwrap'>");
                            $dw.append($aw);

                            var $et =$("<div class='editop'>");
                            var $ts = $("<a href='javascript:;'>").attr("data-baseid", d.id).on("click", function(e) {
                                deleteDom(this);
                            }).addClass("atrash delAllDom atagbtn lastdom").html("<i class='fa fa-trash'></i>");
                            $et.append($ts);

                            var $im = $("<div>").addClass("inputmap").append(
                                $("<input type='text'>").attr("data-bid", d.id).val(d.name).attr("maxlength", 40)
                            );
                            $aw.append($et).append($im);
                            $dp.append($dw);
                        });
                    }
                    $divwrap.append($md);

                    $dompos.append($divwrap);
                });
            }
            $createdom.append($mapdom)
                .find(".inputmap input[type=text]")
                .on("change", function() {
                    $(this).attr("data-status", true)
                });
        });

        console.log(data);

    }.bind(tree);
});
script.set("./js/util/getUrlParam.js");

/**
 * + 一级节点
 * @param o
 */
function createDom1(o) {
    var $t = $(o), $p = $t.parent();
    var $c = $("<div class='createdom'>");
    $c.insertBefore($p);

    var $allwrap = $("<div class='allwrap clearfix'>");
    $c.append($allwrap);
    var $editop = $("<div class='editop'>");
    $allwrap.append($editop);
    var $inputmap = $("<div class='inputmap'>");
    $allwrap.append($inputmap);
    var $add = $("<a href=\"javascript:;\" class=\"aplus createNewDom\"><i class=\"fa fa-plus\"></i></a>");
    // + 二级节点
    $add.on("click", function(e) {
        e.preventDefault();
        createDom2(this);
    });
    var $del = $("<a href=\"javascript:;\" class=\"atrash delAllDom atagbtn\"><i class=\"fa fa-trash\"></i></a>");
    $del.on("click", function (e) {
        e.preventDefault();
        deleteDom(this);
    });
    $editop.append($add).append($del);
    var $input = $("<input type=\"text\" maxlength=\"40\">").on("change", function() {
       $(this).attr("data-status", true);
    });
    $inputmap.append($input);

    $("<ul class='mapdom'>").appendTo($c);
}

/**
 * + 二级节点
 */
function createDom2(o) {
    var $t = $(o);
    var $ul = $t.parent().parent().next();
    var $li = $("<li>").addClass("clearfix").appendTo($ul);
    var $dompos = $("<div>").addClass("dompos").appendTo($li);
    $dompos.append($("<span class='line'>").append($("<em>")));
    var $c = $("<div class='divwrap'>").appendTo($dompos);

    var $allwrap = $("<div class='allwrap clearfix'>");
    $c.append($allwrap);
    var $editop = $("<div class='editop'>");
    $allwrap.append($editop);
    var $inputmap = $("<div class='inputmap'>");
    $allwrap.append($inputmap);
    var $add = $("<a href=\"javascript:;\" class=\"aplus createNewDom\"><i class=\"fa fa-plus\"></i></a>");
    // + 三级节点
    $add.on("click", function(e) {
        e.preventDefault();
        createDom3(this);
    });
    var $del = $("<a href=\"javascript:;\" class=\"atrash delAllDom atagbtn\"><i class=\"fa fa-trash\"></i></a>");
    $del.on("click", function (e) {
        e.preventDefault();
        deleteDom(this);
    });
    $editop.append($add).append($del);
    var $input = $("<input type=\"text\" maxlength=\"40\">").on("change", function() {
        $(this).attr("data-status", true);
    });
    $inputmap.append($input);

    $("<ul class='mapdom'>").appendTo($c);
}

/**
 * + 三级节点
 */
function createDom3(o) {
    var $t = $(o);
    var $ul = $t.parent().parent().next();

    var $li = $("<li>").addClass("clearfix").appendTo($ul);
    var $dompos = $("<div>").addClass("dompos").appendTo($li);
    $dompos.append($("<span class='line'>").append($("<em>")));
    var $c = $("<div class='divwrap'>").appendTo($dompos);

    var $allwrap = $("<div class='allwrap clearfix'>");
    $c.append($allwrap);
    var $editop = $("<div class='editop'>");
    $allwrap.append($editop);
    var $inputmap = $("<div class='inputmap'>");
    $allwrap.append($inputmap);
    var $del = $("<a href=\"javascript:;\" class=\"atrash delAllDom atagbtn lastdom\"><i class=\"fa fa-trash\"></i></a>");
    $del.on("click", function (e) {
        e.preventDefault();
        deleteDom(this);
    });
    $editop.append($del);
    var $input = $("<input type=\"text\" maxlength=\"40\">").on("change", function() {
        $(this).attr("data-status", true);
    });
    $inputmap.append($input);

    $("<ul class='mapdom'>").appendTo($c);
}

/**
 * 删除节点
 * @param o
 */
function deleteDom(o) {
    var $t = $(o);
    var nodeid = $t.attr("data-baseid");
    if (nodeid) {
        // confirm ? continue : return false
        // xhr
    }
    var $div = $t.parent().parent().parent();

    if ($div.hasClass("divwrap")) {
        $div.parent().parent().remove();
    } else if ($div.hasClass("createdom")) {
        $div.remove();
    } else {
        console.info($div.get(0));
    }
}