var headerPos = 0, previous_scroll_pos = 0;

window.onload = function() {
    resize();
    
    var screenWidth = screen.width, width = document.body.clientWidth;
    //alert("screenW : " + screenWidth + ", width : " + width);

    debugColor();

    setImgListener(); // post-picture-image -> click
    
    setSearchListener();
    
    setReactListener();
    
    setPostListener();
    
};
function setReactListener() {
    var replyBox = document.getElementsByClassName("react-reply-box");
    var shareBox = document.getElementsByClassName("react-share-box");
    var likeBox = document.getElementsByClassName("react-like-box");
    
    for (var i = 0; i < replyBox.length; i++) {
        replyBox[i].addEventListener("click", function(event){
            console.log(event);
            console.log(this);
            var str = this.childNodes[3].innerHTML; // p tag
            var num = parseInt(str.trim(), 10);
            this.childNodes[3].innerHTML = ++num;
        }, false);
        shareBox[i].addEventListener("click", function(event){
            console.log(event);
            console.log(this);
            var str = this.childNodes[3].innerHTML; // p tag
            var num = parseInt(str.trim(), 10);
            this.childNodes[3].innerHTML = ++num;
        }, false);
        likeBox[i].addEventListener("click", function(event){
            console.log(event);
            console.log(this);
            var str = this.childNodes[3].innerHTML; // p tag
            var num = parseInt(str.trim(), 10);
            this.childNodes[3].innerHTML = ++num;
        }, false);
    }
}

window.onscroll = function(){
    locateHeader();
};

window.onresize = function() {
    resize();
};

function resize() {
    var screenWidth = screen.availWidth,
        screenHeight = screen.availHeight;
    var width = document.body.clientWidth;

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

    function resizeContent(leftSize, centerSize, rightSize) {
        var leftBox = document.getElementById("content-left");
        leftBox.style.width = leftSize;

        var centerBox = document.getElementById("content-center");
        centerBox.style.width = centerSize;

        var rightBox = document.getElementById("content-right");
        rightBox.style.width = rightSize;
    };

    function resizeHeader(padSide) {
        var headerContent = document.getElementById("header-content");
        headerContent.style.paddingLeft = padSide;
        headerContent.style.paddingRight = padSide;
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

function setImgListener() {
    var imgs = document.getElementsByClassName("post-picture");

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].addEventListener('click', function() {
            var attr = this.getAttribute("src");
            console.log("image click, src : " + attr);
        }, false);
    }
}


function setPostListener(){
    document.getElementById("post-box-textarea").addEventListener("focus", function() {
        console.log(this);
        document.getElementById("post-box").style.height = "200px";
    })
    
    document.getElementById("post-box-textarea").addEventListener("blur", function() {
        console.log(this);
        document.getElementById("post-box").style.height = "40px";
    })
    

    document.getElementById("post-button").addEventListener("click",function(){
        var date = new Date();
        
        var year = date.getFullYear();
        var month = date.getMonth() + 1;    // month: 0, 1, ..
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        
        var postTime = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
        
        var postArea = document.getElementById("post-area");
        var post = heredoc({
                postText : document.getElementById("post-box-textarea").value,
                postTime : postTime
            },function(){/*
				<article class="post">
					<header class="post-header">
						<a href="index.html"><img src="./img/kotlin.png" class="post-user-icon" /></a>
						<a href="index.html">
							<p class="post-user-name">User Name</p>
						</a>
						<p class="post-user-id">@user_id_2016</p>
						<p class="post-time">{@postTime}</p>
					</header>
					<div class="post-content">
						<p class="post-text">{@postText}</p>
					</div>
					<footer class="post-footer">
						<div class="react-area">
							<div class="react-box react-reply-box">
								<img src="./img/reply.png" class="react-img react-reply-img"/>
								<p class="react-reply-num">100</p>
							</div>
							<div class="react-box react-share-box">
								<img src="./img/share.png" class="react-img react-share-img"/>
								<p class="react-share-num">200</p>
							</div>
							<div class="react-box react-like-box">
								<img src="./img/like.png" class="react-img react-like-img"/>
								<p class="react-like-num">300</p>
							</div>
						</div>
					</footer>
				</article>
        */});
        postArea.innerHTML = post + postArea.innerHTML;
    })
}


function debugColor(){
    
}

function heredoc(data,func){
    var _data=null, _func=null;

    // 初期化
    if (typeof func === 'undefined') {
        _func = data;
        _data = {};
    } else {
        _func = func;
        _data = data;
    }

    // functionでなければ処理をしない
    if (typeof _func !== 'function') throw new Error(_func + " is not a function");
    if (!(_data instanceof Object && !(_data instanceof Array))) throw new Error(_data + " is not a object");

    // ヒアドキュメント本体を取得
    var _doc = _func.toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    // dataを回して変数の置換
    for (var _key in _data){
        var _reg = new RegExp("\\{@"+_key+"\\}","g");
        var replacement = _data[_key];
        _doc = _doc.replace(_reg, replacement);
    }

    return _doc;
}