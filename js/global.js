// window.CONTEXT_PATH = "http://localhost:8000/d3.js/graph/public/index.php";
window.CONTEXT_PATH = "http://localhost/d3.js/graph/public/index.php";

var getSingle = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
};


/**
 * var load_js = new Script(script_onload);
 * load_js.set("http://static.gongju.com/js/jquery-1.4.4.min.js");
 *
 * @param callback jsæ–‡ä»¶åŠ è½½å®Œäº†callback function
 */
function Script(callback) {
    var js = document.createElement("script");
    this.js = js;
    js.type = "text/javascript";
    document.body.appendChild(js);

    Script.prototype.set = function(url) {
        this.js.src = url;
    };
    if (callback) {
        if (navigator.appName.toLowerCase().indexOf('netscape') === -1) {
            js.onreadystatechange = function() {
                js.readyState === 'complete' && callback(this);
            }
        } else {
            js.onload = function() {
                callback(this);
            }
        }
    }
}
