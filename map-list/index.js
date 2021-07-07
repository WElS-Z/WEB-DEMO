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
f.neighbors = [e, a];

/**
 * 深度查询
 * @param {Object} node 图
 * @param {String} value 目标值
 * @param {Array} history 记录
 * @returns {Boolean} 返回值为布尔值
 */
function deepSearch(node, value, history) {
    history = history || [];//记录
    if (history.includes(node)) return -1;//找不到
    if (node.value === value) return 1; //找到了
    history.push(node);//记录
    for (var i = 0; i < node.neighbors.length; ++i) {
        if (deepSearch(node.neighbors[i], value, history) === 1) return 1;//找到了
    }
    return -1 //全部都没找到
}

/**
 * 广度搜索
 * @param {Array} nodes 图集
 * @param {String} value 目标值
 * @param {Array} history 记录
 * @returns {number} 返回值 1 || -1 
 */
function breadthSearch(nodes, value, history) {
    history = history || [];//记录
    nodes.forEach((This, index) => {//去重
        if (history.includes(This)) nodes.splice(index, 1);
    });
    var nextNodes = [];//下一个要搜索的图集
    if (!nodes.length) return -1;//找不到
    for (var i = 0; i < nodes.length; ++i) {
        if (history.includes(nodes[i])) continue; //记录里有了，跳过
        if (nodes[i].value === value) return 1; //找到了,退出
        history.push(nodes[i]);//没找到，记录
        nodes[i].neighbors.forEach((index) => {//搜索邻居
            if (!history.includes(index) && !nextNodes.includes(index)) nextNodes.push(index);
        })
    }
    return breadthSearch(nextNodes, value, history);//继续下一次
}