/**
 * tree（树）
 * 只能通过根节点找到子节点，不能通过子节点找到父节点
 * 不形成闭环
 *
 *1.二叉树（每个节点下最多只有2个节点）
 *                a
 *             b  -   c
 *           d - e    f
 *
 *2.一个节点下含有多个子节点
 *                  a
 *             b    -    c
 *          d - e - f    g
 *
 *
 * 前序遍历  DLR
 *
 * 中序遍历  LDR
 *
 * 后序遍历  LRD
 *
 */

// // 树创建
// function Node(value) {
//     this.value = value;
//     this.childNodes = [];
// }
// var a = new Node('a');
// var b = new Node('b');
// var c = new Node('c');
// var d = new Node('d');
// var e = new Node('e');
// var f = new Node('f');
// var g = new Node('g');
// a.childNodes.push(b, e);
// b.childNodes.push(c, d);
// e.childNodes.push(f);
// f.childNodes.push(g);

// 二叉树（创建）
function Node(value) {
    this.value = value;
    this.left = null;
    this.right = null;
}
var a = new Node('a');
var b = new Node('b');
var c = new Node('c');
var d = new Node('d');
var e = new Node('e');
var f = new Node('f');
var g = new Node('g');
a.left = b;
b.left = c;
a.right = e;
b.right = d;
e.left = f;

//DLR
// /**
//  * 遍历树节点（二叉树）
//  * @param {*} target 遍历目标树
//  * @returns 返回值为数组
//  */
// function DLRNode(target) {
//     var num = target.value;
//     if (target.left) num += DLRNode(target.left);
//     if (target.right) num += DLRNode(target.right);
//     return num;
// }

// /**
//  * 遍历树节点
//  * @param {*} target 遍历的目标树
//  * @returns 返回值为字符串
//  */
// function DLRNode(target) {
//     var num = target.value;
//     for (var i = 0; i < target.childNodes.length; ++i) {
//         num += DLRNode(target.childNodes[i]);
//     }
//     return num;
// }
// var num = DLRNode(a);
// console.log(num);

/**
 * 前序遍历
 * @param {*} target 
 * @returns 
 */
function DLR(target) {
    if (!target) return;
    console.log(target.value);
    DLR(target.left);
    DLR(target.right);
}
/**
 * 中序遍历
 * @param {*} target 
 * @returns 
 */
function LDR(target) {
    if (!target) return;
    LDR(target.left);
    console.log(target.value);
    LDR(target.right);
}
/**
 * 后序遍历
 * @param {*} target 
 * @returns 
 */
function LRD(target) {
    if (!target) return;
    LRD(target.left);
    LRD(target.right);
    console.log(target.value);
}


// 根据DLR & LDR 推断 出树形结构详细解
// abcdef    cbdafe  -1
// a bcd ef  cbd a fe  -1
// b cd ef  c b d fe  -1 
// c d ef   c d fe  -1
// d ef d fe   -1
// e f f e   -1
// f f   -1
// null null 0
/**
 * 根据前序遍历（DLR）和中序遍历（LDR）输出树形结构（二叉树）
 * @param {String} dlr 前序遍历
 * @param {String} ldr 中序遍历
 * @returns {Object} 返回值为树形结构根节点
 */
function getTree(dlr, ldr) {
    if (!dlr || !ldr || dlr.length !== ldr.length) return null;
    // 分割字符串为数组
    dlr = dlr.split('');
    ldr = ldr.split('');
    // 创建树
    var node = new Node(dlr[0]);
    // 查找根节点在数组中的位置
    var index = ldr.indexOf(dlr[0]);
    // 得到左子树
    var leftDLR = dlr.slice(1, index + 1).join('');//左DLR
    var leftLDR = ldr.slice(0, index).join('');//左LDR
    node.left = getTree(leftDLR, leftLDR);
    // 得到右子树
    var rightDLR = dlr.slice(index + 1).join('');//右DLR
    var rightLDR = ldr.slice(index + 1).join('');//右LDR
    node.right = getTree(rightDLR, rightLDR);
    return node
}
var newNode = getTree('abcedfg', 'ecbdagf');

/**
 * 查询树的最大深度
 * @param {*} target  目标树
 * @returns {Number}  返回值为数子
 * @returns {Number}  数值
 */

function getLen(target) {
    if (!target) return 0;
    return Math.max(getLen(target.left), getLen(target.right)) + 1;
}

/**
 * 深度优先查询
 * @param {*} origin 二叉树
 * @param {*} target 查询目标
 * @returns {Number} 数值
 */
function depthSearch(origin, target) {
    if (!origin) return -1;
    if (origin.value === target) return 1;
    return depthSearch(origin.left, target) || depthSearch(origin.right, target)
}

/**
 * 广度优先
 * @param {*} arr 二叉树数组
 * @param {*} target 目标
 * @returns  数值 
 */
function BreadthSearch(arr, target) {
    var arrNum = [];
    if (arr.length === 0) return -1;
    for (var i = 0; i < arr.length; ++i) {
        if (arr[i].value === target) return 1;
        if (arr[i].left) arrNum.push(arr[i].left);
        if (arr[i].right) arrNum.push(arr[i].right);
    }
    return BreadthSearch(arrNum, target)
}
