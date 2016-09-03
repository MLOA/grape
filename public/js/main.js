var headerPos = 0, previous_scroll_pos = 0;
var request = window.superagent;
var userId = "userId0120";

window.onload = function() {
    setColorMode("light");  // debug, light
    
    resize();
    
    changePostTime("relative");

    setSearchListener();
    setPostListener();
    
    window.setInterval(getPosts, 1000);
};

window.onscroll = function() {
    //locateHeader();
};

window.onresize = function() {
    resize();
};

function resize() {
    var screenWidth = screen.availWidth,
        screenHeight = screen.availHeight;
    var width = document.body.clientWidth;
    
    //console.log("screenW : " + screenWidth + ", width : " + width);

    if (screenWidth <= 600) resizeContent("0%", "100%", "0%"); // smartphone
    else if (screenWidth <= 800) resizeContent("10%", "80%", "10%"); // tablet
    else if (screenWidth <= 1200) resizeContent("15%", "70%", "15%"); // large tablet
    else { // pc
        if (width <= 600) {
            resizeContent("0%", "100%", "0%");
            resizeHeader("0%", "0%");
        }
        else {
            var sideW = (width - 600) / 2;
            resizeContent(sideW + "px", "600px", sideW + "px");
            resizeHeader(sideW * 2 / 3 + "px");
        }
    }
    
    resizeSearch();
    
    function resizeContent(leftSize, centerSize, rightSize) {
        document.getElementById("content-left").style.width = leftSize;
        document.getElementById("content-center").style.width = centerSize;
        document.getElementById("content-right").style.width = rightSize;
    }
    function resizeHeader(padSide) {
        var headerContent = document.getElementById("header-content");
        headerContent.style.paddingLeft = padSide;
        headerContent.style.paddingRight = padSide;
    }
    function resizeSearch(){
        var searchBoxW = document.getElementById("search-box").offsetWidth;
        var imgW = document.getElementById("search-box-img").offsetWidth;
        var input = document.getElementById("search-box-input");
        input.style.width = (searchBoxW - 2.3 * imgW) + "px";
    }
}

function setColorMode(mode){
    if (mode === "debug"){
        tagBgColor("body", "#999999");
        
        idBgColor("header", "red");
        idBgColor("headerBG", "#00ff00");
        idBgColor("logo", " #aa00aa");
        idBgColor("search", "#555555");
        idBgColor("search-box-input", "magenta");
        idBgColor("buttons", "#0000aa");
        idBgColor("buttons-inner", "yellow");
        
        idBgColor("content-left", "#eeeeee");
        idBgColor("content-center", "#ddddee");
        idBgColor("content-right", "#eeeeee");
        
        idBgColor("post-box", "purple");
        idBgColor("post-box-buttons", "yellow");
        idBgColor("post-button-container", "pink");
        
        classBgColor("post", "white");
        classBgColor("post-header", "#ffff00");
        classBgColor("post-content", "#ffffff");
        classBgColor("post-text", "gray");
        classBgColor("post-footer", "brown");
        classBgColor("react-area", "yellow");
        classBgColor("react-box", "lightGray");
        
        idBgColor("footer", "magenta");
        
    } else if (mode === "light") {
        tagBgColor("body", "#F5F5F5");
        idBgColor("header", "purple");
        idBgColor("post-box", "white");
        classBgColor("post", "white");
    }
    
    function idBgColor(id, color) {
        document.getElementById(id).style.backgroundColor = color;
    }
    function classBgColor(className, color) {
        var classes = document.getElementsByClassName(className);
        for (var i = 0; i < classes.length; i++) classes[i].style.backgroundColor = color;
    }
    function tagBgColor(tag, color) {
        var tags = document.getElementsByTagName(tag);
        for (var i = 0; i < tags.length; i++) tags[i].style.backgroundColor = color;
    }
    
}

function locateHeader() {
    var current_pos = document.documentElement.scrollTop || document.body.scrollTop;
    var dif_pos = current_pos - previous_scroll_pos;
    
    if (dif_pos > 0) setHeaderPos(headerPos - dif_pos);    // down -> hide header
    else setHeaderPos(headerPos - dif_pos);    // up -> appear header
    previous_scroll_pos = current_pos;
    
    function setHeaderPos(posY) {
        var header = document.getElementById("header"), headerH = header.clientHeight;
        var headerBG = document.getElementById("headerBG");
        
        if (posY < -headerH) posY = -headerH;   // over up
        if (posY > 0) posY = 0; // over down
        
        header.style.top = posY + "px";
        headerBG.style.height = headerH + posY + "px";
        
        headerPos = posY;
    }
}

function setSearchListener() {
    var searchBox = document.getElementById("search-box");
    
    searchBox.addEventListener("keyup", function(event) {
        var text = event.target.value;
        if (event.keyCode == 13) console.log("Enter -> search: " + text);
        else console.log(text);
    }, false);
}

function changePostTime(mode) { // vanish someday & server side process
    if (mode === "relative") {
        var times = document.getElementsByClassName("post-time");

        for (var i = 0; i < times.length; i++) {
            var t = times[i].innerHTML.split("-");
            var year = Number(t[0]), month = Number(t[1]), date = Number(t[2]);
            var hour = Number(t[3]), minut = Number(t[4]), second = Number(t[5]);
            
            var current = getTime();
        }
    }
    
    function getTime() {        // month: 0, 1, 2..
        var time = new Date();
        var year = time.getFullYear(), month = time.getMonth() + 1, date = time.getDate();
        var hour = time.getHours(), minute = time.getMinutes(), second = time.getSeconds();
        return [year, month, date, hour, minute, second];
    }
}

function setImgListener() {
    var imgs = document.getElementsByClassName("post-picture");

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', function() {
            var attr = this.getAttribute("src");
            console.log("image click, src : " + attr);
        }, false);
    }
}

function setReactListener() {
    var replyBox = document.getElementsByClassName("react-reply-box");
    var shareBox = document.getElementsByClassName("react-share-box");
    var likeBox = document.getElementsByClassName("react-like-box");
    
    for (var i = 0; i < replyBox.length; i++) {
        replyBox[i].addEventListener("click", function(event){
            var replyText = "にゃーん";
            // console.log("replied");
            // var str = this.childNodes[3].innerHTML; // p tag
            // var num = parseInt(str.trim(), 10);
            // this.childNodes[3].innerHTML = ++num;            
            sendReply(this.childNodes[5].value, replyText);
        }, false);
        shareBox[i].addEventListener("click", function(event){
            // console.log("shared");
            // var str = this.childNodes[3].innerHTML; // p tag
            // var num = parseInt(str.trim(), 10);
            // this.childNodes[3].innerHTML = ++num;            
            sendShare(this.childNodes[5].value);
        }, false);
        likeBox[i].addEventListener("click", function(event){
            // console.log("liked");
            // var str = this.childNodes[3].innerHTML; // p tag
            // var num = parseInt(str.trim(), 10);
            // this.childNodes[3].innerHTML = ++num;            
            sendLike(this.childNodes[5].value);
        }, false);
    }
}

function setPostListener(){
    document.getElementById("post-button").addEventListener("click",function(){
        var text = document.getElementById("post-box-textarea").value;
        sendPost(userId, text);
        
        document.getElementById("modal-close-button").click();
    });
}

function sendPost(postUserId, postText){
    var url = "https://grape-salmon2073.c9users.io/shimacchau";
    request
        .post(url)
        .send({
            userId : postUserId,
            text : postText
        })
        .end(function(err, res){
            console.log(err, res.text);
        });
}

function getPosts(){
    request
    .get("https://grape-salmon2073.c9users.io/hoge")
    .query({})
    .end(function(err, res){
        var originStatuses = res.body;
        var statuses = "";
        for(var index in originStatuses){
            var originStatus = originStatuses[index];
            var pattern = /([0-9]+)-([0-9][0-9])-([0-9][0-9])T([0-9][0-9]):([0-9][0-9]):([0-9][0-9]).*/;
            
            var matches = pattern.exec(originStatus.date);
            var tmpDate = new Date(Date.UTC(matches[1], matches[2], matches[3], matches[4], matches[5], matches[6]));

            var date = tmpDate.getFullYear() + "-" + tmpDate.getMonth() + "-" + tmpDate.getDate() + "-" + tmpDate.getHours() + "-" + tmpDate.getMinutes() + "-" + tmpDate.getSeconds();
            var status = createPostArticle(originStatus._id, originStatus.author_id.user_id, originStatus.author_id.screen_name, date, originStatus.text,originStatus.reply_from.length, originStatus.shared.length, originStatus.liked.length);
            statuses = status + statuses;
        }
        addPostArticles(statuses);
        setReactListener();
        setImgListener();
    });
}

function createPostArticle(postId, postUserName, postUserId, postTime, postText, replied, shared, liked){
    var status = heredoc({
            postId : postId,
            postUserName : postUserName,
            postUserId : postUserId,
            postText : postText,
            postTime : postTime,
            replied : replied,
            shared : shared,
            liked : liked
        },function(){/*
			<article class="post">
				<header class="post-header">
					<a href="index.html"><img src="./img/kotlin.png" class="post-user-icon" /></a>
					<a href="index.html">
						<p class="post-user-name">{@postUserName}</p>
					</a>
					<p class="post-user-id">{@postUserId}</p>
					<p class="post-time">{@postTime}</p>
				</header>
				<div class="post-content">
					<p class="post-text">{@postText}</p>
				</div>
				<footer class="post-footer">
					<div class="react-area">
						<div class="react-box react-reply-box">
							<img src="./img/reply.png" class="react-img react-reply-img"/>
							<p class="react-reply-num">{@replied}</p>
							<input type="hidden" value="{@postId}">
						</div>
						<div class="react-box react-share-box">
							<img src="./img/share.png" class="react-img react-share-img"/>
							<p class="react-share-num">{@shared}</p>
							<input type="hidden" value="{@postId}">
						</div>
						<div class="react-box react-like-box">
							<img src="./img/like.png" class="react-img react-like-img"/>
							<p class="react-like-num">{@liked}</p>
							<input type="hidden" value="{@postId}">
						</div>
					</div>
				</footer>
			</article>
    */});
    return status;
}

function addPostArticles(statuses){
    var postArea = document.getElementById("post-area");
    postArea.innerHTML = statuses;
}

function heredoc(data,func){
    var _data = null, _func = null;

    // 初期化
    if (typeof func === 'undefined') {
        _func = data;
        _data = {};
    } else {
        _func = func;
        _data = data;
    }


    if (typeof _func !== 'function') throw new Error(_func + " is not a function");
    if (!(_data instanceof Object && !(_data instanceof Array))) throw new Error(_data + " is not a object");

    var _doc = _func.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    for (var _key in _data){
        var _reg = new RegExp("\\{@"+_key+"\\}","g");
        var replacement = _data[_key];
        _doc = _doc.replace(_reg, replacement);
    }

    return _doc;
}

function sendReply(postId, replyText){
    var url = "https://grape-salmon2073.c9users.io/updateReply";
    request
        .post(url)
        .send({
            userId : userId,
            postId : postId,
            replyText : replyText
        })
        .end(function(err, res){
            console.log(err, res.text);
        });
}

function sendShare(postId){
    var url = "https://grape-salmon2073.c9users.io/updateShare";
    request
        .post(url)
        .send({
            userId : userId,
            postId : postId
        })
        .end(function(err, res){
            console.log(err, res.text);
        });
}

function sendLike(postId){
    var url = "https://grape-salmon2073.c9users.io/updateLike";
    request
        .post(url)
        .send({
            userId : userId,
            postId : postId
        })
        .end(function(err, res){
            console.log(err, res.text);
        });
}
