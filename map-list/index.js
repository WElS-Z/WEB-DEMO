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
 * @param {String} value 查询值
 * @param {Array} history 已判断后的记录
 * @returns {Boolean} 返回值为布尔值
 */
function deepSearch(origin, value, history) {
    history = history || [];//兼容未传入值或搜索的记录
    if (history.includes(origin)) return -1;//所有节点都已搜索，未找到
    if (origin.value === value) return 1; //当前节点就是要搜索的目标
    history.push(origin);//记录一下已查过的节点
    for (var i = 0; i < origin.neighbors.length; i++) {
        //诶个查询搜索 找到就退出搜索
        if (deepSearch(origin.neighbors[i], value, history) === 1) return 1;
    }
    return -1 //全部都看完了，都没找到
}