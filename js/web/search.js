/**
 * Created by mzh on 2/13/18.
 */
$(document).ready(function () {
  var pathname = location.pathname;
  var baseId, v = $("#base_id").val(), locUrl;
  if (v)  baseId = v;
  $("#nav_search_top .search-inp").val('搜索知识...');
  //站外搜索样式
  if (!$("#base_id").val()) {
    var searchContainer = $('.searchku');
    searchContainer.find('.resultp').css('display', 'block');
    searchContainer.find('.hotsearchall').css('display', 'block');
    searchContainer.find('.alltext').css('display', 'block');
    searchContainer.find('.hotsearch').css('display', 'none');
  }

  if (pathname.lastIndexOf('search') >= 0) {
    var keyWord = $("#keyword").val();
    $("#nav_search_top .search-inp").val(keyWord || '搜索知识...');
  }
  _ajaxHotWords(baseId);
});

function _ajaxHotWords(baseId) {
  var _url = "http://lib.csdn.net/public/api/hotSearch";
  $.ajax({
    cache: true,
    type: "get",
    url: _url,
    data: {
      baseId: baseId
    },
    error: function (request) {

    },
    success: function (result) {
      var msg = result.msg;
      if (msg == 'ok') {
        var data = result.data;
        var hotWordsList = $(".hot-word");
        var html = '';
        var url = $("#search-form").attr("action");
        for (var i in data) {
          var s = url + '/' + encodeURIComponent(data[i].word);
          html += '<li class="search-li"><a href=' + s + ' target="_blank"><span class="hot-de">' + data[i].word + '</span></a></li>';
        }
        hotWordsList.html(html);
      } else {
        alert(msg);
      }
    }
  });
}

if (typeof localStorage !== 'undefined' && typeof JSON !== 'undefined') {
  var searchHistory = new ViewHistory();
  searchHistory.init({
    limit: 1,
    storageKey: 'searchHistory',
    primaryKey: 'id'
  });
}

var his = searchHistory.getHistories();
if (his[0])
  $(".resultp").first().html("<span class='last' style='cursor:pointer;'><i class='fa fa-clock-o'></i>" + his[0].id + "<i class='fa fa-close'></i></span>")
//
var checkUnreadArticles = function () {
  // get username from cookie
  var myUsername = getCookieValue('UserName');
  // if the username exists, (if you are logged in)
  if (myUsername) {
    var _url = "/public/api/checkUnreadArticles";
    $.ajax({
      cache: true,
      type: "get",
      url: _url,
      data: {
        username: myUsername
      },
      error: function (request) {
        console.log("checkunread failed");
      },
      success: function (result) {
        if (result.hasUnreadArticles) {
          // if you have unread articles, add unreadArticles class
          // so css can show a notification
          $('#myknowledgebase').addClass('unreadArticles').append("<i></i>");
          $('#mysubscription').append("<i></i>");
        }
      }
    });
  }
};

function getCookieValue(a, b) {
  b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
}

checkUnreadArticles();
