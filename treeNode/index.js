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
a.right = f;
b.left = c;
b.right = d;
c.left = e;
f.left = g;

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


/**
 * 根据前序遍历（DLR）和中序遍历（LDR）输出树形结构（二叉树）
 * @param {String} dlr 前序遍历
 * @param {String} ldr 中序遍历
 * @returns {Object} 返回值为树形结构根节点
 */
function getTree(dlr, ldr) {
    dlr = typeof (dlr) === 'string' ? dlr.split('') : dlr;
    ldr = typeof (ldr) === 'string' ? ldr.split('') : ldr;
    var dlrLen = dlr.length,
        ldrLen = ldr.length;
    if (!dlr || !ldr || dlrLen !== ldrLen) return;
    for (var i = 0; i < dlrLen; ++i) {
        if (ldr[i] === dlr[0]) {
            var node = new Node(dlr[0]);
            node.left = getTree(dlr.slice(1, i + 1), ldr.slice(0, i));
            node.right = getTree(dlr.slice(i + 1, dlrLen), ldr.slice(i + 1, ldrLen));
            return node;
        }
    }
}
var r = getTree('abcedfg', 'ecbdagf');
// 根据DLR & LDR 推断 出树形结构详细解
// abcdef    cbdafe  -1
// a bcd ef  cbd a fe  -1
// b cd ef  c b d fe  -1 
// c d ef   c d fe  -1