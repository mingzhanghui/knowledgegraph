!function (golbal, unf) {
    var g, $, doc, csdn, exports = {},
        knowledge_web;
    g = golbal || "window", doc = g.document || void 0, ($ = g.jQuery ? g.jQuery : void 0) (function () {
        csdn = g.csdn || exports, function (fun) {
            !function (g, $, unf) {
                knowledge_web = {
                    init: function (fn) {
                        var This = this,
                            rthis = this;
                        if (This.recordingArr = [], This.recordingDataArr = [], This.recordIds = [], This.urls = {
                                treeurl: "/expert/init_base_tree",
                                doYes: "/expert/yes",
                                doNo: "/expert/no",
                                recommend: "/expert/recommend",
                                doCancle: "/expert/cancle",
                                menurl: "/sub/:id/detail",
                                attentionurl: "../../test/test.php",
                                leavemsgurl: "/assemble/submitfeedback",
                                getstructurl: "/my/getstruct",
                                simpleopturl: {
                                    addurl: "/my/structure/content/add",   // 增加知识内容
                                    modifyurl: "/my/structure/content/modify",
                                    moveifyurl: "/my/structure/content/move",
                                    deleteifyurl: "/my/structure/content/delete"  // 删除知识内容:
                                },
                                treeurls: "/ajax/singleContent",
                                othertreeurls: "/ajax/other/singleContent",
                                taburls: "/ajax/singleKlg",
                                selecturls: "/ajax/getChildNodes",
                                structmapurl: "/my/getHandbookDetail",
                                noticeurl: "/user/delMaskStatus",
                                delrubbishurl: "/ajax/deleteNode",
                                releaseurl: "/my/structure/share",
                                deletedomurl: "/ajax/deleteStructure",
                                // addtreedataurl: "/ajax/createStructure",
                                addtreedataurl: window.CONTEXT_PATH + "/Index/createStructure",
                                edittreedataurl: "/ajax/handleStructure",
                                suburl: "/subContent",
                                importUrl: "/ajax/importArticle",
                                treeUpdateSortUrl: "/ajax/updateStructSort"
                            }, This.tagflgs = {
                                illustrflg: unf,
                                hotflg: unf
                            }, $(".tagcgl").length > 0 && (this.listhover($(".tablists > ul")), this.layer(function (obj) {
                                var funblock = This.funblock();
                                _id = obj.tagobj.attr("data-id"), _types = obj.tagobj.attr("data-type") || 0, This.recordIds.push(_id), _windowLayer = obj.windowLayerid, funblock._ajax({
                                    _url: This.urls.treeurl,
                                    _id: _id,
                                    _types: _types
                                }, function (reponse) {
                                    var re = reponse,
                                        status = re.status,
                                        title = re.title,
                                        html = re.html,
                                        selectedhtml = re.selectedhtml;
                                    status && ($("#" + _windowLayer + " .title em").html(""), $("#" + _windowLayer + " .scrollMenu").html(""), $("#" + _windowLayer + " .selectlist ul").html(""), $("#" + _windowLayer + " .title em").html(title), $("#" + _windowLayer + " .scrollMenu").append($(html)), $("#" + _windowLayer + " .selectlist ul").html($(selectedhtml)), $("#" + _windowLayer + " .listselect").html(""), $("#" + _windowLayer + " .coltitle").addClass("hide")), funblock._scrollBar(), funblock._treeMenu(), funblock._rubdate(function (reponse) {
                                        var re = "object" === (typeof reponse).toLowerCase() ? reponse : eval("(" + reponse + ")"),
                                            status = re.status,
                                            tabid = re.tabid || "";
                                        status && ($(".listselect li a[data-id=" + tabid + "]").length > 0 && ($(".listselect li a[data-id=" + tabid + "]").removeClass("root"), $(".listselect li a[data-id=" + tabid + "]")[0].tag = !1), funblock._scrollBar())
                                    })
                                }), funblock._scrollBar(), funblock._submitform()
                            }), this.ajaxDelete()), $(".treerlist").length > 0) {
                            var mid = $("#maintitle").length > 0 ? $("#maintitle").attr("data-mid") : "";
                            This.funblock()._treeMenu()
                        }
                        $(".menuslist").length > 0 && this.menuslist({
                            isajax: !0
                        }), $("#scrollDoc").length > 0 && $("#allbtns").length > 0 && this._scrollMove(), $("#nav_search_top").length > 0 && this._searchBar(), this._other(), $(".treebox").length > 0 && this._trees({
                            treetag: ".treebox",
                            tag: ".treebox li a",
                            afterfun: function (e) {
                                function t(e) {
                                    var t, n;
                                    n = e.callback, t = {
                                        oid: e.id
                                    }, $.ajax({
                                        url: e.url,
                                        type: "post",
                                        dataType: "json",
                                        data: t,
                                        async: !0,
                                        success: function (e) {
                                            n(e)
                                        }
                                    })
                                }

                                if ("a" == e.eventobj[0].tagName.toLowerCase()) {
                                    var n = e.elm.data("id") || e.elm.attr("data-id");
                                    e.elm.parent().parent().children("li").children("a").not(".noclick").next(".subul").find("em").each(function (e, t) {
                                        t.flg && (t.flg = unf, $(t).removeClass("iless").html(""), $(t).addClass("iplus").html("+"))
                                    }), e.elm.parent().parent().children("li").removeClass("licur").find("a").not(".noclick").removeClass("root"), e.elm.parent().parent().children("li").removeClass("licur").find("a").each(function (e, t) {
                                        $(t).hasClass("noclick") && ($(t).addClass("curgray"), $(t).parent().addClass("ligray"))
                                    }), e.elm.parent().parent().children("li").find(".subul").hide(), e.elm.parent().addClass("licur").removeClass("ligray"), t({
                                        url: e._This.urls.treeurls,
                                        id: n,
                                        callback: function (t) {
                                            var n, a, r, i;
                                            n = t.status, a = t.html, r = t.path, i = t.collection, n && (e.elm.parents(".structWrap").find(".subcontent").html(""), e.elm.parents(".structWrap").find(".subcontent").html(a), $(".addknowledgecontent .path").text(r), i ? $(".addtextou").hide() : $(".addtextou").show(), $(".modifybtn").length > 0 && rthis._layer({
                                                tag: ".editknowledgecontent",
                                                triggerbtn: ".modifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    var t, n, a;
                                                    rthis._checkstring(), rthis._determine("edit", e), $(".marklayer").css("height", $(doc).height()).show(), t = $(e.elm.parent().parent().parent().children("span").get(0)).find("a"), n = t.text(), a = t.attr("href"), $($(".editknowledgecontent .inputs input").get(0)).val(n), $($(".editknowledgecontent .inputs input").get(1)).val(a)
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".moveifybtn").length > 0 && rthis._layer({
                                                tag: ".knowledgecontentmove",
                                                triggerbtn: ".moveifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._movetag(), rthis._determine("move", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".deleteifybtn").length > 0 && rthis._layer({
                                                tag: ".deleteconfrim ",
                                                triggerbtn: ".deleteifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._determine("delete", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }))
                                        }
                                    }), e.elm.addClass("root").removeClass("curgray").next(".subul").show()
                                } else if ("em" == e.eventobj[0].tagName.toLowerCase()) e.elm.parent().parent().children("li").children("a").not(".noclick").find("em").not(e.eventobj).each(function (e, t) {
                                    t.flg && (t.flg = unf, $(t).removeClass("iless").html(""), $(t).addClass("iplus").html("+"))
                                }), e.elm.parent().parent().children("li").children("a").not(".noclick").next(".subul").hide(), e.eventobj[0].flg ? (e.elm.next(".subul").hide(), e.eventobj.html(""), e.eventobj.html("+").removeClass("iless").addClass("iplus"), e.eventobj[0].flg = unf) : (e.elm.next(".subul").show(), e.eventobj.html(""), e.eventobj.html("-").removeClass("iplus").addClass("iless"), e.eventobj[0].flg = !0);
                                else if ("span" == e.eventobj[0].tagName.toLowerCase()) {
                                    var n = e.elm.data("id") || e.elm.attr("data-id");
                                    e.elm.parent().parent().children("li").find("a").each(function (e, t) {
                                        $(t).hasClass("noclick") && $(t).addClass("curgray")
                                    }), e.elm.parent().parent().children("li").find("a").removeClass("root"), t({
                                        url: e._This.urls.treeurls,
                                        id: n,
                                        callback: function (t) {
                                            var n, a;
                                            n = t.status, a = t.html, path = t.path, n && (e.elm.parents(".structWrap").find(".subcontent").html(""), e.elm.parents(".structWrap").find(".subcontent").html(a), e.elm.removeClass("curgray").addClass("root"), $(".addknowledgecontent .path").text(path), $(".modifybtn").length > 0 && rthis._layer({
                                                tag: ".editknowledgecontent",
                                                triggerbtn: ".modifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    var t, n, a;
                                                    rthis._checkstring(), rthis._determine("edit", e), $(".marklayer").css("height", $(doc).height()).show(), t = $(e.elm.parent().parent().parent().children("span").get(0)).find("a"), n = t.text(), a = t.attr("href"), $($(".editknowledgecontent .inputs input").get(0)).val(n), $($(".editknowledgecontent .inputs input").get(1)).val(a)
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".moveifybtn").length > 0 && rthis._layer({
                                                tag: ".knowledgecontentmove",
                                                triggerbtn: ".moveifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._movetag(), rthis._determine("move", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".deleteifybtn").length > 0 && rthis._layer({
                                                tag: ".deleteconfrim ",
                                                triggerbtn: ".deleteifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._determine("delete", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }))
                                        }
                                    })
                                }
                            }
                        }), $(".treeboxnew").length > 0 && this._trees({
                            treetag: ".treeboxnew",
                            tag: ".treeboxnew li a",
                            beforefun: function () {
                                $(".treeboxnew .iconfa").each(function (e, t) {
                                    "block" === $(t).parent().next(".subul").css("display") || "block" === $(t).parent().parent().next(".subul").css("display") ? t.flg = !0 : t.flg = unf
                                })
                            },
                            afterfun: function (e) {
                                function t(e) {
                                    var t, n;
                                    n = e.callback, t = {
                                        oid: e.id,
                                        username: e.username
                                    }, $.ajax({
                                        url: e.url,
                                        type: "post",
                                        dataType: "json",
                                        data: t,
                                        async: !0,
                                        success: function (e) {
                                            n(e)
                                        }
                                    })
                                }

                                if ("em" == e.eventobj[0].tagName.toLowerCase()) {
                                    var n = e.elm.data("id") || e.elm.attr("data-id");
                                    e.elm.parent().parent().children("li").find("a").next(".subul").find(".iconfa").each(function (e, t) {
                                        t.flg && (t.flg = unf)
                                    }), e.elm.parent().parent().children("li").find("a").removeClass("roots"), e.elm.parent().parent().children("li").find("a").each(function (e, t) {
                                        $(t).hasClass("noclick") && ($(t).addClass("curgray"), $(t).parent().addClass("ligray"))
                                    }), e.elm.parent().siblings().find("a").removeClass("roots"), e.elm.addClass("roots"), e.elm.parent().removeClass("ligray"), t({
                                        url: e._This.urls.othertreeurls,
                                        id: n,
                                        username: $("#theOwner").val(),
                                        callback: function (e) {
                                            var t, n, a, r;
                                            t = e.status, n = e.html, a = e.path, r = e.collection, t && ($(".listuls").html(n), $(".addknowledgecontent .path").text(a), window._bd_share_main && window._bd_share_main.init(), r ? $(".importParent.addtextou").hide() : $(".importParent.addtextou").show(), $(".modifybtn").length > 0 && rthis._layer({
                                                tag: ".editknowledgecontent",
                                                triggerbtn: ".modifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    var t, n, a;
                                                    rthis._checkstring(), rthis._determine("edit", e), $(".marklayer").css("height", $(doc).height()).show(), t = $(e.elm.parents("li").children("span.text").get(0)).find("a"), n = t.text(), a = t.attr("href"), $($(".editknowledgecontent .inputs input").get(0)).val(n), $($(".editknowledgecontent .inputs input").get(1)).val(a)
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".moveifybtn").length > 0 && rthis._layer({
                                                tag: ".knowledgecontentmove",
                                                triggerbtn: ".moveifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._movetag(), rthis._determine("move", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".deleteifybtn").length > 0 && rthis._layer({
                                                tag: ".deleteconfrim ",
                                                triggerbtn: ".deleteifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._determine("delete", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }))
                                        }
                                    })
                                } else if (e.eventobj.hasClass("iconfa")) e.elm.parent().parent().children("li").find("a").find(".iconfa").not(e.eventobj).each(function (e, t) {
                                    t.flg && (t.flg = unf, $(t).removeClass("fa-angle-up"), $(t).addClass("fa-angle-down"), $(t).parent().next(".subul").find(".iconfa").removeClass("fa-angle-up").addClass("fa-angle-down"), $(t).parent().next(".subul").find("em").removeClass("iplus").addClass("iless"), $(t).parent().parent().find(".subul").hide(), $(t).parent().parent().removeClass("roots"))
                                }), e.elm.parent().parent().children("li").children("a").not(".noclick").next(".subul").hide(), e.eventobj[0].flg ? (e.elm.next(".subul").hide(), e.eventobj.parent().prev("em").removeClass("iplus").addClass("iless"), e.eventobj.removeClass("fa-angle-up").addClass("fa-angle-down"), "a" === e.eventobj.parent().parent()[0].tagName.toLowerCase() && e.eventobj.parent().parent().removeClass("roots"), e.eventobj[0].flg = unf) : (e.elm.next(".subul").show(), e.eventobj.parent().prev("em").removeClass("iless").addClass("iplus"), e.eventobj.removeClass("fa-angle-down").addClass("fa-angle-up"), e.eventobj[0].flg = !0);
                                else {
                                    if ("span" != e.eventobj[0].tagName.toLowerCase()) return !1;
                                    var n = e.elm.data("id") || e.elm.attr("data-id");
                                    e.elm.parents(".treeboxnew").find("a").each(function (e, t) {
                                        $(t).hasClass("noclick") && $(t).addClass("curgray")
                                    }), e.elm.parents(".treeboxnew").find("a").removeClass("roots"), t({
                                        url: e._This.urls.othertreeurls,
                                        id: n,
                                        username: $("#theOwner").val(),
                                        callback: function (t) {
                                            var n, a, r;
                                            n = t.status, a = t.html, r = t.path, n && ($(".importParent.addtextou").length > 0 && $(".importParent.addtextou").show(), $(".listuls").html(a), $(".addknowledgecontent .path").text(r), e.elm.removeClass("curgray").addClass("roots"), window._bd_share_main && window._bd_share_main.init(), $(".modifybtn").length > 0 && rthis._layer({
                                                tag: ".editknowledgecontent",
                                                triggerbtn: ".modifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    var t, n, a;
                                                    rthis._checkstring(), rthis._determine("edit", e), $(".marklayer").css("height", $(doc).height()).show(), t = $(e.elm.parents("li").children("span.text").get(0)).find("a"), n = t.text(), a = t.attr("href"), $($(".editknowledgecontent .inputs input").get(0)).val(n), $($(".editknowledgecontent .inputs input").get(1)).val(a)
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".moveifybtn").length > 0 && rthis._layer({
                                                tag: ".knowledgecontentmove",
                                                triggerbtn: ".moveifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._movetag(), rthis._determine("move", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }), $(".deleteifybtn").length > 0 && rthis._layer({
                                                tag: ".deleteconfrim ",
                                                triggerbtn: ".deleteifybtn",
                                                parentag: ".listall",
                                                fn: function (e) {
                                                    rthis._determine("delete", e), $(".marklayer").css("height", $(doc).height()).show()
                                                },
                                                beforefun: function () {
                                                    return rthis._verificaUser()
                                                }
                                            }))
                                        }
                                    })
                                }
                            }
                        }), $(".subtabs").length > 0 && $(doc).on("click", ".subtabs a", function (e) {
                            var t = $(this).data("kid") || $(this).attr("data-kid"),
                                n = $(this);
                            $(".subtabs a").removeClass("root"), $.ajax({
                                url: rthis.urls.taburls,
                                type: "post",
                                async: !0,
                                dataType: "json",
                                data: {
                                    kid: t
                                },
                                success: function (e) {
                                    var t, a, r, i, l;
                                    t = e.status, a = e.html, i = e.refer_url, r = e.hasContent, n.parent().siblings(".simpleresult").find(".refer-url").attr("href", i), l = e.path, $(".addknowledgecontent .path").text(l), t && (r ? (n.parent().siblings(".simpleresult").hide(), n.parent().siblings(".sublistlibox").html(""), n.parent().siblings(".sublistlibox").html(a).show()) : (n.parent().siblings(".sublistlibox").html(a).hide(), n.parent().siblings(".simpleresult").show()), n.addClass("root"), $(".modifybtn").length > 0 && rthis._layer({
                                        tag: ".editknowledgecontent",
                                        triggerbtn: ".modifybtn",
                                        parentag: ".listall",
                                        fn: function (e) {
                                            var t, n, a;
                                            rthis._checkstring(), rthis._determine("edit", e), $(".marklayer").css("height", $(doc).height()).show(), t = $(e.elm.parent().parent().parent().children("span").get(0)).find("a"), n = t.text(), a = t.attr("href"), $($(".editknowledgecontent .inputs input").get(0)).val(n), $($(".editknowledgecontent .inputs input").get(1)).val(a)
                                        },
                                        beforefun: function () {
                                            return rthis._verificaUser()
                                        }
                                    }), $(".moveifybtn").length > 0 && rthis._layer({
                                        tag: ".knowledgecontentmove",
                                        triggerbtn: ".moveifybtn",
                                        parentag: ".listall",
                                        fn: function (e) {
                                            rthis._movetag(), rthis._determine("move", e), $(".marklayer").css("height", $(doc).height()).show()
                                        },
                                        beforefun: function () {
                                            return rthis._verificaUser()
                                        }
                                    }), $(".deleteifybtn").length > 0 && rthis._layer({
                                        tag: ".deleteconfrim ",
                                        triggerbtn: ".deleteifybtn",
                                        parentag: ".listall",
                                        fn: function (e) {
                                            rthis._determine("delete", e), $(".marklayer").css("height", $(doc).height()).show()
                                        },
                                        beforefun: function () {
                                            return rthis._verificaUser()
                                        }
                                    }))
                                },
                                error: function () {
                                    alert("服务器请求失败！")
                                }
                            }), e.stopPropagation(), e.preventDefault()
                        })
                    },
                    _scrollMove: function () {
                        var e = $("#scrollDoc"),
                            t = e.children()[0],
                            n = $(t).children(),
                            a = n.eq(0).width() + 10,
                            r = n.length,
                            i = $("#allbtns"),
                            l = i.find(".leftbtn"),
                            o = i.find(".rightbtn"),
                            s = i.find(".graybtn"),
                            c = 0,
                            d = r % 2 == 0 ? r / 2 - 1 : Math.floor(r / 2);
                        l.on("click", function (e) {
                            return c >= 0 ? (c = 0, !1) : (c++, s.removeClass("rootspan"), s.eq(-c).addClass("rootspan"), $(t).stop().animate({
                                left: 2 * a * c
                            }, "slow", function () {
                                c >= 0 && l.removeClass("root"), o.addClass("root")
                            }), e.stopPropagation(), !1)
                        }), o.on("click", function (e) {
                            return --c < -d ? (c = -d, !1) : (s.removeClass("rootspan"), s.eq(-c).addClass("rootspan"), $(t).stop().animate({
                                left: 2 * a * c
                            }, "slow", function () {
                                c <= -d && o.removeClass("root"), l.addClass("root")
                            }), e.stopPropagation(), !1)
                        }), $(t).width(a * r)
                    },
                    _scrollBar: function () {
                        function e(e) {
                            var t, n, a, r, i;
                            if (t = e.find(".scrollDoc") || unf, n = parseFloat(e.outerHeight(), 10), a = parseFloat(t.outerHeight(), 10), r = e.find(".scrollblank") || unf, i = e.find(".scrollbars") || unf, i.pro = 0, t.max = a - n, i.max = parseFloat(r.outerHeight(), 10) - parseFloat(i.height(), 10), !(a > n)) return i.addClass("hide"), !1;
                            i.removeClass("hide"), function () {
                                function e() {
                                    $(doc).on("mousemove", function (e) {
                                        var n = i.y,
                                            a = e.clientY - n;
                                        return a <= 0 && (a = 0), a > i.max && (a = i.max), i.pro = a / i.max, i.css({
                                            top: a
                                        }), t.css({
                                            top: -i.pro * t.max
                                        }), e.stopPropagation(), !1
                                    }), $(doc).on("selectstart", function () {
                                        return !1
                                    })
                                }

                                function n() {
                                    $(doc).off("mousemove")
                                }

                                i.on("mousedown", function (t) {
                                    return i.y = t.clientY - parseFloat($(this).position().top, 10), e(), t.stopPropagation(), !1
                                }), $(doc).on("mouseup", function (e) {
                                    return n(), e.stopPropagation(), !1
                                })
                            }()
                        }

                        var t;
                        t = $(".addScroll") || unf, t.each(function (t, n) {
                            e($(n))
                        })
                    },
                    _searchBar: function () {
                        function e(e) {
                            e >= d && (1 == l ? (i.stop(), i.css({
                                position: "absolute",
                                left: 0,
                                top: 0,
                                opacity: 1
                            }), h = !1, clearTimeout(f), f = null) : (i.css({
                                position: "fixed",
                                right: p,
                                top: 12,
                                left: "auto"
                            }), h || (i.css({
                                opacity: 0
                            }), i.stop().animate({
                                opacity: 1
                            }, "slow"), h = !0)))
                        }

                        function t(e, t) {
                            if (e && t) {
                                o.removeClass("gray"), b = m + "/" + encodeURIComponent(e), y = v + "/" + encodeURIComponent(e);
                                var n = '<span style="cursor:pointer;">搜索 ' + o.val() + " 相关的知识内容</span>",
                                    a = "<span >搜索 " + o.val() + " 相关的知识库 >></span>";
                                c.children(".searchdefault").hide().siblings(".searchku").show().find(".totalr").html(n).attr("href", b).siblings(".hotsearchall").html(a).attr("href", y).show()
                            } else e ? (o.removeClass("gray"), _ = k + "/" + encodeURIComponent(e), x = w + "/" + encodeURIComponent(e), c.children(".searchdefault").hide().siblings(".searchku").show().find(".hotsearch").show().siblings(".resultp").attr("href", _).siblings(".hotsearch").attr("href", x).show()) : t ? (o.addClass("gray"), c.children(".searchku").hide().siblings(".searchdefault").show().siblings(".totalr").show()) : (o.addClass("gray"), c.children(".searchku").hide().siblings(".searchdefault").show())
                        }

                        function n() {
                            if (searchHistory && o.val()) {
                                var e = {
                                    id: o.val()
                                };
                                searchHistory.addHistory(e)
                            }
                        }

                        function a(e, t) {
                            var n = t;
                            t || (n = $("#search-form").attr("action") + "/" + encodeURIComponent(e)), location.pathname.indexOf("search") >= 0 ? window.location = n : window.open(n), o.blur(), c.hide()
                        }

                        var r = parseFloat($(doc.body).scrollTop(), 10),
                            i = $("#nav_search_top"),
                            l = i.parents(".mainindex").length > 0,
                            o = null,
                            s = null,
                            c = null,
                            d = 382,
                            u = !1,
                            h = !1,
                            f = null,
                            p = (parseFloat($(g).width(), 10) - 1170) / 2 + 15;
                        l ? ($(g).off("scroll"), h = !1) : $(g).on("scroll", function () {
                            if (clearTimeout(f), f = null, (r = parseFloat($(g).scrollTop(), 10)) < d) return i.stop(), i.css({
                                position: "absolute",
                                left: 0,
                                top: 0,
                                opacity: 1
                            }), h = !1, !1;
                            f = setTimeout(function () {
                                r = parseFloat($(g).scrollTop(), 10), e(r)
                            }, 100)
                        }), $(window).on("resize", function () {
                            p = (parseFloat($(g).width(), 10) - 1170) / 2 + 15, e(r)
                        }), o = i.find("input[type='text']"), s = i.find(".searchbtn"), c = i.find(".search_list");
                        var m, v, b, y, k, w, _, x, C = !!c.find(".totalr").length;
                        if (C ? (m = $(".search_list").children(".searchku").children(".totalr").attr("href"), v = $(".search_list").children(".searchku").children(".hotsearchall").attr("href")) : (k = $(".search_list").children(".searchku").children(".resultp").attr("href"), w = $(".search_list").children(".searchku").children(".hotsearch").attr("href")), o.length <= 0 || s.length <= 0 || c.length <= 0) return !1;
                        o.on("focus", function () {
                            var e = $(this).val();
                            "搜索知识..." == e ? ($(this).val(""), $(this).removeClass("gray"), c.children(".searchdefault").show().siblings(".searchku").hide(), c.show(), u = !0) : (t(e, C), c.show(), u = !0)
                        }), o.on("blur", function () {
                            $(this).val() || $(this).val("搜索知识..."), $(this).addClass("gray")
                        }), o.on("input", function () {
                            var e = $(this).val();
                            if (!u) return !1;
                            t(e, C)
                        }), $(doc).on("click", ".fa.fa-close", function (e) {
                            $(".resultp").first().html(""), searchHistory.clearHistories(), e.stopPropagation()
                        }), $(doc).on("click", ".last", function (e) {
                            return o.val($(this).text()), a(o.val()), e.stopPropagation(), !1
                        }), $(doc).on("click", ".searchdefault .search-li", function (e) {
                            if (n(), 0 == $(this).find(".last").length) {
                                var t = $(this).first().children(0).attr("href");
                                location.pathname.indexOf("search") >= 0 ? window.location = t : window.open(t), c.hide()
                            } else {
                                o.val(searchHistory.getHistories()[0].id);
                                a(o.val())
                            }
                            return o.blur(), e.stopPropagation(), !1
                        }), $(doc).on("click", ".searchku .search-li", function (e) {
                            if ($(this).first().hasClass("tuwens")) window.open($(this).find("a").attr("href")), o.val("搜索知识..."), c.hide();
                            else {
                                var t = o.val(),
                                    r = $(this).attr("href");
                                n(), a(t, r)
                            }
                            return e.stopPropagation(), !1
                        }), $(doc).on("click", ".searchbtn", function (e) {
                            if (c.find(".selected").length > 0) c.find(".selected").click();
                            else {
                                var t = o.val();
                                n(), a(t)
                            }
                            return e.stopPropagation(), !1
                        }), $(doc).on("click", function (e) {
                            c.hide(), u = !1, e.stopPropagation()
                        }), o.on("click", function (e) {
                            e.stopPropagation()
                        })
                    },
                    _layer: function (e) {
                        var t, n, a, n, r, i, l, o = this;
                        if (t = e.tag || ".windowLayer", r = e.parentag || doc, i = e.fn, fun = e.beforefun, l = e.tagid, e.isopen = !0, a = e.triggerbtn || ".triggerbtn", n = e.dataid || "no-id", $(g).height(), !a) return !1;
                        $(r).find(a).off("click"), $(r).find(a).on("click", function a(r) {
                            return l && (n = $(this).attr(l)), fun && (e.isopen = fun({
                                elm: $(this),
                                id: n,
                                _This: o,
                                funame: a
                            })), !!e.isopen && ($(t).show(), $(t).css({
                                "margin-top": -$(t).outerHeight() / 2,
                                "margin-left": -$(t).outerWidth() / 2
                            }), i && i({
                                elm: $(this),
                                id: n,
                                _This: o,
                                funame: a
                            }), r.stopPropagation(), !1)
                        }), $(doc).off("click", t + " .closec"), $(doc).on("click", t + " .closec", function (e) {
                            return $(t).hide(), e.stopPropagation(), !1
                        }), $(t + " .cancelbtn").off("click"), $(t + " .cancelbtn").on("click", function (e) {
                            return $(t).hide(), e.stopPropagation(), e.preventDefault(), !1
                        })
                    },
                    _editcollect: function (e) {
                        function t(e, t, n) {
                            $(".windowLayer .confrim_btn").length > 0 && ($(".windowLayer .confrim_btn").off("click"), $(".windowLayer .confrim_btn").attr("data-id", t).on("click", function (a) {
                                if (!n._This._verificaUser()) return !1;
                                var r, i, l = $(this);
                                1 == e && (r = 1), 2 == e && (r = l.parent().siblings(".collectwrap").find("input[type=radio]:checked").val(), i = l.parent().siblings(".collectwrap").find("option:selected").attr("data-id")), 3 == e && (r = 2, i = l.parent().siblings(".collectwrap").find("option:selected").attr("data-id"));
                                var o = t.split("-")[3] ? t.split("-")[3] : 0;
                                return $.ajax({
                                    url: "/collection/add",
                                    async: !0,
                                    type: "post",
                                    data: {
                                        action: r,
                                        kid: t,
                                        uBase: i
                                    },
                                    dataType: "json",
                                    success: function (e) {
                                        var t;
                                        t = e.status, t ? (l.parents(".windowLayer").find(".closec").trigger("click"), 2 == o ? n.elm.addClass("ysharebtn csuccess").removeClass("collectbtn").find("i").addClass("fa-star").removeClass("fa-star-o") : 3 != o && n.elm.addClass("ysharebtn").removeClass("collectbtn").find("em").text("已收藏"), 3 != o && ($(n.elm).off("click"), csdn.knowledge_web._navAttention && !csdn.knowledge_web._navAttention.flg && g.csdn.knowledge_web._navAttention(!0), n._This._layer({
                                            tag: ".collectcancel",
                                            triggerbtn: n.elm,
                                            parentag: ".dynamicollect",
                                            fn: n._This._cancelCollect,
                                            beforefun: function () {
                                                return n._This._verificaUser()
                                            }
                                        }))) : 1 == e.error ? window.location = "https://passport.csdn.net/account/login?backurl=" + encodeURI(location.href) : alert(e.error)
                                    },
                                    error: function () {
                                    }
                                }), a.stopPropagation(), !1
                            }))
                        }

                        var n;
                        n = e.elm.data("id") || e.elm.attr("data-id"), e.id = n, callback = e.callback, function (e) {
                            var n;
                            n = e.id, $(".marklayer").css("height", $(doc).height()).show(), $.ajax({
                                url: "/collection/check",
                                async: !0,
                                type: "post",
                                data: {
                                    id: n
                                },
                                dataType: "json",
                                success: function (a) {
                                    var r, i, l, o;
                                    r = a.status, i = a.html, l = a.type, o = a.error, r ? ($(".windowLayer.kn_sub_collect .checkradiro").html(i), t(l, n, e)) : 1 == o ? window.location = "https://passport.csdn.net/account/login?backurl=" + encodeURI(location.href) : $(".windowLayer.kn_sub_collect .collectwrap").html('<span class="pull-left">无法收藏</span>')
                                },
                                error: function () {
                                    $(".attenNewLayer .layerwrap").html('<p class="infor"><b>知识内容收藏失败！</b></p>')
                                }
                            })
                        }(e), $(".kn_sub_collect .confrim_btn").on("mouseup", function (e) {
                            1 === Number(e.which, 10) && $(".marklayer").hide()
                        })
                    },
                    _cancelCollect: function (e) {
                        var t;
                        $(".collectcancel .addconfirm").off("click"), $(".marklayer").css("height", $(doc).height()).show(), $(".collectcancel .addconfirm").on("click", function (n) {
                            t = e.elm.data("id") || e.elm.attr("data-id"), This = $(this);
                            var a = t.split("-")[0],
                                r = t.split("-")[3];
                            return $.ajax({
                                url: "/collection/del",
                                type: "post",
                                async: !0,
                                dataType: "json",
                                data: {
                                    contentId: a
                                },
                                success: function (t) {
                                    if (t.status) if (1 == r) {
                                        if (1 == $(".dynamicollect li").length) {
                                            $("ul.dynamicollect").html("");
                                            var n = $(".collectlist a.root").hasClass("all");
                                            (n || "1" == $(".collectlist a.all em").text()) && ($(".mycollect").remove(), $("div.kn_title").parent().append('<div class="noresult"><p class="clearfix"><i class="fa fa-frown-o"></i><span><em>你还没有收藏任何知识内容</em><br>可以将自己感兴趣的内容收藏到这里，以备随时查阅</span></p></div>'))
                                        } else e.elm.parents("li").remove();
                                        var n = $(".collectlist a.root").hasClass("all"),
                                            a = $(".collectlist a.root em"),
                                            i = $(".collectlist a.all em"),
                                            l = $(".collectlist a.all").next().find("em"),
                                            o = parseInt($(".collectlist a.root em").text()),
                                            s = parseInt($(".collectlist a.all em").text()),
                                            c = parseInt(l.text()),
                                            d = $(".collectlist > a").length;
                                        n && d > 2 ? i.text(s - 1) : n ? (i.text(s - 1), l.text(c - 1)) : (a.text(o - 1), i.text(s - 1))
                                    } else 0 == r ? e.elm.removeClass("ysharebtn").addClass("collectbtn").find("em").text("收藏") : 2 == r ? e.elm.addClass("collectbtn").removeClass("ysharebtn csuccess").find("i").addClass("fa-star-o").removeClass("fa-star") : 3 == r && (e.elm.removeClass("ysharebtn").addClass("collectbtn"), $(".dynamicollect .collectbtn").attr("title", "添加收藏"));
                                    else e.elm.hasClass("collect") ? e.elm.addClass("collectbtn").removeClass("ysharebtn csuccess").find("i").addClass("fa-star-o").removeClass("fa-star") : e.elm.removeClass("ysharebtn").addClass("collectbtn").find("em").text("收藏");
                                    This.parents(".collectcancel").find(".closec").trigger("click"), $(e.elm).off("click"), $(".marklayer").hide(), e._This._layer({
                                        tag: ".kn_sub_collect",
                                        triggerbtn: e.elm,
                                        parentag: ".dynamicollect",
                                        fn: e._This._editcollect,
                                        beforefun: function () {
                                            return e._This._verificaUser()
                                        }
                                    })
                                },
                                error: function () {
                                    $(".attenNewLayer .layerwrap").html('<p class="infor"><b>取消收藏失败！</b></p>')
                                }
                            }), n.stopPropagation(), !1
                        })
                    },
                    _fixedlayer: function (e) {
                        var t = this;
                        "finished" === e && ($(".illustrations").show(), t.tagflgs.illustrflg = !0), "lighted" === e && ($(".hotlight").show(), t.tagflgs.hotflg = !0), t.tagflgs.illustrflg && $(".illustrations").stop().animate({
                            bottom: 10
                        }, "fast"), t.tagflgs.hotflg && $(".hotlight").stop().animate({
                            bottom: 10
                        }, "fast"), t.tagflgs.hotflg && t.tagflgs.illustrflg && $(".illustrations").stop().animate({
                            bottom: 10
                        }, "fast", function () {
                            $(".hotlight").stop().animate({
                                bottom: 82
                            }, "fast")
                        }), 0 == t.tagflgs.hotflg && 0 == t.tagflgs.illustrflg && e === unf && ($(".illustrations").css({
                            bottom: -82
                        }).hide(), $(".hotlight").css({
                            bottom: -82
                        }).hide())
                    },
                    _notice: function (e) {
                        var t = this;
                        $.ajax({
                            url: t.urls.noticeurl,
                            type: "get",
                            async: !0,
                            data: {
                                itype: e
                            },
                            success: function (e) {
                                var t;
                                (t = e.type) && console.log("success")
                            },
                            error: function () {
                                alert("请求失败!")
                            }
                        })
                    },
                    _trees: function (e, t) {
                        var n, a, r, i, l = !1,
                            o = this;
                        return "function" == typeof e ? (t = e, e = null, t()) : (n = e.treetag || "no", a = e.tag || "no", r = e.beforefun ||
                            function () {
                                return !1
                            }, i = e.afterfun ? (aftercall = t, t = null, e.afterfun) : (aftercall = null, t), "no" == n ? (alert("请设置treebox"), !1) : "no" == a ? (alert("请设置点击tag"), !1) : (r && r({
                            elm: $(a),
                            _This: o
                        }), void $(a).on("click", function (e) {
                            if (l = l || r()) return !1;
                            var t = {
                                isby: l,
                                elm: $(this),
                                eventobj: $(e.target),
                                optobj: $(this),
                                _This: o
                            };
                            return aftercall && (t.aftercall = aftercall), i(t), e.preventDefault(), e.stopPropagation(), !1
                        })))
                    },
                    _other: function () {
                        function e(e) {
                            var n, a, r, i, l, o = !1;
                            if (a = $("#textarea"), l = $(".leavemessage"), a.length > 0 && a.on("blur", function () {
                                    return setTimeout(function () {
                                        if (n = $.trim(a.val()), "" == n ? (r = "留言不能为空", o = !0) : n.length > 100 ? (r = "输入的文字超过20个字", o = !0) : (o = !1, r = unf, i = unf), o) {
                                            if (i == r) return !1;
                                            $(a).next(".error").show().find("em").text(r), i = r
                                        } else $(a).next(".error").hide().find("em").text(""), r = unf, i = unf
                                    }, 0), o
                                }), l.length > 0) {
                                var s;
                                l.find(".subtj").length > 0 && (s = l.find(".subtj"), s.off("click"), s.on("click", function (n) {
                                    a.blur(), setTimeout(function () {
                                        t(e, o)
                                    }, 0), n.stopPropagation(), n.preventDefault()
                                }))
                            }
                        }

                        function t(e, t) {
                            if (t) return !1;
                            $.ajax({
                                url: e._This.urls.leavemsgurl,
                                type: "post",
                                async: !0,
                                dataType: "json",
                                data: {
                                    content: $.trim($(".leavemessage textarea").val())
                                },
                                success: function (e) {
                                    e.status && ($(".leavemessage .closec").trigger("click"), $(".leavemessage textarea").val(""), $(".marklayer").hide(), $(".leavemessageinfor .tiggerbtn").off("click"), f._layer({
                                        tag: ".leavemessageinfor",
                                        triggerbtn: ".tiggerbtn",
                                        parentag: ".addtrigger",
                                        fn: function (e) {
                                        },
                                        beforefun: function (e) {
                                            return !0
                                        }
                                    }), $(".tiggerbtn").trigger("click"))
                                },
                                error: function (e) {
                                    alert(e)
                                }
                            })
                        }

                        function n() {
                            var e;
                            if ($(".releaselayer .selectbox").length > 0 && (e = $(".releaselayer .selectbox .sharediv select"), e.length > 0)) {
                                e.off("click");
                                var t = e.eq(0).find("option:selected").attr("data-type");
                                e.eq(1).find("option").hide(), e.eq(1).find("option[data-type=" + t + "]").show().eq(0).attr("selected", !0), e.on("change", function () {
                                    var t = $(this).find("option:selected").data("type") || $(this).find("option:selected").attr("data-type");
                                    $(this).find("option:selected").data("id") || $(this).find("option:selected").attr("data-id");
                                    0 != $(this).parent().prev(".sharediv").index() && e.not($(this)).find("option").hide(), e.not($(this)).find("option[data-type=" + t + "]").show().eq(0).attr("selected", !0)
                                })
                            }
                        }

                        function a(e, t) {
                            var n;
                            $(".releaselayer .addconfirm").length > 0 && (n = $(".releaselayer .addconfirm"), n.off("click"), n.on("click", function () {
                                var a, r, i, l, o, s, c;
                                return l = n.parents(".releaselayer").find(".sharediv select"), o = n.parents(".releaselayer").find(".textareabox textarea"), s = o.data("text") || o.attr("data-text"), a = l.eq(0).find("option:selected").data("id") || l.eq(0).find("option:selected").attr("data-id"), r = l.eq(1).find("option:selected").data("id") || l.eq(0).find("option:selected").attr("data-id"), i = $.trim(o.val()), s === i && (i = ""), c = l.eq(1).find("option:selected").text(),
                                    $.ajax({
                                        url: e._This.urls.releaseurl,
                                        async: !0,
                                        type: "post",
                                        dataType: "json",
                                        data: { 
                                            bid: $("#bid").val(),
                                            oassort: a,
                                            obid: r,
                                            desc: i,
                                            sname: c
                                        },
                                        success: function (e) {
                                            t ? t(e) : console.log("提供请求回调接口!")
                                        },
                                        error: function () {
                                        }
                                    }), !1
                            }), $(".releaselayer .textareabox textarea").blur(function () {
                                $.trim($(this).val()) != ($(this).data("text") || $(this).attr("data-text")) ? $(this).addClass("lightgray") : $(this).removeClass("lightgray")
                            }))
                        }

                        function r(e) {
                            var t, n, a = "",
                                r = "",
                                i = "";
                            t = e.parent().parent().next(".mapdom").length, r = '<a href="" class="aplus createNewDom"><i class="fa fa-plus"></i></a>', n = e.closest(".allwrap").next(".mapdom").length <= 0 && e.closest(".createtext").length <= 0, !n && t <= 0 ? (a += '<div class="createdom"><div class="allwrap clearfix"><div class="editop"><a href="" class="aplus createNewDom"><i class="fa fa-plus"></i></a><a href="" class="atrash atagbtn"><i class="fa fa-trash"></i></a></div><div class="inputmap"><input type="text" placeholder="输入节点名称"></div></div><ul class="mapdom"></ul></div>', e.parent().before($(a))) : (1 == e.parents(".mapdom").length && (r = "", i = "lastdom"), n && (a += '<ul class="mapdom">', e.parent().parent().after($(a)), a = ""), a += '<li class="clearfix"><div class="dompos"><span class="line"><em></em></span><div class="divwrap"><div class="allwrap clearfix"><div class="editop">' + r + '<a href="" class="atrash atagbtn ' + i + '"><i class="fa fa-trash"></i></a></div><div class="inputmap"><input type="text" placeholder="输入节点名称"></div></div><ul class="mapdom"></ul></div></div></li>', e.parent().parent().next(".mapdom").append($(a)))
                        }

                        function i(e, t, n) {
                            var a;
                            if (t === unf || n === unf) return e.closest("li").length > 0 ? e.closest("li").empty().remove() : e.closest(".createdom").empty().remove(), !1;
                            t > 0 ? a = ".deletemaplayerall" : a = ".deletemaplayersimple", f._layer({
                                tag: a,
                                triggerbtn: e,
                                parentag: ".createdom",
                                dataid: n,
                                fn: function (e) {
                                    $(".marklayer").css("height", $(doc).height()).show(), $(".deletemaplayersimple .addconfirm,.deletemaplayerall .addconfirm").off("click"), $(".deletemaplayersimple .addconfirm,.deletemaplayerall .addconfirm").on("click", function () {
                                        $(".deletemaplayersimple,.deletemaplayerall").hide(), $(".marklayer").hide();
                                        $(this);
                                        return $.ajax({
                                            url: e._This.urls.delrubbishurl,
                                            type: "post",
                                            data: {
                                                bid: $("#user_base_id").val(),
                                                nid: n
                                            },
                                            dataType: "json",
                                            async: !0,
                                            success: function (t) {
                                                var n;
                                                n = t.status, n ? e.elm.closest("li").length > 0 ? e.elm.closest("li").empty().remove() : e.elm.closest(".createdom").empty().remove() : alert(t.err)
                                            },
                                            error: function () {
                                                throw "服务器请求失败！"
                                            }
                                        }), !1
                                    })
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), e.trigger("click")
                        }

                        function l(e, t) {
                            var n, a, r = $(".mapwrap .createdom"),
                                i = [],
                                l = {},
                                s = [];
                            r.length > 0 &&
                            function () {
                                function c(e) {
                                    var t = {};
                                    if (e.length > 0) {
                                        for (var a = 0, r = e.length; a < r; a++) if (e[a]) {
                                            if (t[e[a].title] && "" != t[e[a].title]) {
                                                n = !0;
                                                break
                                            }
                                            t[e[a].title] = 1
                                        }
                                        if (!n) for (var i = 0, l = e.length; i < l && (t[e[i].title] && delete t[e[i].title], e[i].dom && e[i].dom.length > 0); i++) c(e[i].dom)
                                    }
                                    return n
                                }

                                var d;
                                // 图谱名称
                                // <input placeholder="输入个人知识图谱名称" maxlength="20">
                                if (!$.trim($(".createdoms .mapname .inputmap input").val()))
                                    return o($(".createdoms .mapname .inputmap"), {
                                        text: "图谱名称不能为空",
                                        tag: "errorinfor"
                                    }, !0), !1;

                                if (o($(".createdoms .mapname .inputmap"), {
                                        text: "",
                                        tag: "errorinfor"
                                    }, !1),
                                        l.title = $.trim($(".createdoms .mapname .inputmap input[type=text]").val()),
                                        l.description = $.trim($(".createdoms .mapdesc .inputmap input[type=text]").val()), l.nid = $(".createdoms .mapname .inputmap input[type=text]").data("baseid") || $(".createdoms .mapname .inputmap input[type=text]").attr("data-baseid") || unf, l.status = $(".createdoms .mapname .inputmap input[type=text]").data("status") || $(".createdoms .mapname .inputmap input[type=text]").attr("data-status") || unf, r.each(function (e, t) {
                                        var n;
                                        if (n = $(t).children(".allwrap").find("input[type=text]"), $.trim(n.val())) return d = !0, !1;
                                        d = !1
                                    }), r.each(function (e, t) {
                                        var n, a;
                                        n = $(t).children(".allwrap").find("input[type=text]"), (a = $.trim(n.val())) && i.push(n.closest(".createdom"))
                                    }), d ? o($(".createdoms .mapwrap").not(".mapname").children(".createtext").find(".sblank"), {
                                        text: "",
                                        tag: "errorinfor"
                                    }, !1) : o($(".createdoms .mapwrap").not(".mapname").children(".createtext").find(".sblank"), {
                                        text: "图谱节点至少填写一个",
                                        tag: "errorinfor"
                                    }, !0), i.length > 0) {
                                    for (var u = 0, h = i.length; u < h; u++) {
                                        var f;
                                        if (f = $(i[u]).children(".allwrap").find("input[type=text]"), f.length > 0) {
                                            var p = function (e) {
                                                function t(e, l) {
                                                    n = n || $(e).closest(".allwrap").next(".mapdom"), e.each(function (e, o) {
                                                        var s, c = {};
                                                        $(o).closest(".mapdom").length > 0 ? $(o).closest(".mapdom").get(0) === n[0] ? (c.nextnode = $(o).closest(".allwrap").next(".mapdom"), c.title = $.trim($(o).val()), c.nid = $(o).data("bid") || $(o).attr("data-bid") || unf, c.status = $(o).data("status") || $(o).attr("data-status") || unf, r = c, r.nextnode && r.nextnode.find("li").length > 0 && "" === r.title ? a = !0 : (a = unf, delete r.nextnode), l.dom.push(r), i.length <= 0 && i.push(l)) : (c.nextnode = $(o).closest(".allwrap").next(".mapdom"), c.title = $.trim($(o).val()), c.nid = $(o).data("bid") || $(o).attr("data-bid") || unf, c.status = $(o).data("status") || $(o).attr("data-status") || unf, r.dom = r.dom || [], r.nextnode && r.nextnode.find("li").length > 0 && "" === r.title ? a = !0 : (a = unf, delete r.nextnode), c.nextnode && c.nextnode.find("li").length >= 0 && delete c.nextnode, r.dom.push(c)) : (c.title = $.trim($(o).val()), c.nid = $(o).data("bid") || $(o).attr("data-bid") || unf, c.status = $(o).data("status") || $(o).attr("data-status") || unf, s = n.find("input[type=text]"), s.length > 0 ? (c.dom = [], t(s, c)) : i.push(c))
                                                    })
                                                }

                                                var n, r, i = [];
                                                return t(e), i
                                            }(f);
                                            s.push(p[0])
                                        }
                                    }
                                    if (s.length > 0 && (l.dom = s), c(s), n) return o($(".createdoms .mapwrap").not(".mapname").children(".createtext").find(".sblank"), {
                                        text: "图谱同级别节点不能有重复的标题",
                                        tag: "errorinfor"
                                    }, !0), !1;
                                    if (o($(".createdoms .mapwrap").not(".mapname").children(".createtext").find(".sblank"), {
                                            text: "",
                                            tag: "errorinfor"
                                        }, !1), a) return o($(".createdoms .mapwrap").not(".mapname").children(".createtext").find(".sblank"), {
                                        text: "创建子节点内容父节点不能为空！",
                                        tag: "errorinfor"
                                    }, !0), !1;
                                    o($(".createdoms .mapwrap").not(".mapname").children(".createtext").find(".sblank"), {
                                        text: "",
                                        tag: "errorinfor"
                                    }, !1),
                                        /* create knowledge graph 创建知识图谱 */
                                        function (data, n) {
                                            var u;
                                            n.hasClass("addnew") ? u = e.urls.addtreedataurl : n.hasClass("addedit") && (u = e.urls.edittreedataurl),
                                                $.ajax({
                                                    url: u,
                                                    type: "post",
                                                    async: !0,
                                                    dataType: "json",
                                                    beforeSend: function(jqXHR, settings) {
                                                        jqXHR.widthCredentials = true;
                                                    },
                                                    xhrFields: {
                                                        widthCredentials: true
                                                    },
                                                    crossDoamin: true,
                                                    data: {
                                                        treedata: JSON.stringify(data),
                                                        userid: ng.user.utility.getcookie('ng_userid')
                                                    },
                                                    success: function (data) {
                                                        if (data.id) {
                                                            location.href = data.url;
                                                        } else {
                                                            return o($(".createdoms .mapname .inputmap"), {
                                                                text: data.err,
                                                                tag: "errorinfor"
                                                            }, !0), !1;
                                                        }
                                                        // console.log(JSON.stringify(data));
                                                    },
                                                    error: function () {
                                                        console.log(n);   // $("<a class='bc addsub addnew'>")
                                                        throw "服务器请求失败！"
                                                    }
                                                })
                                        }(l, t);   // l?
                                }
                            }()
                        }

                        function o(e, t, n) {
                            var a, r;
                            if (a = t.text || "", r = t.tag, e.length <= 0 || !r) return !1;
                            if (e.next("." + r).length <= 0 && !0 === n) e.after($("<span class='" + r + "'>" + a + "</span>"));
                            else if (e.next("." + r).length > 0 && !1 === n) return e.next("." + r).empty().remove(), !1
                        }

                        function s(e, t) {
                            $.ajax({
                                url: "/page/getbloglist",
                                type: "post",
                                dataType: "json",
                                data: e,
                                success: function (e) {
                                    var n, a;
                                    n = e.status, a = e.html, n && t.html("").html(a)
                                }
                            })
                        }

                        function c(e, t, n) {
                            var a;
                            $(e + " .tab a").length > 0 && $(e + " .tabcontent .selectcheck").length > 0 && (a = $(e + " .tabcontent .selectcheck"), t && t({
                                elems: $(e + " .tab a")
                            }), $(doc).on("click", e + " .tab a", function () {
                                return $(this).siblings().removeClass("root").end().addClass("root"), a.not($(a.get($(this).index()))).addClass("hide"), $(a.get($(this).index())).removeClass("hide"), n && n({
                                    obj: $(this)
                                }), !1
                            }))
                        }

                        function d(e) {
                            $(document).off("click", e), $(document).on("click", e, function () {
                                $(this).get(0).flg ? ($(this).get(0).flg = unf, $(this).removeClass("checkroot")) : ($(this).get(0).flg = !0, $(this).addClass("checkroot"))
                            })
                        }

                        function u(e) {
                            var t, n, a, r = {},
                                i = [],
                                l = $("#checkvalues");
                            $(e).each(function (e, l) {
                                n = $(l).data("id") || $(l).attr("data-id"), a = $(l).find(".check"), a.each(function (e, n) {
                                    var a = {};
                                    $(n).hasClass("checkroot") && (t = $(n).data("id") || $(n).attr("data-id"), a.title = $(n).next("em").text(), a.href = $(n).next("em").data("href") || $(n).next("em").attr("data-href"), i.push(a))
                                }), i.length > 0 && (r[n] = i), i = []
                            }), l.val("").val(JSON.stringify(r))
                        }

                        function h(e, t) {
                            var n, a, r;
                            $(e).length > 0 && (a = $(e), n = $(a).find('input[type="text"],textarea'), r = $(a).find(".subbtn"), n.off("focus"), n.off("blur"), n.off("input propertychange"), r.off("click"), n.on("focus", function () {
                                "" === $.trim($(this).val()) ? $(this).addClass("focusborder") : $(this).removeClass("focusborder")
                            }), n.on("input propertychange", function () {
                                var e = $.trim($(this).val());
                                if ("" != e) {
                                    if ($(this).removeClass("focusborder"), $(this).hasClass("texts") && e.length <= 20 || $(this).hasClass("textareas") && e.length <= 50) return $(this)[0].textvalue = "", !1;
                                    if ($(this)[0].textvalue) return $(this).val($(this)[0].textvalue), !1;
                                    ($(this).hasClass("texts") && e.length >= 20 || $(this).hasClass("textareas") && e.length >= 50) && ($(this).hasClass("texts") ? e = e.substring(0, 20) : $(this).hasClass("textareas") && (e = e.substring(0, 50)), $(this).val(e), $(this)[0].textvalue = e)
                                } else $(this).focus(), $(this)[0].textvalue = ""
                            }), n.on("blur", function () {
                                $(this).removeClass("focusborder")
                            }), r.on("click", function () {
                                var e = null,
                                    a = !1;
                                if (n.each(function (t, n) {
                                        if ("" === $.trim($(n).val()) && (a = !0, e = $(n)), a) return !1
                                    }), a) $(e).focus();
                                else {
                                    var r = $(".subknowledge .textput .texts").val(),
                                        i = $(".subknowledge .textput .textareas").val();
                                    $(".subknowledge").find(".texts,.textareas").val(""), $(".subknowledge").find(".texts,.textareas").removeClass("focusborder");
                                    var l = t;
                                    $.ajax({
                                        url: "/user/addnode",
                                        type: "POST",
                                        data: {
                                            id: t.id,
                                            name: r,
                                            desc: i
                                        },
                                        dataType: "json",
                                        success: function (e) {
                                            if (e.status) {
                                                $(".subknowledge .closec").trigger("click"), $(".marklayer").hide();
                                                var t = (/^\d+$/.test($(l.elm).siblings("em").text()) ? parseInt($(l.elm).siblings("em").text()) : 0) + 1;
                                                $(l.elm).siblings("em").text(t)
                                            }
                                        }
                                    })
                                }
                                return !1
                            }))
                        }

                        var f = this;
                        if ($(".listnewss").length > 0) {
                            $(".listnewss li").hover(function () {
                                clearTimeout($(this)[0].t), $(this)[0].t = null, $(this).addClass("root")
                            }, function () {
                                var e = $(this);
                                e[0].t = setTimeout(function () {
                                    $(e).removeClass("root")
                                }, 30)
                            })
                        }
                        if ($(".dynamicollect").length > 0) {
                            var p = $(".dynamicollect .triggerlayer");
                            p.length > 0 && p.each(function (e, t) {
                                $(t).hasClass("collectbtn") && f._layer({
                                    tag: ".kn_sub_collect",
                                    triggerbtn: $(t),
                                    parentag: ".dynamicollect",
                                    fn: f._editcollect,
                                    beforefun: function () {
                                        return f._verificaUser()
                                    }
                                }), $(t).hasClass("ysharebtn") && f._layer({
                                    tag: ".collectcancel",
                                    triggerbtn: $(t),
                                    parentag: ".dynamicollect",
                                    fn: f._cancelCollect,
                                    beforefun: function () {
                                        return f._verificaUser()
                                    }
                                })
                            }), $(".attenNewLayer .closec,.collectcancel .closec,.collectcancel .cancelbtn").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && $(".marklayer").hide()
                            })
                        }
                        if ($(".leavemessagebtn").length > 0 && (f._layer({
                                tag: ".leavemessage",
                                triggerbtn: ".triggerlayer",
                                parentag: ".addtrigger",
                                fn: function (t) {
                                    e(t), $(".marklayer").css("height", $(doc).height()).show()
                                },
                                beforefun: function (e) {
                                    return e._This._verificaUser()
                                }
                            }), $(".closec,.cancelbtn").on("mouseup", function () {
                                $(".marklayer").hide()
                            })), $(".getstructorimgbtn").length > 0 && (this._layer({
                                tag: ".collectNewLayer",
                                triggerbtn: $(".getstructorimgbtn"),
                                parentag: ".addgetstructor",
                                beforefun: function () {
                                    return f._verificaUser()
                                },
                                fn: function (e) {
                                    var t = $("#base_id").val() || e.elm.data("baseid") || e.elm.attr("data-baseid");
                                    $(".marklayer").css("height", $(document).height()).show(), $.ajax({
                                        url: "/my/getstruct",
                                        type: "post",
                                        async: !0,
                                        dataType: "json",
                                        data: {
                                            base_id: t
                                        },
                                        success: function (t) {
                                            if (t.status) {
                                                $(".collectNewLayer .layerwrap a").attr("href", t.structUrl), e.elm.removeClass("getstructorbtn").addClass("getstructorbtnend"), e.elm.off("click", e.funame), e.elm.attr("href", t.href);
                                                var n = Number(e.elm.find("em").text().match(/\((\d+)\)/)[1], 10) + 1,
                                                    a = (e.elm.find("em"), "我的知识图谱<em>(" + n + ")</em>");
                                                e.elm.attr("href", t.structUrl).html(a)
                                            }
                                        }
                                    })
                                }
                            }), $(".collectNewLayer .closec").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && $(".marklayer").hide()
                            })), $(".listboxhover li").length > 0 && $(".listboxhover li").hover(function () {
                                $(this).addClass("liroot")
                            }, function () {
                                $(this).removeClass("liroot")
                            }), $(".addknowledgec").length > 0 && (f._layer({
                                tag: ".addknowledgecontent",
                                triggerbtn: ".addknowledgec",
                                parentag: ".addtextou",
                                fn: function (e) {
                                    f._checkstring(), f._multistage({
                                        selectbox: ".addknowledgecontent .selectlayer .selectdiv",
                                        url: f.urls.selecturls,
                                        mlayer: 0
                                    }, function (e) {
                                        var t, n;
                                        t = e.status, n = e.html, elm = e.elm, t && ($(".addknowledgecontent .selectlayer .selectdiv").length <= 0 ? $(".addknowledgecontent .selectlayer").html(n) : (elm ? elm.parent().next(".selectdiv").length > 0 && elm.parent().nextAll().remove() : $(".addknowledgecontent .selectlayer").html(""), $(".addknowledgecontent .selectlayer").append(n)))
                                    }), f._determine("add", e), $(".marklayer").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".addknowledgecontent .closec,.addknowledgecontent .cancelbtn").on("mouseup", function (e) {
                                return 1 === Number(e.which) && ($(".inputs .error").hide(), $(".addknowledgecontent .inputs input").val(""), $(".marklayer").hide()), !1
                            })), $(".modifybtn").length > 0 && f._layer({
                                tag: ".editknowledgecontent",
                                triggerbtn: ".modifybtn",
                                parentag: ".listall",
                                fn: function (e) {
                                    var t, n, a;
                                    f._checkstring(), f._determine("edit", e), $(".marklayer").css("height", $(doc).height()).show(), t = $(e.elm.parents("li").children("span.text").get(0)).find("a"), n = t.text(), a = t.attr("href"), $($(".editknowledgecontent .inputs input").get(0)).val(n), $($(".editknowledgecontent .inputs input").get(1)).val(a)
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(doc).on("mouseup", ".editknowledgecontent .closec,.editknowledgecontent .cancelbtn", function (e) {
                                return 1 === Number(e.which) && ($(".inputs .error").hide(), $(".marklayer").hide()), !1
                            }), $(".moveifybtn").length > 0 && f._layer({
                                tag: ".knowledgecontentmove",
                                triggerbtn: ".moveifybtn",
                                parentag: ".listall",
                                fn: function (e) {
                                    f._movetag(), f._determine("move", e), $(".marklayer").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".knowledgecontentmove .closec,.knowledgecontentmove .cancelbtn").on("mouseup", function (e) {
                                return 1 === Number(e.which) && $(".marklayer").hide(), !1
                            }), $(".deleteifybtn").length > 0 && f._layer({
                                tag: ".deleteconfrim ",
                                triggerbtn: ".deleteifybtn",
                                parentag: ".listall",
                                fn: function (e) {
                                    f._determine("delete", e), $(".marklayer").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".deleteconfrim .closec,.deleteconfrim .cancelbtn").on("mouseup", function (e) {
                                return 1 === Number(e.which) && $(".marklayer").hide(), !1
                            }), $(".hotlayers").length > 0) {
                            var m = $(".hotmarke"),
                                v = $(".hotlayers"),
                                b = $(".my_knowledgewrap"),
                                y = $(".hotclosed");
                            if (knlayer = $(".hottile"), v.length <= 0) return !1;
                            m.css({
                                height: document.documentElement.scrollHeight
                            }).show(), v.css({
                                top: 100,
                                left: b.offset().left
                            }).show(), y.on("click", function () {
                                return v.hide(), m.hide(), f.flg = !1, !1
                            }), m.on("click", function () {
                                return v.hide(), m.hide(), b.hide(), f.flg = !1, !1
                            }), $(g).on("resize", function () {
                                f.flg && v.css({
                                    top: 100,
                                    left: b.offset().left
                                }).show()
                            })
                        }
                        if ($(".addstrutmap").length > 0) {
                            var k, w;
                            k = $(".addstrutmap"), w = k.find(".maptrigger"), $(".allstarts em"), w.length > 0 && f._layer({
                                tag: ".strutlayer ",
                                triggerbtn: ".maptrigger",
                                parentag: ".addstrutmap",
                                fn: function (e) {
                                    var t, n;
                                    n = e.elm.data("sid") || e.elm.attr("data-sid"), $.ajax({
                                        type: "get",
                                        url: "/my/getHandbookDetail",
                                        contentType: "application/json",
                                        dataType: "json",
                                        async: !0,
                                        data: {
                                            sid: n
                                        },
                                        success: function (n) {
                                            var a, r;
                                            a = n.status, r = n.html, a && ($(".strutlayer .strutcontent").html(""), $(".strutlayer .strutcontent").html(r), t = Number(e.elm.attr("data-star"), 10), $(".addscrolls").length > 0 && f._scrollBar())
                                        },
                                        error: function () {
                                            console.log("服务器请求失败！")
                                        }
                                    }), $(".structmarke").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".strutlayer .closec").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && ($(".structmarke").hide(), $(".strutlayer .strutcontent").html(""))
                            })
                        }
                        if (($(".illustrations").length > 0 || $(".hotlight").length > 0) && ($(".hotlight .closed,.illustrations .closed").on("click", function () {
                                var e;
                                return $(this).parents(".hotlightIllustrations").hide().css({
                                    bottom: -72
                                }), f.tagflgs.illustrflg = f.tagflgs.hotflg = !1, $(this).parent(".illustrations").length > 0 ? e = "1" : $(this).parent(".hotlight").length > 0 && (e = "2"), f._notice(e), !1
                            }), $(".hotlight .knillcontent a,.illustrations .knillcontent a").on("click", function () {
                                var e;
                                $(this).parents(".illustrations").length > 0 ? e = "1" : $(this).parents(".hotlight").length > 0 && (e = "2"), f._notice(e)
                            })), $(".addquestion").length > 0 && (f._layer({
                                tag: ".knillustwrap ",
                                triggerbtn: ".addquestion",
                                parentag: ".addquestioninfor",
                                fn: function (e) {
                                    $(".structmarke").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".knillustwrap .closec").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && $(".structmarke").hide()
                            })), $(".releaseTrigger").length > 0 && $(".releaselayer").length > 0 && (f._layer({
                                tag: ".releaselayer ",
                                triggerbtn: ".releaseTrigger",
                                parentag: ".subinfors",
                                fn: function (e) {
                                    $(".marklayer").css("height", $(doc).height()).show(), n(), a(e, function (e) {
                                        var t, n, a = "发送失败!";
                                        t = e.status, n = e.html, a = e.err || a, t ? $(".releaselayer .layercontent").html(n) : (1 == a && (window.location = "https://passport.csdn.net/account/login?backurl=" + encodeURI(location.href)), $(".errorp").find("em").html(a).end().show())
                                    })
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(document).on("mouseup", ".releaselayer .closec,.releaselayer .cancelbtn", function (e) {
                                1 === Number(e.which, 10) && ($(".marklayer").hide(), $(".rightp").hide(), $(".errorp").hide(), $(".releaselayer").hide(), $(".releaselayer .layercontent").html($(".layercontent.share-struct").html()), n())
                            })), $(".delbtn").length > 0 && $(".deletemaplayer").length > 0 && (f._layer({
                                tag: ".deletemaplayer ",
                                triggerbtn: ".delbtn",
                                parentag: ".submitdiv",
                                fn: function (e) {
                                    $(".marklayer").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".deletemaplayer .closec,.deletemaplayer .cancelbtn").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && $(".marklayer").hide()
                            }), $(".deletemaplayer .addconfirm").on("click", function () {
                                var e, t;
                                return e = $(".createdoms .mapname input[type=text]").data("baseid") || $(".createdoms .mapname input[type=text]").attr("data-baseid"), t = $(this), t.parents(".deletemaplayer").hide(), $(".marklayer").hide(), $.ajax({
                                    url: f.urls.deletedomurl,
                                    type: "post",
                                    async: !0,
                                    data: {
                                        nid: e
                                    },
                                    dataType: "json",
                                    success: function (e) {
                                        var t;
                                        t = e.status, t ? window.location.href = "/my/structure" : alert(e.err)
                                    },
                                    error: function () {
                                        throw "服务器请求错误！"
                                    }
                                }), !1
                            })), $(".createNewDom").length > 0 && ($(".createNewDom").parents(".createdom").each(function (e, t) {
                                t.flg = {}
                            }), $(".mapwrap").on("click", ".createNewDom", function (e) {
                                return r($(this)), !1
                            })), $(".atagbtn").length > 0 && ($(".mapwrap").on("click", ".atagbtn", function () {
                                var e = Number($(this).data("child-num") || $(this).attr("data-child-num"), 10),
                                    t = $(this).data("baseid") || $(this).attr("data-baseid");
                                return isNaN(e) && (e = unf), t == unf && (t = unf), i($(this), e, t), !1
                            }), $(".deletemaplayerall .closec,.deletemaplayerall .cancelbtn,.deletemaplayersimple .closec,.deletemaplayersimple .cancelbtn").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && $(".marklayer").hide()
                            })),
                            $(".mapwrap .submitdiv .addsub").length > 0 && (
                                !function () {
                                    $(".createdoms .mapwrap input[type=text]").length > 0 && $(".createdoms").on("change", ".mapwrap input[type=text]", function () {
                                        $(this).attr("data-status", "true")
                                    })
                                }(),
                                    /* 点击创建图谱 */
                                    $(".mapwrap .submitdiv .addsub").on("click", function () {
                                        return l(f, $(this)), !1
                                    })
                            ),
                            $("#soliderMain").length > 0 && this._solider(), $("#colsolider3").length > 0 && this._scrollTabMove({
                                movetag: "#ulmove3",
                                leftbtn: ".leftbtn",
                                rightbtn: ".rightbtn",
                                spacing: 10,
                                curnumber: 4,
                                num: 1,
                                root: "root"
                            }), $("#colsolider1").length > 0 && this._scrollTabMove({
                                parentTag: "#colsolider1",
                                movetag: "#ulmove",
                                leftbtn: ".leftbtn",
                                rightbtn: ".rightbtn",
                                spacing: 4,
                                curnumber: 4,
                                num: 1
                            }), $("#colsolider2").length > 0 && this._scrollTabMove({
                                parentTag: "#colsolider2",
                                movetag: "#ulmove2",
                                leftbtn: ".leftbtn",
                                rightbtn: ".rightbtn",
                                spacing: 20,
                                curnumber: 4,
                                num: 1,
                                root: "root"
                            }), $("#techic").length > 0 && this._techic_hover({
                                parenTag: "#techic",
                                tag: ".techic_hover",
                                ctag: ".tech_hover_top"
                            }), $(".listhovers").length > 0 && ($(document).on("mouseenter", ".listhovers li", function () {
                                $(this).find(".opt").show()
                            }), $(document).on("mouseleave", ".listhovers li", function () {
                                $(this).find(".opt").hide()
                            })), this._verificSubmit(), $(".importTrigger").length > 0 && $(".kn_importlist").length > 0 && (f._layer({
                                tag: ".kn_importlist ",
                                triggerbtn: ".importTrigger",
                                parentag: ".importParent",
                                fn: function (e) {
                                    var t = {};
                                    $(".marklayer").css("height", $(doc).height()).show(), c(".kn_importlist", function (e) {
                                        var n, a = e.elems;
                                        a && (n = "string" == typeof(a.eq(0).parent().data("havepage") || a.eq(0).parent().attr("data-havepage")) ? JSON.parse(a.eq(0).parent().data("havepage") || a.eq(0).parent().attr("data-havepage")) : a.eq(0).parent().data("havepage") || a.eq(0).parent().attr("data-havepage"), t.havepage = n)
                                    }, function (e) {
                                        var n, a, r;
                                        e.obj && (n = e.obj.data("id") || e.obj.attr("data-id"), t.havepage[n] ? (t[n] ? (a = t[n].previous, r = t[n].next) : (a = "previous", r = "next root"), $(".kn_importlist .page .previous").attr("class", a), $(".kn_importlist .page .next").attr("class", r), $(".kn_importlist .page").show()) : $(".kn_importlist .page").hide())
                                    }), d(".kn_importlist .selectcheck .check"), $(".kn_importlist .import_btns .importbtn").length > 0 && ($(".kn_importlist .import_btns .importbtn").off("click"), $(".kn_importlist .import_btns .importbtn").on("click", function () {
                                        u(".kn_importlist .selectcheck");
                                        var t = $("#_klg").val();
                                        return !!/^\+?[1-9][0-9]*$/.test(t) && ($.ajax({
                                                url: e._This.urls.importUrl,
                                                async: !0,
                                                type: "POST",
                                                dataType: "json",
                                                data: {
                                                    data: $("#checkvalues").val(),
                                                    id: t
                                                },
                                                success: function (e) {
                                                    var t = e.status;
                                                    if ($(".pinfort span").html(""), t) $(".pinfort").addClass("successinfor").find("span").html('<i class="fa fa-check-circle"></i>导入成功,' + e.succ + "条成功" + (e.prohibit ? " " + e.prohibit + "条内容或标题违反规则" : "") + (e.error ? " " + e.error + "条不明原因失败" : "") + (e.repeat ? " " + e.repeat + "条重复" : ""));
                                                    else {
                                                        var n = e.errcode;
                                                        if (1 == n) {
                                                            var a = "https://passport.csdn.net/account/login?from=" + encodeURI(location.href);
                                                            window.location = a
                                                        } else 2 == n ? $(".pinfort").addClass("errorinfor").find("span").html('<i class="fa fa-times-circle"></i>不是最末级节点') : 3 == n ? $(".pinfort").addClass("errorinfor").find("span").html('<i class="fa fa-times-circle"></i>尚未选择内容') : $(".pinfort").addClass("errorinfor").find("span").html('<i class="fa fa-times-circle"></i>导入失败,' + (e.succ ? " " + e.succ + "条成功" : "") + (e.prohibit ? " " + e.prohibit + "条内容或标题违反规则" : "") + (e.error ? " " + e.error + "条不明原因失败" : "") + (e.repeat ? " " + e.repeat + "条重复" : ""))
                                                    }
                                                    $(".pinfort").removeClass("hide")
                                                },
                                                error: function (e) {
                                                    console.log("服务器错误")
                                                }
                                            }), !1)
                                    }), $(".kn_importlist .page a").on("click", function () {
                                        var e, n, a, r, i, l;
                                        if ($(this).hasClass("previous") && (e = -1), $(this).hasClass("next") && (e = 1), a = $(".kn_importlist .tab a.root").index(), n = $(".kn_importlist .tab a.root").data("id") || $(".kn_importlist .tab a.root").attr("data-id"), r = $(".kn_importlist .tabcontent ul").eq(a), i = parseFloat($(r).find(".page").val(), 10), l = parseFloat($(r).find(".total_page").val(), 10), i + e <= 0 || i + e > l) return $(this).removeClass("root"), !1;
                                        i + e >= l ? $(".kn_importlist .page .next").removeClass("root") : i + e <= 1 ? $(".kn_importlist .page .previous").removeClass("root") : $(".kn_importlist .page a").addClass("root"), t[n] = {
                                            previous: $(".kn_importlist .page .previous").attr("class"),
                                            next: $(".kn_importlist .page .next").attr("class")
                                        }, s({
                                            tabid: n,
                                            page: i + e
                                        }, r)
                                    }))
                                },
                                beforefun: function () {
                                    return f._verificaUser()
                                }
                            }), $(".kn_importlist .closec,.kn_importlist .cancelbtn").on("mouseup", function (e) {
                                1 === Number(e.which, 10) && ($(".marklayer").hide(), $(".pinfort").addClass("hide").removeClass("successinfor").removeClass("errorinfor"))
                            })), $(".listDragSortTrigger").length > 0 && $(".list_drag_sort").length > 0) {
                            var _;
                            f._layer({
                                tag: ".list_drag_sort ",
                                triggerbtn: ".listDragSortTrigger",
                                parentag: ".listDragSortParent",
                                fn: function (e) {
                                    $(".marklayer").css("height", $(doc).height()).show()
                                },
                                beforefun: function () {
                                    function e(e, t, n, a) {
                                        return t.getAttribute("id") == n.getAttribute("id")
                                    }

                                    _ = dragula([document.getElementById("treeList")], {
                                        isContainer: function (e) {
                                            return !1
                                        },
                                        moves: function (e, t, n, a) {
                                            return !0
                                        },
                                        accepts: e,
                                        invalid: function (e, t) {
                                            return !1
                                        },
                                        direction: "vertical",
                                        copy: !1,
                                        copySortSource: !1,
                                        revertOnSpill: !1,
                                        removeOnSpill: !1,
                                        mirrorContainer: document.body,
                                        ignoreInputTextSelection: !0
                                    });
                                    var t = Array.prototype.slice.call(document.getElementsByClassName("subul"));
                                    t.length;
                                    return t.forEach(function (e, t) {
                                        document.getElementById(e.getAttribute("id")) && _.containers.push(document.getElementById(e.getAttribute("id")))
                                    }), f._verificaUser()
                                }
                            }), $(".list_drag_sort .closec,.list_drag_sort .cancelbtn").on("mouseup", function (e) {
                                _.destroy(), 1 === Number(e.which, 10) && ($(".marklayer").hide(), $(".pinfort").addClass("hide").removeClass("successinfor").removeClass("errorinfor"))
                            }), $(".list_drag_sort .ok").on("click", function (e) {
                                function t(e) {
                                    e.children("li").each(function (e, a) {
                                        n[$(this).data("id")] = e, $(this).children(".subul").eq(0).children("li").length > 0 && t($(this).children(".subul").eq(0))
                                    })
                                }

                                var n = {};
                                t($("#treeList")), $.ajax({
                                    url: f.urls.treeUpdateSortUrl,
                                    type: "post",
                                    dataType: "json",
                                    data: {
                                        sort: JSON.stringify(n),
                                        baseid: $("#bid").val()
                                    },
                                    success: function (e) {
                                        var t, n;
                                        t = e.status, n = e.errCode, t ? window.location.reload() : 1 == n ? f._verificaUser() : 2 == n && alert("图谱不存在")
                                    },
                                    error: function () {
                                    }
                                })
                            })
                        }
                        $(".triggeredit").length > 0 && $(".subknowledge").length > 0 && (f._layer({
                            tag: ".subknowledge ",
                            triggerbtn: ".triggeredit",
                            parentag: ".triggerParent",
                            tagid: "data-id",
                            fn: function (e) {
                                $(".marklayer").css("height", $(doc).height()).show(), h(".subknowledge", e)
                            },
                            beforefun: function () {
                                return f._verificaUser()
                            }
                        }), $(".subknowledge .closec,.subknowledge .cancelbtn").on("mouseup", function (e) {
                            1 === Number(e.which, 10) && ($(".subknowledge").find(".texts,.textareas").val(""), $(".subknowledge").find(".texts,.textareas").removeClass("focusborder"))
                        }))
                    },
                    _techic_hover: function (e) {
                        var t, n;
                        if (t = e.parenTag, n = e.tag, ctag = e.ctag, !t || !n || !ctag) return !1;
                        $(n, t).on({
                            mouseenter: function () {
                                $(this).children(ctag).stop().animate({
                                    bottom: 0
                                }, "400", "swing")
                            },
                            mouseleave: function () {
                                $(this).children(ctag).stop().animate({
                                    bottom: -260
                                }, "400", "swing")
                            }
                        })
                    },
                    _verificSubmit: function () {
                        function e(e, t) {
                            var n, a, r, i, l = "",
                                o = /http|https:\/\/[\w-]*(\.[\w-]*)+/gi,
                                s = !0;
                            if (n = t.type || "empty", i = t.callback, a = n.split("|"), r = $.trim(e.val() || e.text() || e.html()), a.length > 0) {
                                for (var c = 0; c < a.length; c++) {
                                    if ("empty" === a[c].toLowerCase() && (e.parent().parent().prev("p").hasClass("title") ? l = "" : e.parent().parent().prev("p").hasClass("url") && (l = "* 内容URL不能为空！"), "" === r)) {
                                        s = !1;
                                        break
                                    }
                                    if ("url" === a[c].toLowerCase() && (l = "* url格式不正确", !o.test(r))) {
                                        s = !1;
                                        break
                                    }
                                }
                                i && i({
                                    isSub: s,
                                    text: l
                                })
                            }
                        }

                        function t(e, n) {
                            var a, r = e.attr("data-class"),
                                i = "",
                                l = e.parent().next(".selectput").find("select"),
                                o = new RegExp(n + "-\\d+", "i");
                            l.length > 0 && l.html(""), r && (a = $("." + r).find("option")), 0 == n ? i += '<option data-id="0" selected="selected">请选择节点</option>' : a && a.length > 0 && a.each(function (e, t) {
                                var n = $(t).attr("data-id");
                                o.test(n) && (i += t.outerHTML)
                            }), l.length > 0 && (l.html(i), t(l, l.parent().find("option:selected").attr("data-id")))
                        }

                        function n() {
                            var e = $(".inputwrap").find('input[type="text"]'),
                                t = $(".selectput").find("select"),
                                n = !0,
                                r = $(".errors"),
                                i = $(".errors").size();
                            a.blur();
                            for (var o = 0; o < i; o++) {
                                if ("block" === r.eq(o).css("display")) {
                                    n = !1;
                                    break
                                }
                                n = !0
                            }
                            var s;
                            return s = $(".pcheck input[type=checkbox]:checked").length > 0 ? parseInt($(".ubase-option").find("option:selected").attr("data-id")) : 0, n && $.ajax({
                                url: "/subContent",
                                type: "post",
                                dataType: "json",
                                data: {
                                    title: $.trim(e.eq(0).val()),
                                    url: $.trim(e.eq(1).val()),
                                    selectid: t.eq(t.length - 1).find("option:selected").attr("data-id"),
                                    baseId: $("#sub_base").val(),
                                    type: $("#sub_type").val(),
                                    ubaseId: s,
                                    assembleId: $("#assemble").val()
                                },
                                success: function (e) {
                                    var t, n;
                                    t = e.status, n = e.html, t ? ($(".kn_sub_collect .layerwrap").html(""), $(".kn_sub_collect .layerwrap").html(n), l._layer({
                                        tag: ".kn_sub_collect ",
                                        triggerbtn: ".confrimAdd",
                                        parentag: ".pbtns",
                                        fn: function (e) {
                                            $(".marklayer").css("height", $(doc).height()).show(), $(".confrimAdd").off("click", e.funame)
                                        },
                                        beforefun: function () {
                                            return l._verificaUser()
                                        }
                                    }), $(".confrimAdd").trigger("click"), e.mask_node && l._fixedlayer("finished"), e.mask_base && l._fixedlayer("lighted")) : e.error ? l._verificaUser() : alert(e.err)
                                },
                                error: function () {
                                }
                            }), !1
                        }

                        var a, r, i, l = this;
                        a = $(".verif").find('input[type="text"]'), i = $(".selectput select"), r = $(".confrimAdd"), a.length > 0 && a.on("focus", function () {
                            a.each(function (e, t) {
                                $(t).parent().removeClass("addbordercolor")
                            }), $(this).parent().addClass("addbordercolor")
                        }).on("blur", function () {
                            var t = $(this);
                            $(this).parent().removeClass("addbordercolor"), e($(this), {
                                type: $(this).attr("data-type"),
                                callback: function (e) {
                                    var n, a;
                                    n = e.isSub, a = e.text, !1 === n ? ("" != a && t.parent().next(".errors").html(a), t.parent().next(".errors").show()) : t.parent().next(".errors").hide()
                                }
                            })
                        }), i.length > 0 && i.on("change", function () {
                            var e = $(this).find("option:selected").attr("data-id");
                            t($(this), e)
                        }), r.length > 0 && (r.off("click"), r.on("click", n)), $(".kn_sub_collect .closec").on("mouseup", function (e) {
                            1 === Number(e.which, 10) && ($(".marklayer").hide(), r.off("click"), r.on("click", n))
                        })
                    },
                    _scrollTabMove: function (e) {
                        function t(e, t) {
                            n(e, function () {
                                $(r, a).stop().animate({
                                    left: g * (m.eq(0).outerWidth() + s)
                                }, "slow", function () {
                                    c && ($(i, a).addClass(c), $(l, a).addClass(c)), 0 == g && c && (t.removeClass(c), $(l, a).addClass(c)), f === unf ? -g + p >= h && c && (t.removeClass(c), $(i, a).addClass(c)) : g <= -(d - p) && c && (t.removeClass(c), $(i, a).addClass(c))
                                })
                            })
                        }

                        function n(e, t) {
                            if (h <= p || o > p) return !1;
                            if (1 == o && (f = !0), "left" === e) {
                                if (0 == g || v.length <= 0) return !1;
                                v.length > 0 && (u = v[v.length - 1], v.splice(v.length - 1, 1)), f === unf && (d -= g), g += u
                            } else if ("right" === e) {
                                if (f) {
                                    if (g <= -(d - p)) return !1;
                                    u = 1
                                } else {
                                    if (-g + p >= h) return !1;
                                    u = d - o >= p ? o : 1
                                }
                                v.push(u), g -= u, f === unf && (d += g)
                            }
                            t()
                        }

                        var a, r, i, l, o, s, c, d, u, h, f, p, m, g = 0,
                            v = [];
                        return a = e.parentTag || "", r = e.movetag || "", i = e.leftbtn || "", l = e.rightbtn || "", s = e.spacing || 0, c = e.root || "", o = e.num || 1, p = e.curnumber || 1, !($(a).length < 0 || $(r, a).length <= 0) && (m = $(r, a).children(), h = d = m.size(), $(r, a).css({
                            width: (m.eq(0).outerWidth() + 2 * s) * d
                        }), d <= p || o > p ? ($(l, a).attr("href", "javascript:void(0)").removeClass(c), $(i, a).attr("href", "javascript:void(0)"), !1) : void($(i, a).length > 0 && $(l, a).length > 0 && (c && $(l, a).addClass(c), $(i, a).on("click", function () {
                            return t("left", $(this)), !1
                        }), $(l, a).on("click", function () {
                            return t("right", $(this)), !1
                        }))))
                    },
                    _solider: function () {
                        !
                            function () {
                                function e() {
                                    clearInterval(i), i = null, i = setInterval(function () {
                                        r >= u - 1 && (r = -1), r++, t(r), h = r
                                    }, l)
                                }

                                function t(e) {
                                    var t = d.eq(e).attr("href");
                                    c.css({
                                        opacity: 0
                                    }), d.removeClass("root"), d.eq(e).addClass("root"), $("#alink").attr("href", t), c.eq(e).stop().animate({
                                        opacity: 1
                                    }, "1200", function () {
                                        c.css({
                                            opacity: 0
                                        }), $(this).css({
                                            opacity: 1
                                        })
                                    })
                                }

                                var n = $("#soliderMain"),
                                    a = $("#smallBtn"),
                                    r = 0,
                                    i = null,
                                    l = 3e3;
                                if (a.find("li").length <= 1) return !1;
                                if (n && n.length > 0 && a.length > 0) {
                                    var o = n.find("ul"),
                                        s = a.find("ol"),
                                        c = o.find("li"),
                                        d = s.find("li"),
                                        u = c.size(),
                                        h = s.find(".root").index();
                                    if (u <= 1) return !1;
                                    r = h, c.eq(h).css({
                                        opacity: 1
                                    }), $("#alink").attr("href", d.eq(h).attr("href")), d.mouseenter(function () {
                                        var e = $(this).index();
                                        if (clearInterval(i), i = null, h == e) return !1;
                                        h = e, t(e)
                                    }), d.mouseleave(function () {
                                        var t = $(this).index();
                                        r = t, e()
                                    })
                                }
                                e()
                            }()
                    },
                    _multistage: function (e, t) {
                        function n(e) {
                            var n = e.pid,
                                a = e.url,
                                r = e.elm,
                                i = Number(e.mlayer, 10),
                                l = {};
                            0 == i ? l.mlayer = i : (l.mlayer = i, l.pid = n), $.ajax({
                                url: a,
                                type: "post",
                                async: !0,
                                dataType: "json",
                                data: l,
                                success: function (e) {
                                    t ? (e.elm = r, t(e)) : alert("提供回调函数!")
                                },
                                error: function () {
                                    alert("服务器请求失败！")
                                }
                            })
                        }

                        var a, r;
                        if (a = e.selectbox, url = e.url, mlayer = Number(e.mlayer, 10), mlayer > 0) {
                            if (!a) return alert("提供select区域标签!"), !1;
                            if (!($(a).length > 0 ? $(a).find("select") : null)) return alert("没有选择操作select标签!"), !1
                        }
                        Number(mlayer, 10) < 0 && alert("mlayer为大于0的数字，指定层级!"), $(doc).off("change", a + " select"), $(doc).on("change", a + " select", function () {
                            r = $(this).find("option:selected").data("pid") || $(this).find("option:selected").attr("data-pid"), n({
                                pid: r,
                                mlayer: 1,
                                elm: $(this),
                                url: url
                            })
                        })
                    },
                    _checkstring: function () {
                        var e, t = /(\w+):\/\/([^\/:]+)(:\d*)?([^# ]*)/;
                        $(".inputs").length > 0 && (e = $(".inputs input"), e.length > 0 &&
                        function () {
                            var n;
                            e.on("blur", function () {
                                n = $.trim($(this).val()), n.length <= 0 ? $(this).hasClass("urls") ? $(this).next(".error").html("链接不能为空").css({
                                    display: "block"
                                }) : $(this).next(".error").html("标题不能为空").css({
                                    display: "block"
                                }) : $(this).hasClass("urls") ? t.test(n) ? $(this).next(".error").html("链接不能为空").hide() : $(this).next(".error").html("请输入有效的URL地址").css({
                                    display: "block"
                                }) : $(this).next(".error").hide()
                            })
                        }())
                    },
                    _movetag: function () {
                        var e = this;
                        e._multistage({
                            selectbox: ".knowledgecontentmove .selectlayer .selectdiv",
                            url: e.urls.selecturls,
                            mlayer: 0
                        }, function (e) {
                            var t, n;
                            t = e.status, n = e.html, elm = e.elm, t && ($(".knowledgecontentmove .selectlayer .selectdiv").length <= 0 ? $(".knowledgecontentmove .selectlayer").html(n) : (elm.parent().next(".selectdiv").length > 0 && elm.parent().nextAll().remove(), $(".knowledgecontentmove .selectlayer").append(n)))
                        })
                    },
                    _determine: function (e, t) {
                        var n, a, r, i, l, o = {},
                            s = this;
                        $(".editknowledgecontent .addconfirm,.addknowledgecontent .addconfirm,.knowledgecontentmove .addconfirm,.deleteconfrim .addconfirm").off("click"), $(".editknowledgecontent .addconfirm,.addknowledgecontent .addconfirm,.knowledgecontentmove .addconfirm,.deleteconfrim .addconfirm").on("click", function (c) {
                            if (a = t.elm.data("data-id") || t.elm.attr("data-id"), r = t.elm.data("data-type") || t.elm.attr("data-type"), "delete" == e && (n = s.urls.simpleopturl.deleteifyurl, o.content_id = a, o.type = r), "move" == e && (i = $(".knowledgecontentmove .selectlayer .selectdiv").last().find("option:selected").data("pid") || $(".knowledgecontentmove .selectlayer .selectdiv").last().find("option:selected").attr("data-pid"), n = s.urls.simpleopturl.moveifyurl, o.content_id = a, o.knowledge_id = i, o.type = r), "add" == e) {
                                var d = !1;
                                n = s.urls.simpleopturl.addurl, $(".addknowledgecontent .inputs input").blur();
                                var u = $.trim($(this).parents(".layerwrap").find(".inputs input").eq(0).val()),
                                    h = $.trim($(this).parents(".layerwrap").find(".inputs input").eq(1).val());
                                i = $("#_klg").val(), o.title = u, o.url = h, o.knowledge_id = i
                            }
                            if ("edit" == e) {
                                var f = !1;
                                n = s.urls.simpleopturl.modifyurl, $(".editknowledgecontent .inputs input").blur(), console.log(1);
                                var u = $.trim($(this).parents(".layerwrap").find(".inputs input").eq(0).val()),
                                    h = $.trim($(this).parents(".layerwrap").find(".inputs input").eq(1).val());
                                o.content_id = a, o.title = u, o.url = h
                            }
                            return $(".addknowledgecontent .error").each(function (e, t) {
                                if ("block" == $(t).css("display")) return d = !0, !1;
                                d = !1
                            }), $(".editknowledgecontent .error").each(function (e, t) {
                                if ("block" == $(t).css("display")) return f = !0, !1;
                                f = !1
                            }), !f && !d && ($.ajax({
                                url: n,
                                type: "post",
                                dataType: "json",
                                async: !0,
                                data: o,
                                success: function (n) {
                                    var a;
                                    if (a = n.status, n.mask, a) {
                                        if ("edit" == e && (t.elm.parents("li").children("span").eq(0).find("a").html(""), t.elm.parents("li").children("span").eq(0).find("a").attr("href", o.url).html(o.title), $(".editknowledgecontent .closec").trigger("click"), $(".editknowledgecontent .inputs input").val(""), $(".marklayer").hide()), "delete" == e && (t.elm.parents("ul").hasClass("listuls") ? t.elm.parent().parent().parent().parent().empty().remove() : t.elm.parent().parent().parent().empty().remove(), $(".deleteconfrim  .closec").trigger("click"), $(".marklayer").hide(), $(".listuls li").length <= 0)) {
                                            var r = $(".menubox li a.roots")[0].href;
                                            location.href = r || location.href
                                        }
                                        if ("add" == e) {
                                            var i = $("#_klg").val();
                                            $(".addknowledgecontent .addsuccess").show(), l = setTimeout(function () {
                                                $(".addknowledgecontent .closec").trigger("click"), $(".addknowledgecontent .inputs input").val(""), $(".addsuccess").hide(), l = null, window.location.href = "/my/structure/node/" + i
                                            }, 1e3)
                                        }
                                        "move" == e && ($(".knowledgecontentmove .addsuccess").show(), l = setTimeout(function () {
                                            $(".knowledgecontentmove .closec").trigger("click"), $(".addsuccess").hide(), l = null, t.elm.parent().parent().parent().empty().remove(), $(".marklayer").hide();
                                            var e = $(".menubox li a.roots")[0].href;
                                            location.href = e || location.href
                                        }, 1e3))
                                    } else alert(n.err)
                                },
                                error: function () {
                                    alert("服务器请求失败!")
                                }
                            }), !1)
                        })
                    },
                    _getCookieValue: function (e, t) {
                        return t = document.cookie.match("(^|;)\\s*" + e + "\\s*=\\s*([^;]+)"), t ? t.pop() : ""
                    },
                    _verificaUser: function () {
                        if (this._getCookieValue("UserName")) return !0;
                        var e = "https://passport.csdn.net/account/login?from=" + encodeURI(location.href);
                        return window.location = e, !1
                    },
                    listhover: function (e) {
                        var t = $(e).children();
                        t.on("mouseenter", function () {
                            $(this).find(".lefts").addClass("addWidth").end().find(".rights").addClass("show")
                        }), t.on("mouseleave", function () {
                            $(this).find(".lefts").removeClass("addWidth").end().find(".rights").removeClass("show")
                        })
                    },
                    funblock: function () {
                        var e = this;
                        return {
                            _scrollBar: function () {
                                function e(e) {
                                    var t, n, a, r, i;
                                    if (t = e.find(".scrollDoc") || unf, n = parseFloat(e.outerHeight(), 10), a = parseFloat(t.outerHeight(), 10), r = e.find(".scrollblank") || unf, i = e.find(".scrollbars") || unf, i.pro = 0, t.max = a - n, i.max = parseFloat(r.outerHeight(), 10) - parseFloat(i.height(), 10), !(a > n)) return i.addClass("hide"), !1;
                                    i.removeClass("hide"), function () {
                                        function e() {
                                            $(doc).on("mousemove", function (e) {
                                                var n = i.y,
                                                    a = e.clientY - n;
                                                return a <= 0 && (a = 0), a > i.max && (a = i.max), i.pro = a / i.max, i.css({
                                                    top: a
                                                }), t.css({
                                                    top: -i.pro * t.max
                                                }), e.stopPropagation(), !1
                                            }), $(doc).on("selectstart", function () {
                                                return !1
                                            })
                                        }

                                        function n() {
                                            $(doc).off("mousemove")
                                        }

                                        i.on("mousedown", function (t) {
                                            return i.y = t.clientY - parseFloat($(this).position().top, 10), e(), t.stopPropagation(), !1
                                        }), $(doc).on("mouseup", function (e) {
                                            return n(), e.stopPropagation(), !1
                                        })
                                    }()
                                }

                                var t;
                                t = $(".addScroll") || unf, t.each(function (t, n) {
                                    e($(n))
                                })
                            },
                            _treeMenu: function (t) {
                                function n(t) {
                                    return _id = $(this).attr("data-mid"), _type = $(this).attr("data-type"), _this = $(this), "treeexpert" === s && a({
                                        _id: _id,
                                        _type: _type,
                                        _url: r
                                    }, function (t) {
                                        var n = t,
                                            a = n.status,
                                            r = n.html,
                                            i = n.treelayer;
                                        if (a && "treeexpert" === s) {
                                            if (!1 === i) return $(".listselect").prev(".coltitle").removeClass("hide"), $(".listselect").show(), $(".listselect").html(""), $(".listselect").html($(r)), e.recordingArr = [], $(_this).parents("li").each(function (t, n) {
                                                e.recordingArr.unshift($(n).children("a").find("em").html())
                                            }), o._sonclick(), o._scrollBar(), !1;
                                            if (_this.next().remove(), _this.parent().append($(r)), e.recordingDataArr.length > 0) {
                                                for (var l = _this.parent().parents("li").length <= 0 ? _this.attr("data-mid") : _this.parent().parents("li").children("a").attr("data-mid"), c = 0; c < e.recordingDataArr.length; c++) for (var d in e.recordingDataArr[c]) if (d === "datag" + l) {
                                                    var u = e.recordingDataArr[c]["datag" + l];
                                                    break
                                                }
                                                u && _this.siblings("ul").children("li").find("a em").each(function (e, t) {
                                                    for (var n = 0; n < u.length; n++) if ($.trim($(t).html()) === $.trim(u[n])) {
                                                        $(t).parent().addClass("curoot");
                                                        break
                                                    }
                                                })
                                            }
                                            if ($(_this).next().length <= 0) return !1;
                                            if ($(_this).hasClass("noclick")) return !1;
                                            $(_this)[0].flg == unf || 0 == $(_this)[0].flg ? ($(_this).addClass("lessj"), $(_this).parent().children("ul").show(), $(_this)[0].flg = !0) : ($(_this).removeClass("lessj"), $(_this).parent().children("ul").hide(), $(_this)[0].flg = !1), o._scrollBar()
                                        }
                                    }), t.stopPropagation(), t.preventDefault(), !1
                                }

                                function a(e, t) {
                                    var n = e._id,
                                        a = e._url,
                                        r = e._type;
                                    $.ajax({
                                        url: a,
                                        type: "get",
                                        async: !0,
                                        data: {
                                            mid: n,
                                            node_type: r
                                        },
                                        success: function (e) {
                                            t && t(e)
                                        },
                                        error: function () {
                                            alert("树形菜单请求失败!")
                                        }
                                    })
                                }

                                var r, i, l, o = this,
                                    s = "";
                                if ($(".tagcgl").length > 0) {
                                    var i, c, d;
                                    $(".selectlist li span").each(function (t, n) {
                                        var a = $(n).attr("data-mid");
                                        d = $(n), $(".treeMenu > li > a").each(function (t, n) {
                                            if ($(n).attr("data-mid") == a) {
                                                var r, l = $(d).text().split("-"),
                                                    o = "datag",
                                                    s = {};
                                                return i = l.length > 2 ? l.length - 1 : -1, r = l.slice(1, i), c = $(n), o += a, s[o] = r, void e.recordingDataArr.push(s)
                                            }
                                        }), (null != c || c) && $(c).addClass("curoot")
                                    })
                                }
                                $(".treeMenu li a").each(function (e, t) {
                                    "ul" !== $(this).parent().parent()[0].tagName.toLowerCase() || $(t).hasClass("noclick") || (t.flg = !1)
                                }), s = $(".treeMenu").hasClass("treerlist") ? "treehome" : (r = e.urls.treeurl, "treeexpert"), $(doc).on("click", ".treeMenu li a", n), "treehome" === s && (l = $(".treeMenu li .root"), i = l.length, l.eq(i - 1).parents("ul").show(), l.each(function (e, t) {
                                    t.flg = !0
                                }), l.each(function (e, t) {
                                    e < l.length - 1 && $(t).find("i").html("-")
                                }))
                            },
                            _sonclick: function () {
                                function e(e) {
                                    var t, n, t = $(this),
                                        n = $(this).parent().children(".subc").html(),
                                        a = $(this).attr("data-id");
                                    return !t[0].tag && (t.addClass("root"), r._opdate({
                                            text: n,
                                            id: a
                                        }, function () {
                                            t.attr("data-id");
                                            t[0].tag = !0, r._scrollBar()
                                        }), e.stopPropagation(), e.preventDefault(), !1)
                                }

                                var t, n = $(".listselect") || unf,
                                    a = $(".selectlist ul > li"),
                                    r = this;
                                if (n.length <= 0) return !1;
                                t = n.children().find("a"), t.each(function (e, t) {
                                    var n = $(t).attr("data-id");
                                    a.each(function (e, a) {
                                        $(a).attr("data-tabid") == n && ($(t).addClass("root"), t.tag = !0)
                                    })
                                }), t.on("click", e)
                            },
                            _opdate: function (t, n) {
                                for (var a = $(".selectlist ul"), r = a.children(), i = "", l = t.text || "", o = t.id || 0, s = 0; s < e.recordingArr.length; s++) i += e.recordingArr[s] + " - ";
                                var c = $("<li class='clearfix' data-tabid=" + o + "><span>" + i + "<em>" + l + "</em></span><a href='' class='rubbish'></a></li>");
                                r.length > 0 ? c.insertBefore(r.eq(0)) : a.append(c), n && n()
                            },
                            _rubdate: function (e) {
                                $(doc).on("click", ".selectlist li .rubbish", function (t) {
                                    var n, a = (Number($(this).parent().attr("data-id"), 10), $(this));
                                    return n = a.parent().attr("data-tabid"), $(this).parent().empty().remove(), e && e({
                                        status: !0,
                                        tabid: n
                                    }), t.stopPropagation(), t.preventDefault(), !1
                                })
                            },
                            _ajax: function (e, t) {
                                _id = e._id, _url = e._url, _types = e._types, _appendDom = e._appendDom, $.ajax({
                                    type: "get",
                                    async: !0,
                                    url: _url,
                                    data: {
                                        dataid: _id,
                                        _types: _types
                                    },
                                    success: function (e) {
                                        t(e)
                                    },
                                    error: function () {
                                        alert("服务器请求失败")
                                    }
                                })
                            },
                            _submitform: function () {
                                var t = e.recordIds.shift(),
                                    n = $("#subhide");
                                if (n.length <= 0) return alert("缺少提交域!"), !1;
                                $("#subClick").on("click", function (a) {
                                    return e.recordIds = [], $(".selectlist ul li").each(function (n, a) {
                                        var r = $(a).attr("data-tabid");
                                        e.recordIds[n] = "[" + t + "," + r + "]"
                                    }), n.val(""), n.val(e.recordIds.join(",")), n.val() ? $(this).parents("form").submit() : alert("已选知识点不能为空!"), a.stopPropagation(), a.preventDefault(), !1
                                })
                            },
                            _hover: function (e, t) {
                                var n, a = e._optag || "",
                                    r = e._tag || "",
                                    i = e._targetag || "",
                                    l = e._hoveAddropt || [],
                                    o = "",
                                    s = "";
                                n = a.length > 0 && r.length > 0 && i.length > 0 ? $(a + r).length > 0 ?
                                    function (e, t) {
                                        if ("string" === (typeof e).toLowerCase() && (e = $(e)), 2 != l.length) return n = new Error("添加hover参数有误！");
                                        o = l[0], s = l[1], e.hover(function () {
                                            o.length > 0 && $(this).find(o).addClass(s), $(this).find(t).show()
                                        }, function () {
                                            o.length > 0 && $(this).find(o).removeClass(s), $(this).find(t).hide()
                                        })
                                    }($(a + r), i) : new Error("操作的目标父亲标注!") : new Error("缺少操作对象，请添加"), t && t(n)
                            }
                        }
                    },
                    layer: function (e) {
                        $(doc).off("click", ".tagclick"), $(doc).on("click", ".tagclick", function (t) {
                            var n, a, r, i, l = $(this).attr("data-layer-id") || "",
                                o = $(this).attr("data-type") || 0;
                            return n = $(".treewindowLayer") || "", a = $(".marklayer") || "", n.length <= 0 || a.length <= 0 ? (alert("请添加弹框的DOM格式"), !1) : a.length > 1 || n.length > 1 ? (alert("弹框和遮罩请唯一"), !1) : (r = l || "", n.attr({
                                id: "treewindowLayer" + l,
                                "data-id": r,
                                "data-type": o
                            }), $("#treewindowLayer" + l).show(), a.css({
                                height: parseFloat($(doc).height(), 10) > parseFloat($(g).height(), 10) ? parseFloat($(doc).height(), 10) : parseFloat($(g).height(), 10)
                            }).show(), $(".closec").off("click"), $(".closec").on("click", function (e) {
                                return $("#treewindowLayer" + l).hide(), ($(".tagcgl").length > 0 || $(".treerlist").length > 0) && $(doc).off("click", ".treeMenu li a"), a.hide(), e.stopPropagation(), e.preventDefault(), !1
                            }), i = {
                                tagobj: $(this),
                                windowLayerid: "treewindowLayer" + l
                            }, e && e(i), t.stopPropagation(), t.preventDefault(), !1)
                        })
                    },
                    ajaxDelete: function () {
                        function e(e, t) {
                            var n, a, r, i;
                            if (a = t.id, r = t.obj, e.indexOf("recommend") >= 0 && r.hasClass("doYes") && (a = $("#confirmId").val()), i = t.checkids && t.checkids.length > 0 ? -1 != t.checkids[0].indexOf("|") ? t.checkids[0].substring(0, t.checkids[0].indexOf("|")) : t.checkids : void 0, t.checkids && t.checkids.length > 0 && (a = a + "|" + i), !a || !r) return !1;
                            var l = parseInt($("#approving").html().replace(/[^0-9]/gi, "")),
                                o = parseInt($("#approved").html().replace(/[^0-9]/gi, "")),
                                s = $("#root a").attr("href").split("knowledge_id=")[1];
                            $.ajax({
                                url: e,
                                type: "get",
                                async: !1,
                                dataType: "json",
                                data: {
                                    id: a,
                                    knowledge_id: s
                                },
                                success: function (e) {
                                    var a, i, s, c;
                                    if (a = Number(e.succ, 10) || "", i = e.msg || "", s = e.add, c = e.confirm, t.callback && c && ($("#confirmId").val(e.confirmId), t.callback(!0)), 0 == a && i && alert(i), 1 == a && i) if (r.hasClass("doYes") || r.hasClass("doNo")) r.parents("li").empty().remove(), r.parents("dl").empty().remove(), l -= 1, 1 == s ? (o += 1, $("#approving").html("待审核内容(" + l + ")"), $("#approved").html("已收录内容(" + o + ")")) : ($("#approving").html("待审核内容(" + l + ")"), $("#approved").html("已收录内容(" + o + ")")), $(".optrecord").hide(), (n = $(".tablists").children("ul").children("li").length || $(".tablists").children("dl").length) <= 0 && window.location.reload();
                                    else if (r.hasClass("doCancle")) r.parents("li").empty().remove(), r.parents("dl").empty().remove(), o -= 1, $("#approved").html("").html("已收录内容(" + o + ")"), (n = $(".tablists").children("ul").children("li").length || $(".tablists").children("dl").length) <= 0 && window.location.reload();
                                    else if (r.hasClass("recommend")) {
                                        $(".optrecommend").hide(), t.obj[0].recordid = t.checkids;
                                        var d = t.obj[0].recordid[0].split("|")[0];
                                        parseInt(t.obj[0].recordid) > 0 ? r.text("已推荐").attr("recommend", d) : r.text("推荐").attr("recommend", 0)
                                    }
                                },
                                error: function (e) {
                                    alert(e)
                                }
                            })
                        }

                        function t(e, t, n) {
                            var a, r, i = [];
                            "recommend" != n && $(".checkboxwrap").find(":radio").removeAttr("checked"), $(".confrimbtn").length > 0 && (a = $(".confrimbtn"), a.off("click"), a.on("click", function (t) {
                                i = [], r = $(".checkboxwrap").find(":radio:checked"), r.each(function (e, t) {
                                    var a = $(t).attr("data-checkid");
                                    "recommend" == n && (a += "|", a += $(t).parent().index()), i.push(a)
                                }), e && e(i), t.preventDefault(), t.stopPropagation()
                            }))
                        }

                        function n(e) {
                            $(".optrecord .cancelbtn").on("mouseup", function () {
                                e.parents("li").empty().remove()
                            })
                        }

                        var a, r, i, l, o = this;
                        $(".opclick").each(function (e, t) {
                            $(t).hasClass("recommend") && (t.recordid = [])
                        }), $(".tagcgl .doNo").on("click", function (t) {
                            var n = $(this).attr("data-id");
                            e(o.urls.doNo, {
                                id: n,
                                obj: $(this)
                            }), t.stopPropagation(), t.preventDefault()
                        }), $(".tagcgl .doCancle").on("click", function (t) {
                            var n = $(this).attr("data-id");
                            e(o.urls.doCancle, {
                                id: n,
                                obj: $(this)
                            }), t.stopPropagation(), t.preventDefault()
                        }), o._layer({
                            tag: ".optinfo",
                            triggerbtn: ".opclick",
                            parentag: ".tagcgl",
                            beforefun: function (t) {
                                a = t.elm.attr("class").split(" "), i = t.elm.attr("data-id"), l = t.elm;
                                for (var n in o.urls) if (a[0] === n) {
                                    r = o.urls[n];
                                    break
                                }
                                if ("doyes" == a[0].toLocaleLowerCase()) {
                                    var s;
                                    return e(r, {
                                        id: i,
                                        obj: l,
                                        callback: function (e) {
                                            e ? s = e : (s = !1, t.elm.parents("li").empty().remove())
                                        }
                                    }), s
                                }
                                if ("recommend" == a[0].toLocaleLowerCase()) return !0
                            },
                            fn: function (i) {
                                if ("doyes" == a[0].toLocaleLowerCase() && ($(".optrecommend").hide(), t(function (t) {
                                        e(o.urls.recommend, {
                                            id: i.id,
                                            checkids: t,
                                            obj: i.elm
                                        })
                                    }, null, "doyes"), n(i.elm)), "recommend" == a[0].toLocaleLowerCase()) {
                                    var l, s, c;
                                    $(".optrecord").hide(), i.elm[0].recordid.length > 0 ? ($(".optrecommend").find(":radio").removeAttr("checked"), $(".optrecommend").find(":radio").eq(i.elm[0].recordid[0].substring(i.elm[0].recordid[0].indexOf("|") + 1, i.elm[0].recordid[0].length))[0].checked = !0) : ($(".optrecommend").find(":radio").removeAttr("checked"), $(".optrecommend").find(":radio").each(function () {
                                        $(this).attr("data-checkid") == i.elm.attr("recommend") && i.elm.attr("recommend") > 0 && ($(this)[0].checked = !0)
                                    }), l = $(".optrecommend").find(":radio:checked"), l.length > 0 ? (s = $(".optrecommend").find(":radio:checked").attr("data-checkid"), c = $(".optrecommend").find(":radio:checked").parent().index(), i.elm[0].recordid = [], i.elm[0].recordid.push(s + "|" + c)) : $(".optrecommend").find(":radio").removeAttr("checked")), t(function (t) {
                                        e(r, {
                                            id: i.id,
                                            checkids: t,
                                            obj: i.elm
                                        })
                                    }, i.elm, a[0].toLocaleLowerCase())
                                }
                            },
                            tagid: "data-id"
                        })
                    },
                    menuslist: function (e) {
                        var t, n, a, r = !1,
                            i = this;
                        r = e.isajax || r, $(".menuslist").length > 0 && $(".rightset").length > 0 && $(".rightset .listcontents").length > 0 && (t = $(".menuslist").children().find("a") ? $(".menuslist").children().find("a") : $(".menuslist").children(), n = $(".rightset .listcontents"), t && n && ($(t).eq(0).parent().addClass("root"), $(t).on("click", function (e) {
                            var t = $(this);
                            return r && i.urls.menurl && (a = $(this).attr("data-id") || !1) && i.funblock()._ajax({
                                _id: "",
                                _url: "/sub/" + a + "/detail"
                            }, function (e) {
                                var a = e,
                                    r = a.html;
                                a.status ? ($(t).parent().siblings().removeClass("root"), $(t).parent().addClass("root"), n.html(""), n.html($(r)), i.funblock()._hover({
                                    _optag: ".rightset .listcontents",
                                    _tag: ">li",
                                    _targetag: ".cancelgz",
                                    _hoveAddropt: [".leftc a", "root"]
                                }, function (e) {
                                    "object" === (typeof e).toLowerCase() ? alert(e.message) : $(".cancelgz").on("click", function (e) {
                                        var t = $(this).attr("data-status"),
                                            n = [],
                                            a = $(this);
                                        return $(this).parents("li").find(".leftc a").each(function (e, t) {
                                            n[e] = $(t).attr("data-pid")
                                        }), n.push(t), i.funblock()._ajax({
                                            _id: n,
                                            _url: i.urls.attentionurl
                                        }, function (e) {
                                            var t = e,
                                                n = t.status,
                                                r = t.isatten;
                                            n && (!1 === r ? a.html("关注") : a.html("取消关注"), a.attr("data-status", r))
                                        }), e.stopPropagation(), e.preventDefault(), !1
                                    })
                                })) : alert("请求数据返回失败")
                            }), e.stopPropagation(), e.preventDefault(), !1
                        }), $(t).eq(0).trigger("click")))
                    }
                }
            }(g, $, void 0), csdn.knowledge_web = csdn.knowledge_web || {};
            for (var c in knowledge_web) exports[c] = csdn.knowledge_web[c] = knowledge_web[c];
            exports.init()
        }()
    })
}(window);