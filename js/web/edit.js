/**
 * Created by Mch on 4/1/18.
 */

var clMenuOn;
var hash = '#md';
var PageOn = " active cblue",
    treeMenuOn = 'root';
var eleMenus = $("#tab_title a"),
    parentTab = $("#tab_title");
var pageMenus = $("#page a");
var treeMenus = $(".treeMenu li a");
var args = function(obj) {
    var _args;
    var _nodeId = location.pathname.split('node/')[1];
    _args = _nodeId ? _nodeId : obj;
    return _args
};
if ($(".treeMenu").length > 0) {
    $(document).on("click", ".treeMenu li a", function(event) {
        fntree(event, this);
        return false
    });

    function fntree(event, this_) {
        var This = this_,
            _url, _id, _type, _this, unf = undefined;
        _id = $(this_).attr('data-mid');
        _type = $(this_).attr('data-type');
        _this = $(this_);
        (event.target.tagName).toLocaleLowerCase() == 'em' ? (_url = '/node/' + _id + '/detail', This.titleArr = [], menuajax({
            _id: _id,
            _type: _type,
            _url: _url
        }, function(reponse) {
            var re = reponse,
                status = re.status,
                html = re.html;
            if (status) {
                $(_this).parent().parents('ul').length > 2 ? (function() {
                    $('.treerlist li a').removeClass('root');
                    $(_this).parents('li').children('a').addClass('root')
                }()) : ($('.treerlist li a').removeClass('root'), $(_this).addClass('root'));
                html ? ($('.rightcontent').html(html)) : '';
                treePushState(event, this_);
                window._bd_share_main.init();
                window.csdn.knowledge_web._other()
            }
        })) : ($(_this)[0].flg == unf || $(_this)[0].flg == false ? ($(_this).parent().siblings().find('ul').hide(), $(_this).parent().siblings().find('a i').html('+'), ($(_this).parent().siblings().find('a').each(function(i, obj) {
            obj.flg = false
        })), $(_this).parent().children('ul').show(), $(_this)[0].flg = true, ($(_this).find('i').length > 0 ? ($(_this).find('i').html('-')) : '')) : ($(_this).parent().children('ul').hide(), $(_this)[0].flg = false, ($(_this).find('i').length > 0 ? ($(_this).find('i').html('+')) : '')));
        event.stopPropagation();
        event.preventDefault();
        return false
    };

    function menuajax(options, fn) {
        var _id = options._id;
        var _url = options._url;
        var _type = options._type;
        $.ajax({
            url: _url,
            type: 'get',
            async: true,
            data: {
                mid: _id,
                node_type: _type
            },
            success: function(reponse) {
                fn ? fn(reponse) : ''
            },
            error: function() {
                alert('树形菜单请求失败!')
            }
        })
    };

    function treePushState(event, _this) {
        var mid = $(_this).attr("data-mid");
        if (location.href.indexOf("/node/") > 0) {
            var url_fir = location.href.split('/node')[0] + '/node/';
            var url_fin = mid;
            var final_url = url_fir + url_fin;
            var title = document.title;
            history.pushState({
                title: title,
                url: final_url
            }, title, final_url);
        }
    }
};
if ($("#tab_field").length > 0) {;
    $(document).on("click", "#tab_field a", function(event) {
        if ($(this).hasClass("root")) {
            return false
        } else {
            fieldBases(event, this);
            return false
        }
    });

    function fieldBases(event, this_) {
        var This = this_,
            _type = "all";
        feed(_type, This, function(reponse) {
            if (reponse.status) {
                {
                    fieldbasesPushState(event, reponse.fieldType)
                }
            }
        });
        event.stopPropagation();
        event.preventDefault();
        return false
    };

    function fieldbasesPushState(event, fieldType) {
        var fieldType = fieldType;
        if (location.pathname.indexOf("/bases") >= 0) {
            var url_fir = location.href.split('/bases')[0] + '/bases/fd/'
        }
        var url_fin = fieldType;
        var final_url = url_fir + url_fin;
        var title = document.title;
        if (event && /\d/.test(event.button)) {
            history.pushState({
                title: title,
                url: final_url
            }, title, final_url)
        }
    }
};
if ($("#tab_assort").length > 0) {;
    $(document).on("click", "#tab_assort a", function(event) {
        if ($(this).hasClass("root")) {
            return false
        } else {
            fnbases(event, this);
            return false
        }
    });

    function fnbases(event, this_) {
        var This = this_,
            _type = "all";
        feed(_type, This, function(reponse) {
            if (reponse.status) {
                {
                    basesPushState(event, reponse.assortType)
                }
            }
        });
        event.stopPropagation();
        event.preventDefault();
        return false
    };

    function basesPushState(event, assortType) {
        var assortType = assortType;
        var fieldType = $("#tab_field a.root").data("type") || $("#tab_field a.root").attr("data-type");
        if (location.pathname.indexOf("/bases") >= 0) {
            var url_fir = location.href.split('/bases')[0] + '/bases/fd/' + fieldType + "/ast/"
        }
        var url_fin = assortType;
        var final_url = url_fir + url_fin;
        var title = document.title;
        if (event && /\d/.test(event.button)) {
            history.pushState({
                title: title,
                url: final_url
            }, title, final_url)
        }
    }
};
if ($("#tab_handbook").length > 0) {;
    $(document).on("click", "#tab_handbook a", function(event) {
        if ($(this).hasClass("root")) {
            return false
        } else {
            fnbases(event, this);
            return false
        }
    });

    function fnbases(event, this_) {
        var This = this_,
            _type = "all";
        feed(_type, This, function(reponse) {
            if (reponse.status) {
                {
                    basesPushState(event, reponse.assortType)
                }
            }
        });
        event.stopPropagation();
        event.preventDefault();
        return false
    };

    function basesPushState(event, assortType) {
        var assortType = assortType;
        if (location.pathname.indexOf("/handbook") >= 0) {
            var url_fir = location.href.split('/handbook')[0] + '/handbook/'
        }
        var url_fin = assortType;
        var final_url = url_fir + url_fin;
        var title = document.title;
        if (event && /\d/.test(event.button)) {
            history.pushState({
                title: title,
                url: final_url
            }, title, final_url)
        }
    }
};
if ($("#tab_title").length > 0) {;
    $(document).on("click", "#tab_title a", function(event) {
        var obj = GetRequest(this.href);
        var type = $(this).attr('contentType') ? $(this).attr('contentType') : obj['type'];
        var locObj = GetRequest(location.href);
        var locPage = locObj['page'];
        var locType = $("#codelist.codelist").length ? $('#contentType').val() : locObj['type'];
        var _args = args(this);
        if (history.pushState && type) {
            if (!locType) {
                feed(type, _args);
                dealHistory(obj, type, locPage, event, this)
            } else if (!$(this).hasClass(clMenuOn)) {
                if (!locPage) {
                    feed(type, _args);
                    dealHistory(obj, type, locPage, event, this)
                } else if (locPage && (type != locType)) {
                    feed(type, _args);
                    dealHistory(obj, type, '', event, this)
                } else if (locPage && (type == locType)) {
                    _ajaxPage(locPage, type, _args);
                    dealHistory(obj, type, locPage, event, this)
                }
            } else if ($(this).hasClass(clMenuOn) && locPage && (type == locType)) {
                _ajaxPage(locPage, _args);
                dealHistory(obj, type, locPage, event, this)
            } else if ($(this).hasClass(clMenuOn) && !locPage && (type == locType)) {
                feed(type, _args);
                dealHistory(obj, type, locPage, event, this)
            } else {
                feed(type, _args);
                dealHistory(obj, type, '', event, this)
            }
        } else if (type) {
            feed(type, _args)
        }
        return false
    })
};
$(document).on("click", '#page a', function(event) {
    event.preventDefault();
    
    var type = GetRequest(location.href).type;
    var _page = parseInt($(this).attr("data-page"));
    var _type = type ? type : $("#pageType").val();
    var _args = args(this);
    var totalPage = parseInt($('#totalPage').attr('value2'));
    if (_page == 0 || _page > totalPage) {
        return false
    };
    _ajaxPage(_page, _type, _args);
    if (history.pushState && _page && !$(this).hasClass(PageOn)) {
        pagePushState(_page, event)
    };
    $(window).scrollTop($("#md").offset().top);
    return false
});

function pagePushState(_page, event) {
    var oldUrl = '',
        final_url;
    var oldObj = GetRequest(location.href);
    var title = document.title;
    var url = 'page=' + _page;
    if (GetRequest(location.href).type) {
        oldUrl = dealUrlWithoutKey(oldObj, 'page')
    } else {
        var tHref = parentTab.find("." + clMenuOn).attr("href");
        if (tHref) {
            oldUrl = parentTab.find("." + clMenuOn).attr("href").split("?")[1]
        } else {
            oldUrl = dealUrlWithoutKey(oldObj, 'page')
        }
    }
    if (event && /\d/.test(event.button)) {
        if (oldUrl) {
            final_url = '?' + url + '&' + oldUrl + hash
        } else {
            final_url = '?' + url + hash
        }
        history.pushState({
            title: title,
            url: final_url
        }, title, final_url)
    }
};

function GetRequest(href) {
    var url = '';
    if (href) {
        url = href.split('?')[1]
    }
    var theRequest = new Object();
    var str;
    if (url) {
        str = url.split('#')[0];
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1])
        }
    }
    return theRequest
};

function dealUrl(obj) {
    var url = '';
    if (obj) {
        for (var i in obj) {
            if (obj[i] && i != 'page') {
                url += i + '=' + obj[i] + '&'
            }
        }
        url = url.substring(0, url.length - 1)
    }
    return url
};

function dealUrlWithoutKey(obj, key) {
    var url = '';
    if (obj) {
        for (var i in obj) {
            if (obj[i] && i != key) {
                url += i + '=' + obj[i] + '&'
            }
        }
        url = url.substring(0, url.length - 1)
    }
    return url
};

function dealHistory(obj, type, page, event) {
    var title = document.title;
    var url = '';
    if ($("#codelist.codelist").length.length) {
        url = location.href.split('/resource/')[0] + '/resource/' + type;
        history.pushState({
            title: title,
            url: url
        }, title, url)
    } else {
        if (obj) {
            url = dealUrlWithoutKey(obj, 'type')
        }
        if (event && /\d/.test(event.button)) {
            var final_url = location.href.split("?")[0];
            if (type) {
                final_url += "?type=" + type
            }
            if (url) {
                final_url = final_url + '&' + url
            }
            if (page) {
                final_url += hash
            }
            history.pushState({
                title: title,
                url: final_url
            }, title, final_url)
        }
    }
    return false
};
var fnHashTrigger = function(n, target) {
    var eleTarget = target || null,
        type, page;
    var q, node;
    var Request2 = new Object();
    var curTab = parentTab.find("." + clMenuOn);
    var curType = curTab.attr('contentType') ? curTab.attr('contentType') : GetRequest(curTab.attr("href")).type;
    if (location.href.indexOf("/node/") > 0) {
        var curNode = treeMenus.filter(".root").last().attr("data-mid");
        var loc = location.pathname.split("/node/")[1];
        var locNode = loc.split("/")[0]
    }
    var Request = GetRequest(location.href);
    type = $("#codelist.codelist").length.length ? location.href.split('?')[0].split('/resource/')[1] : Request['type'];
    page = parseInt(Request['page']);
    var absenceType = parentTab.attr('push_type') || true;
    if (n == 0 && typeof type == "undefined" && !page) {} else if (location.href.indexOf("/node/") > 0 && locNode != curNode) {
        treeMenus.each(function() {
            node = $(this).attr("data-mid");
            if (eleTarget === null && node === locNode) {
                eleTarget = curNode ? this.children[1] : this
            }
        });
        if (!eleTarget) {
            history.replaceState(null, document.title, location.href.split("?")[0]);
            fnHashTrigger(1)
        } else {
            $(eleTarget).trigger("click")
        }
    } else if (!page && absenceType === 'false') {
        $(pageMenus[0]).trigger("click")
    } else if (!page) {
        if (eleMenus)
            if (n == 1 && typeof type == "undefined") {
                var type = GetRequest(parentTab.find(".fir").attr("href")).type
            };
        eleMenus.each(function() {
            Request2 = GetRequest(this.href);
            q = Request2['type'];
            if (eleTarget === null && q === type) {
                eleTarget = curNode ? this.children[1] : this
            }
        });
        if (!eleTarget) {
            if (!type) {
                return false
            } else {
                history.replaceState(null, document.title, location.href.split("?")[0]);
                fnHashTrigger(1)
            }
        } else {
            $(eleTarget).trigger("click")
        }
    } else if (page) {
        if (type == curType || (!curType && !type)) {
            pageMenus.each(function() {
                q = parseInt($(this).data("page") || $(this).attr("data-page"));
                if (eleTarget === null && q === page) {
                    eleTarget = this
                }
            });
            if (!eleTarget) {
                history.replaceState(null, document.title, location.href.split("?")[0]);
                fnHashTrigger(1)
            } else {
                $(eleTarget).trigger("click")
            }
        } else if (type != curType) {
            eleMenus.each(function() {
                q = parseInt($(this).data("page") || $(this).attr("data-page"));
                if (eleTarget === null && q === type) {
                    eleTarget = curNode ? this.children[1] : this
                }
            });
            var notCurTab = parentTab.find(".type_" + type);
            $(curTab).removeClass(clMenuOn);
            $(notCurTab).addClass(clMenuOn);
            if (!eleTarget) {
                _ajaxPage(page, type, locNode ? locNode : this);
                pagePushState(page)
            } else {
                $(eleTarget).trigger("click")
            }
        }
    } else {
        fnHashTrigger(1)
    }
    return false
};
if (history.pushState) {
    window.addEventListener("popstate", function() {
        fnHashTrigger(1)
    });
    fnHashTrigger(0)
}