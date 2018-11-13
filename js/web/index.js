/**
 * Created by Mch on 4/5/18.
 */
var PAGE_SIZE = 9, userid = UrlParam.param('userid') || $.cookie("ng_userid");

$(function() {
    var $box = $("#J_listbox");  // 我的图谱列表
    var $pages = $("#pages");    // 我的图谱分页

    var jqxhr = $.get(window.CONTEXT_PATH + "/Index/listStructures", {'userid': userid}, function(data) {
        var totalPage = Math.ceil( data.length / PAGE_SIZE ), slice = [];

        var render_list = function(slice) {
            $box.empty();
            slice.forEach(function(item) {
                var $li = $("<li>").appendTo($box);
                var $a = $("<a>").attr("href", "structure.html?structid=" + item.id);
                $("<div>").addClass("colorbox").appendTo($a);
                $("<div>").addClass("boxphoto").html("<img src=\"./images/web/newimgs/structimg.gif\">").appendTo($a);
                $("<div>").addClass("title").text(item.name).appendTo($a);
                $("<div>").addClass("numbs").html("<em>"+item.count+"</em>条知识内容").appendTo($a);
                $li.append($a);
            });
        };
        var render_pages = function(cur) {
            $pages.show().empty();
            var $nav = $("<div>").addClass("page-nav");
            var $b = $("<b>").attr("data-value", totalPage).html("共&nbsp;<i>"+data.length+"条"+totalPage+"页</i>");
            $nav.append($b);
            var $first = $("<a href=\"javascript:;\" data-page=\"1\" class=\"btn btn-xs btn-default\">首页</a>");
            $first.on("click", function() {
                slice = data.slice(0, PAGE_SIZE);
                render_pages(1);
                render_list(slice);
            });
            $nav.append($first);

            var $prev = $("<a href=\"javascript:;\" data-page=\""+(cur-1)+"\" class=\"btn btn-xs btn-default btn-prev\" title=\"上一页\">&lt;</a>");
            $prev.on("click", function() {
                cur = this.getAttribute("data-page");
                cur = parseInt(cur);
                cur = isNaN(cur) ? 1 : cur < 1 ? 1 : cur;
                slice = data.slice((cur-1)*PAGE_SIZE, cur*PAGE_SIZE);
                render_pages(cur);
                render_list(slice);
            });
            $nav.append($prev);

            // 中间的页码, 当前页每边2页
            var left=1, right=totalPage;
            if (totalPage > 5) {
                if (1 < cur-2) {
                    left = cur-2;
                }
                if (cur+2 < totalPage) {
                    right = cur + 2;
                }
                console.log(left, right);
            }
            var hasLeftEllipsis = false, hasRightEllipsis = false;

            for (var i = 0; i < totalPage; i++) {
                var pageNum = i+1;

                if (1<pageNum && pageNum <left) {
                    hasLeftEllipsis || $("<span>").text("...").appendTo($nav);
                    hasLeftEllipsis = true;
                    continue;
                }
                if (right<pageNum && pageNum<totalPage) {
                    hasRightEllipsis || $("<span>").text("...").appendTo($nav);
                    hasRightEllipsis = true;
                    continue;
                }

                var $a = $("<a href=\"javascript:;\" data-page=\""+pageNum+"\" class=\"btn btn-xs btn-default\">"+pageNum+"</a>");
                if (pageNum===cur) {
                    $a.addClass("active");
                }
                $a.on("click", function() {
                    cur = this.getAttribute("data-page");
                    cur = parseInt(cur);
                    cur = isNaN(cur) ? 1 : cur < 1 ? 1 : cur;
                    slice = data.slice((cur-1)*PAGE_SIZE, cur*PAGE_SIZE);
                    render_pages(cur);
                    render_list(slice);
                });
                $nav.append($a);
            }

            var $next = $("<a href=\"javascript:;\" data-page=\""+(cur+1)+"\" class=\"btn btn-xs btn-default btn-next\" title=\"下一页\">&gt;</a>");
            $next.on("click", function() {
                cur = this.getAttribute("data-page");
                cur = parseInt(cur);
                cur = isNaN(cur) ? totalPage : cur > totalPage ? totalPage : cur;
                slice = data.slice((cur-1)*PAGE_SIZE, cur*PAGE_SIZE);
                render_pages(cur);
                render_list(slice);
            });
            $nav.append($next);

            var $last = $("<a href=\"javascript:;\" data-page=\""+totalPage+"\" class=\"btn btn-xs btn-default\">末页</a>");
            $last.on("click", function() {
                slice = data.slice((totalPage-1)*PAGE_SIZE, data.length);
                render_pages(totalPage);
                render_list(slice);
            });
            $nav.append($last);

            $pages.append($nav);
        };

        if (totalPage < 2) {
            slice = data;
        } else {
            // 1st page
            slice = data.slice(0, PAGE_SIZE);
            render_pages(1);
        }
        render_list(slice);

        $(".tab.root").html("我的图谱("+data.length+")");  // 显示图谱个数 我的图谱(12)

    }).done(function() {
        console.log("done");
    }).fail(function(jqXHR, textStatus, errorThrown) {
        console.log("error: [" + textStatus + "] " + errorThrown);
    }).always(function() {
        console.log("complete");
    });

    jqxhr.complete(function() {
       console.log("second complete.");
    });
});
