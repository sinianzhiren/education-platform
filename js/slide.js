window.onload = function () {
  //获取一堆元素
    var slide = document.getElementById('slide');
    //获取第一个ul下面的li标签
    var imgList = document.getElementById('imgList');
    var listLi = imgList.children;
    //获取第二个ul下面的li
    var rectangle = document.getElementById('rectangle');
    var reList = rectangle.children;
    //获取左右两个按钮
    var prev = document.getElementById('prev');
    var next = document.getElementById('next');
    //定时器
    var time;
    //点击事件
    prev.onclick = function () {
        moveRight();
        tab();
    };
        next.onclick = function () {
            moveLeft();
           tab();
        };
        //向左移动
    function moveLeft() {
        var leftLength = imgList.style.left;
         var left = parseInt(leftLength) - 750+"px";
        imgList.style.left = left;
        var leftnumber = Math.abs(parseInt(left));
        if (leftnumber > 3000){
            imgList.style.left = 0+'px';
        }
        leftLength = imgList.style.left;

    }
    //向右移动
    function moveRight() {
        var left = imgList.style.left;
        var leftnumber = parseInt(left);
        if (leftnumber == 0){
            imgList.style.left = -3000+'px';
        }else {
            imgList.style.left = leftnumber + 750+'px';
        }
        left = imgList.style.left;
    }
    //竖条点击的时候对应相应的图片
    for (var i =0;i<reList.length;i++){
        (function (a1) {
            reList[i].onclick = function () {
                for (var j=0;j<reList.length;j++){
                    reList[j].setAttribute('class',"");
                }
                var leftnu = parseInt(imgList.style.left);
                imgList.style.left = a1*(-750)+'px';
                reList[a1].setAttribute('class','styleLi');
            }
        })(i);
    }
    //点击的时候正好对应这个点
    function tab() {
        var index = Math.abs(parseInt(imgList.style.left)/750);
        for (var i = 0; i<reList.length;i++){
            if (i !== index){
                    if (reList[i].getAttribute('class') == 'styleLi'){
                        reList[i].setAttribute('class','');
                    }else {
                        reList[index].setAttribute('class','styleLi');
                    }
            }
        }
    }
    //设置定时器自动播放
    function go() {
        time = setInterval(function () {
            moveLeft();
            tab()
        },2000)
    }
    go();
    //鼠标放上去的时候，清除自动播放，鼠标移开自动播放
    slide.onmouseover = function () {
        clearInterval(time)
    };
    slide.onmouseout = function () {
        go();
    }






};