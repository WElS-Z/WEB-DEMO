/**
 * 图
 * @param {String} value 节点值
 */
function Node(value) {
    this.value = value;
    this.neighbors = [];
}
var a = new Node('a');
var b = new Node('b');
var c = new Node('c');
var d = new Node('d');
var e = new Node('e');
var f = new Node('f');

a.neighbors = [b, e, f];
b.neighbors = [a, c];
c.neighbors = [b, d];
d.neighbors = [c, e];
e.neighbors = [d, f, a];

/**
 * 深度查询
 * @param {Object} origin 图
 * @param {String} value 目标值
 * @param {Array} history 记录
 * @returns {Boolean} 返回值为布尔值
 */
function deepSearch(origin, value, history) {
    history = history || [];//未传入值或搜索的记录
    if (history.includes(origin)) return -1;//找不到
    if (origin.value === value) return 1; //找到了
    history.push(origin);//记录
    for (var i = 0; i < origin.neighbors.length; ++i) {
        //找到了
        if (deepSearch(origin.neighbors[i], value, history) === 1) return 1;
    }
    return -1 //全部都没找到
}

/**
 * 广度搜索
 * @param {Array} origin 图
 * @param {String} value 目标值
 * @param {Array} history 记录
 * @returns 返回值
 */
function breadthSearch(origin, value, history) {
    history = history || [];//记录
    var ArrNum = [];
    if (!origin.length) return -1;//找不到
    for (var i = 0; i < origin.length; ++i) {
        if (origin[i].value === value) return 1; //找到了
        if (history.includes(origin[i])) continue; //记录里有了
        history.push(origin[i]);//记录
        for (var j = 0; j < origin[i].neighbors.length; ++j) {//看邻居有没有
            ArrNum.push(origin[i].neighbors[j]);
        }
    }
    return breadthSearch(ArrNum, value, history);
}