//resize();   // resize first

window.onload = function() {
    resize();
    
    var screenWidth = screen.width;
    var width = document.body.clientWidth;
    //alert("screenW : " + screenWidth + ", width : " + width);

    debugColor();

    setImgListener(); // post-picture-image -> click
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