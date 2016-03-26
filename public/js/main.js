var headerPos = 0, previous_scroll_pos = 0;

window.onload = function() {
    resize();
    
    var screenWidth = screen.width, width = document.body.clientWidth;
    //alert("screenW : " + screenWidth + ", width : " + width);

    debugColor();

    setImgListener(); // post-picture-image -> click
    
    setSearchListener();
    
    setReactListener();
    
};

function setReactListener() {
    var replyBox = document.getElementsByClassName("react-reply-box");
    var shareBox = document.getElementsByClassName("react-share-box");
    var likeBox = document.getElementsByClassName("react-like-box");
    
    var replyNum = document.getElementsByClassName("react-reply-num");
    var shareNum = document.getElementsByClassName("react-share-num");
    var likeNum = document.getElementsByClassName("react-like-num");
    
    for (var i = 0; i < replyBox.length; i++) {
        replyBox[i].addEventListener("click", function(event){
            var str = replyNum[0].innerHTML;
            var nb = parseInt(str.trim(), 10);
            replyNum[0].innerHTML = ++nb;
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
    var searchBox = document.getElementById("searchBox");
    
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


function debugColor(){
    
}