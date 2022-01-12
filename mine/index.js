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
Mine.prototype.randomNum = function () { //生成雷
    var mineArr = new Array(this.tr * this.td);
    for (var i = 0; i < mineArr.length; i++) {
        mineArr[i] = i;
    }
    return mineArr.sort(() => {
        return Math.random() - 0.5
    }).splice(0, this.mineNum);
}
Mine.prototype.createDom = function () { //生成DOM元素
    var table = document.createElement('table');
    for (var i = 0; i < this.tr; i++) {
        var domTr = document.createElement('tr');
        this.tds[i] = [];
        for (var j = 0; j < this.td; j++) {
            var domTd = document.createElement('td');
            domTr.appendChild(domTd);
            // domTd.innerHTML = 0;
            this.tds[i][j] = domTd; //存储所有td元素
            if (this.squares[i][j].type == 'mine') {
                domTd.className = 'mine';
            }
            if (this.squares[i][j].type == 'number') {
                //上
                if(i>=1){initNum(i-1, j,this.squares)};
                //下
                // if(i<this.tr-1&&initNum(i+1, j,this.squares));
                // //左
                // if(j!=0&&initNum(j-1, i,this.squares));
                // //右 
                // if(j<this.td-1&&initNum(j+1, i,this.squares));
                //上左 
                // if(j!=0&&j!=0&&initNum(j-1, i-1,this.squares));
                //上右 
                // if(j<this.td-1&&i!=0&&initNum(j+1, i-1,this.squares));
                //下左 
                // if(j!=0&&i<this.tr-1&&initNum(j-1, i+1,this.squares));
                //下右
                // if(j<this.td-1&&i<this.tr-1&&initNum(j+1, i+1,this.squares));
                domTd.innerHTML = this.squares[i][j].value;
            }
        }
        table.appendChild(domTr);
    }
    this.parentDom.appendChild(table);
}

function initNum(x, y,arr) {
    if (arr[x][y].type == 'mine') arr[x][y].value++;
}


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
}

var mine = new Mine(9, 9, 10);
mine.init();