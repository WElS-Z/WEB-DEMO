function BallCreate(width, name, nameNum, color, speed) {
    this.height = this.width = width;//元素大小
    this.directionName = name;//元素方向
    this.directionNameNum = nameNum;//元素方向值
    this.speed = speed;//速度
    this.color = color;//元素背景颜色
    this.div = document.createElement('div');
    this.div.className = 'active';
    this.div.style.width = this.width + 'px';
    this.div.style.height = this.height + 'px';
    this.div.style[this.directionName[0]] = this.directionNameNum[0] + 'px';
    this.div.style[this.directionName[1]] = this.directionNameNum[1] + 'px';
    this.div.style.backgroundColor = color;
}
BallCreate.prototype.timer = function () {
    var This = this;//保存this指向
    this.directionX = 1;//方向1
    this.directionY = 1;//方向2
    this.parent = document.getElementsByClassName('wraper')[0];//获取父元素
    this.parent.appendChild(this.div);//插入元素
    this.clientW = this.parent.clientWidth;//获取可视窗口宽度
    this.clientH = this.parent.clientHeight;//获取可视窗口高度
    this.div.timer = setInterval(function () {
        // 获取当前方向的值
        var getDirection1 = parseInt(This.div.style[This.directionName[0]]);
        var getDirection2 = parseInt(This.div.style[This.directionName[1]]);
        // 判断元素是否移动到了边缘，如果是则往反方向;
        if (getDirection1 + This.height >= This.clientH) {
            //下边界
            This.directionX = -1;
        } else if (getDirection2 + This.width >= This.clientW) {
            // 右边界
            This.directionY = -1;
        } else if (getDirection1 <= 0) {
            // 上边界
            This.directionX = 1;
        } else if (getDirection2 <= 0) {
            // 左边界
            This.directionY = 1;
        }
        // 设置方向值
        This.div.style[This.directionName[0]] = getDirection1 + This.directionX + 'px';
        This.div.style[This.directionName[1]] = getDirection2 + This.directionY + 'px';
    }, this.speed);
}


function init() {
    //预设方向
    var direction = [
        ['top', 'left'],
        ['top', 'right'],
        ['bottom', 'left'],
        ['bottom', 'right']
    ];
    //可视窗口的
    // var clientW = document.documentElement.clientWidth;
    // var clientH = document.documentElement.clientHeight;
    var num = 0;//计算球的数量
    var timer = setInterval(function () {
        for (var i = randomNum(10); i > 0; i--) {
            var ball = null,//创建的球
                ballSize = null,//球的大小
                clierView = null,//可视窗口大写
                speed = null,//运动速度
                random = null,//随机方向
                rgba = null;//球的颜色

            ballSize = randomNum(100, 2);
            clierView = [randomNum(800), randomNum(600)];
            speed = randomNum(50);
            random = direction[randomNum(4)];
            rgba = 'rgba' + '(' + randomNum(255) + ',' + randomNum(255) + ',' + randomNum(255) + ',' + Math.random().toFixed(1) + ')';

            ball = new BallCreate(ballSize, random, clierView, rgba, speed);
            ball.timer();

            //控制小球生成的数量
            if (num++ >= 50) {
                clearInterval(timer);
            }
        }
    }, 1000)
}
init()

function randomNum(max, min) {
    return Math.floor((Math.random() * max || 1)) + (min || 0)
}