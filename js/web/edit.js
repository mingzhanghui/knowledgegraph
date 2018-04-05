/**
 * Created by Mch on 4/1/18.
 */
var script = new Script(function() {
    var STRUCT_ID = UrlParam.param("structid");
    $.get(window.CONTEXT_PATH + "/Index/structInfo", {'structid':STRUCT_ID}, function(data) {
        $("#J_struct_url").attr("href", "structure.html?structid=" + STRUCT_ID).empty().append(
            $("<span>").addClass("normals cur").text(data.title)
        );
        $("#J_title").val(data.title);
        $("#J_info").val(data.info);
    });

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
        });

        // 保存修改
        $addedit.click(function(e) {
            e.preventDefault();
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
            }).addClass("aplus createNewDom").html("<i class='fa fa-plus'></i>");

            var $trash = $("<a href='javascript:;'>").attr("data-baseid", c.id).on("click", function(e) {
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
            if (c.childs) {
                var $mapdom = $("<ul>").addClass("mapdom");
                c.childs.forEach(function(m) {
                    var $li = $("<li class='clearfix'>").appendTo($mapdom);
                    var $dompos = $("<div>").addClass("dompos").appendTo($li);
                    $dompos.append($("<span class='line'>").append($("<em>")));
                    var $divwrap = $("<div class='divwrap'>");
                    var $allwrap = $("<div class='allwrap'>");

                    var $editop =$("<div class='editop'>");
                    var $plus = $("<a href='javascript:;'>").on("click", function(e) {
                        e.preventDefault();
                    }).addClass("aplus createNewDom").html("<i class='fa fa-plus'></i>");
                    var $trash = $("<a href='javascript:;'>").attr("data-baseid", m.id).on("click", function(e) {
                    }).addClass("atrash delAllDom atagbtn").html("<i class='fa fa-trash'></i>");
                    $editop.append($plus).append($trash);

                    var $inputmap = $("<div>").addClass("inputmap").append(
                        $("<input type='text'>").attr("data-bid", m.id).val(m.name).attr("maxlength", 40)
                    );
                    $allwrap.append($editop).append($inputmap);

                    $divwrap.append($allwrap);

                    // level3
                    if (m.childs) {
                        var $md = $("<ul>").addClass("mapdom");
                        m.childs.forEach(function(d) {
                            var $li = $("<li class='clearfix'>").appendTo($md);
                            var $dp = $("<div>").addClass("dompos").appendTo($li);
                            $dp.append($("<span class='line'>").append($("<em>")));

                            var $dw = $("<div class='divwrap'>");
                            var $aw = $("<div class='allwrap'>");
                            $dw.append($aw);

                            var $et =$("<div class='editop'>");
                            var $ts = $("<a href='javascript:;'>").attr("data-baseid", d.id).on("click", function(e) {
                            }).addClass("atrash delAllDom atagbtn").html("<i class='fa fa-trash'></i>");
                            $et.append($ts);

                            var $im = $("<div>").addClass("inputmap").append(
                                $("<input type='text'>").attr("data-bid", d.id).val(d.name).attr("maxlength", 40)
                            );
                            $aw.append($et).append($im);
                            $dp.append($dw);
                        });
                        $divwrap.append($md);
                    }

                    $dompos.append($divwrap);
                });
                $createdom.append($mapdom);
            }
        });
        console.log(data);

    }.bind(tree);
});
script.set("./js/util/getUrlParam.js");

