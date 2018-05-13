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

            // $.ajax 编辑图谱
            $.ajax({
                type: 'POST',
                url: window.CONTEXT_PATH + "/Index/editStructure?structid=" + STRUCT_ID,
                data: {treedata: JSON.stringify(treedata)}
            }).done(function(data) {
                try {
                    if (0==data.code) {
                        location.href = "structure.html?structid=" + STRUCT_ID
                    } else {
                        // alert(JSON.stringify(data));
                        return o($(".createdoms .mapname .inputmap"), {
                            text: data.msg,
                            tag: "errorinfor"
                        }, !0), !1;
                    }
                } catch (e) {
                    alert(e);
                    window.location.reload();
                }
            });
        });
        // 删除图谱
        $delbtn.click(function(e) {
            e.preventDefault();
            var title = prompt("你保存在该图谱下的知识内容也会被删除，建议你先将内容移到其他图谱中。你确定要删除知识图谱及其内容吗？(请输入图谱名称)");
            $.ajax({
                type: 'GET',
                url: window.CONTEXT_PATH + "/Index/promptDeleteStructure",
                data: {title: encodeURI(title), structid: STRUCT_ID}
            }).done(function(data) {
                if (data.code) {
                    alert(data.msg);
                    return false;
                }
                window.location.href = "index.html";
            });
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
    var d = function() {
        var $div = $t.parent().parent().parent();

        if ($div.hasClass("divwrap")) {
            $div.parent().parent().remove();
        } else if ($div.hasClass("createdom")) {
            $div.remove();
        } else {
            console.info($div.get(0));
        }
    };
    // node exists?
    if (nodeid) {
        // xhr
        $.ajax({
            type: 'GET',
            url: window.CONTEXT_PATH + "/Index/deleteNode",
            data: {nodeid: nodeid}
        }).done(function(data) {
            console.log(data);
            if (data.code == 0) {
                // allow delete
                if (confirm("你确定要删除该知识节点吗？")) {
                    $.ajax({
                        type: 'POST',
                        url: window.CONTEXT_PATH + "/Index/doDelNodes",
                        data: {nodeIdList: JSON.stringify(data.nodeIdList)}
                    }).done(function(resp) {
                        console.log(resp.count + " nodes deleted!");
                        d();
                    })
                }
            } else {
                alert("无法删除该知识节点，因该节点下仍保存有相关知识内容！");
            }
        });

    } else {
        // new node
        d();
    }

    return false;
}

/**
 * 保存修改 错误
 * @param e: $(".createdoms .mapname .inputmap")
 * @param t: "{text: data.msg, tag: 'errorinfor'}"
 * @param n: !0
 * @returns {boolean}
 */
function o(e, t, n) {
    var a, r;
    if (a = t.text || "", r = t.tag, e.length <= 0 || !r) return !1;
    if (e.next("." + r).length <= 0 && !0 === n) e.after($("<span class='" + r + "'>" + a + "</span>"));
    else if (e.next("." + r).length > 0 && !1 === n) return e.next("." + r).empty().remove(), !1
}