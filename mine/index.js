/**
 * 
 * @param {Number} tr 行数
 * @param {Number} td 列数
 * @param {Number} mineNum 雷数
 */
function Mine(tr, td, mineNum) {
    this.tr = tr; //行
    this.td = td; //列
    this.mineNum = mineNum; //雷的数量
    this.surplusMine = mineNum; //剩余雷的数量
    this.squares = []; //存储所有方块信息
    this.tds = []; //存储所有DOM元素 2维数组
    this.parentDom = document.querySelector('.gameBox'); //获取父级元素
}
/**
 * //随机生成雷
 * @returns 雷的位置
 */
Mine.prototype.randomNum = function () { 
    var mineArr = new Array(this.tr * this.td);
    for (var i = 0; i < mineArr.length; i++) {
        mineArr[i] = i;
    }
    return mineArr.sort(() => {
        return Math.random() - 0.5
    }).splice(0, this.mineNum);
}
/**
 * 生成DOM元素
 */
Mine.prototype.createDom = function () { //生成DOM元素
    var table = document.createElement('table');
    for (var i = 0; i < this.tr; i++) {
        var domTr = document.createElement('tr');
        this.tds[i] = [];
        for (var j = 0; j < this.td; j++) {
            var domTd = document.createElement('td');
            this.tds[i][j] = domTd; //存储所有td元素
            domTr.appendChild(domTd);
        }
        table.appendChild(domTr);
    }
    this.parentDom.appendChild(table);
}

/**
 * 计算周围的雷数
 *  #  #  #
 *  # 雷  #
 *  #  #  #
 * 
 * 坐标
 *      y
 * x----+-------
 *      |
 * 
 * 
 */     
Mine.prototype.getInner = function () {
    
    for (var i = 0; i < this.tr; i++) {
        for (var j = 0; j < this.td; j++) {
            if (this.squares[i][j].type == 'mine') {
                this.tds[i][j].className = 'mine';
                if (i > 0 && this.squares[i - 1][j].type == 'number') initNum.call(this, i - 1, j);//上
                if (i + 1 < this.tr && this.squares[i + 1][j].type == 'number') initNum.call(this, i + 1, j);//下
                if (j > 0 && this.squares[i][j - 1].type == 'number') initNum.call(this, i, j - 1);//左
                if (j + 1 < this.td && this.squares[i][j + 1].type == 'number') initNum.call(this, i, j + 1);//右
                if (i > 0 && j > 0 && this.squares[i - 1][j - 1].type == 'number') initNum.call(this, i - 1, j - 1);//上左
                if (i > 0 && j + 1 < this.td && this.squares[i - 1][j + 1].type == 'number') initNum.call(this, i - 1, j + 1);//上右
                if (i + 1 < this.tr && j > 0 && this.squares[i + 1][j - 1].type == 'number') initNum.call(this, i + 1, j - 1);//下左
                if (i + 1 < this.tr && j + 1 < this.td && this.squares[i + 1][j + 1].type == 'number') initNum.call(this, i + 1, j + 1);//下右
            }
        }
    }
    function initNum( y, x) {
        this.tds[y][x].innerHTML = this.squares[y][x].value += 1;
    }
}

/**
 * 初始化
 */
Mine.prototype.init = function () {
    var mineSum = this.randomNum();
    var n = 0;
    for (var i = 0; i < this.tr; i++) {
        this.squares[i] = [];
        for (var j = 0; j < this.td; j++) {

            mineSum.indexOf(n++) != -1 ?
                this.squares[i][j] = {
                    type: 'mine',
                    x: j,
                    y: i
                } :
                this.squares[i][j] = {
                    type: 'number',
                    x: j,
                    y: i,
                    value: 0
                }
        }

    }
    this.createDom();
    this.getInner();
}

var mine = new Mine(28, 28, 99);
mine.init();