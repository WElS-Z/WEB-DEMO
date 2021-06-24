/**
 * 
 * fullName:weishengzhong
 * createDate:2021-2
 * 
 * file:tools.js
 * */


/**
 * 值类型判断
 * @param {*} target 类型判断目标
 */
function type(target) {
    var str = Object.prototype.toString.call(target),
        ret = typeof (target),
        tempLate = {
            "[object Object]": 'object',
            "[object Array]": 'array',
            "[object String]": "string-object",
            "[object Number]": "number-object",
            "[object Boolean]": "boolean-object"
        }
    if (target === null) {
        return "null"
    } else if (ret === "object") {
        return tempLate[str];
    } else return ret
}

// 排序（sort()方法）
// 原理：返回值为正数a在前、返回值为负数时b在前，为0时不动
// 升序 ：return a - b；
// 降序 ：return b - a；
// 乱序 ：return Math.random() - 0.5；
// arr.sort((a, b) => { return a - b })


/**
 * 深度克隆
 * @param {*} origin 被克隆目标
 * @param {*} target 克隆接收目标
 */
function deepClone(origin, target) {
    var target = target || {},
        toStr = Object.prototype.toString;
    for (var prop in origin) {//遍历所有属性
        if (origin.hasOwnProperty(prop)) {//处理原型链数据
            if (origin[prop] !== "null" && typeof (origin[prop]) == 'object') {//判断是否为原始值
                target[prop] = toStr.call(origin[prop]) == "[object Array]" ? [] : {};//判断是否为数组是则创建数组否则创建对象
                deepClone(origin[prop], target[prop]);//递归遍历所有子属性
            } else {
                target[prop] = origin[prop];//出口兼容处理原始值
            }
        }
    }
    return target
}

// 浅克隆
function clone(Origin, Target) {
    var Target = Target || {};
    for (var prop in Origin) {
        Target[prop] = Origin[prop]
    }
    return Target
}


// 圣杯模式

// 一
// function inherit(Target, Origin) {
//     function F() { };
//     F.prototype = Origin.prototype;
//     Target.prototype = new F();
//     Target.prototype.constuctor = Target;
//     Target.prototype.uber = Origin.prototype;
// }


// 二（雅虎YUI3）
var inherit = (function () {
    var F = function () { };
    return function (Target, Origin) {
        F.prototype = Origin.prototype;
        Target.prototype = new F();
        Target.prototype.constuctor = Target;
        Target.prototype.uber = Origin.prototype;
    }
}());


// 数字转换大写
function capsTurn(target) {
    var str = target.split('');
    var obj = {
        0: "零",
        1: "壹",
        2: "贰",
        3: "叁",
        4: "肆",
        5: "伍",
        6: "陆",
        7: "柒",
        8: "捌",
        9: "玖",
    }
    for (var i = 0; i <= str.length - 1; i++) {
        str[i] = obj[str[i]];
    }
    return str.join('')
}


/**
 * 斐波那契数列
 * @param {*} n 斐波那契数列n的结果
 */
function Fib(n) {
    return n <= 1 ? n : Fib(n - 1) + Fib(n - 2);
}


/**
 * 阶乘
 * @param {*} n 阶乘为n的结果
 */
function jc(n) {
    return n <= 1 ? n : n * jc(n - 1)
}


// 数组去重
//字符串去重使用Array.split()拆散为数组再使用数组方法去重然后使用Array.join()重组
Array.prototype.unique = function () {
    var temp = {},
        arr = [],
        len = this.length;
    for (var i = 0; i < len - 1; i++) {
        if (!temp[this[i]]) {
            temp[this[i]] = 'abc';
            arr.push(this[i])
        }
    }
    return arr
}


// 字符串字节长度
String.prototype.strByte = function () {
    var numBit = this.length;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 255) {
            numBit++;
        }
    }
    return numBit
}


// ****类数组
// 必须要有length、最好加上push方法
// splice 加上该方法将会改变返回为数组对象。
var classArr = {
    length: 0,
    push: Array.prototype.push,
    splice: Array.prototype.splice
}

// 获取元素的祖先元素
//递归
// var fatherEle = function (ele, n) {
//     if (ele !== null && n >= 1) {
//         return fatherEle(ele.parentNode, n - 1)
//     } else return ele
// }
//循环
var fatherEle = function (ele, n) {
    while (ele && n) {
        ele = ele.parentNode;
        n--;
    }
    return ele
}

// 获取元素的兄弟元素 N大于0返回后面的元素，小于0返回前面的数，0则返回自己
// 一 递归
// var brotherEle = function (ele, n) {
//     if (ele && n) {
//         ele = n >= 1 ? ele.nextSibling : ele.previousSibling;
//         if (ele.nodeType != 1) {
//             return ele = n >= 1 ? brotherEle(ele.nextSibling, n - 1) : brotherEle(ele.previousSibling, n + 1);
//         }
//     }
//     return ele
// }

// 二 循环
var brotherEle = function (ele, n) {
    while (ele && n) {
        if (n > 0) {
            if (ele.nextElementSibling) {
                ele = ele.nextElementSibling;
            } else {
                for (ele = ele.nextSibling; ele && ele.nodeType != 1; ele = ele.nextSibling);
            }
            n--;
        } else if (n < 0) {
            if (ele.previousElementSibling) {
                ele = ele.previousElementSibling;
            } else {
                for (ele.previousSibling; ele && ele.nodeType != 1; ele = ele.previousSibling);
            }
            n++;
        }
    }
    return ele
}

// 封装myChildren
// 一 函数表达式
// var myChildren = function (ele) {
//     var ele = ele.childNodes,
//         classArr = {
//             length: 0,
//             push: Array.prototype.push,
//             splice: Array.prototype.splice
//         };
//     for (var prop in ele) {
//         if (ele[prop].nodeType === 1) {
//             classArr.push(ele[prop])
//         }
//     }
//     return classArr
// }
// 二 原型链
Element.prototype.myChildren = function () {
    var ele = this.childNodes,
        arr = [];
    for (var prop in ele) {
        if (ele[prop].nodeType === 1) {
            arr.push(ele[prop])
        }
    }
    return arr
}

//封装isChildNodes 元素是否有子节点 返回值为Boolean
// 一  函数表达式
// var isChildNodes = function (ele) {
//     if (ele.childNodes.length !== 0) {
//         return true
//     } return false
// }
// 二  原型链
Element.prototype.isChildNodes = function () {
    if (this.childNodes.length !== 0) {
        return true
    } return false
}

// 将target插入到origin后面
// 考虑老版本浏览器兼容
// Element.prototype.insertAfter = function (target, origin) {
//     var ele = origin.nextElementSibling ? ele = origin.nextElementSibling : ele = origin.nextSibling;
//     if (!origin.nextElementSibling && ele.nodeType != 1) {
//         ele = ele.nextSibling;
//     }
//     ele != null ? this.insertBefore(target, ele) : this.appendChild(target);
// }
// 不考虑老版本浏览器兼容
Element.prototype.insertAfter = function (target, origin) {
    var ele = origin.nextElementSibling;
    ele != null ? this.insertBefore(target, ele) : this.appendChild(target);
}

// 返回鼠标滚轮滚动的距离
function getScrollOffset() {
    if (window.pageXOffset) {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset,
        }
    } else {
        return {
            x: document.body.scrollLeft + document.documentElement.scrollLeft,
            y: document.body.scrollTop + document.documentElement.scrollTop,
        }
    }
}

//可视区域的大小
function getViewportFOffset() {
    if (window.innerWidth) {
        return {
            w: window.innerWidth,
            h: window.innerHeight,
        }
    } else {
        if (document.compatMode === "BackCompat") {
            return {
                w: document.body.clientWidth,
                h: document.body.clientHeight,
            }
        } else {
            return {
                w: document.documentElement.clientWidth,
                h: document.documentElement.clientHeight,
            }
        }
    }
}

/**
 * 读取元素的计算样式
 * @param {*} ele DOM元素
 * @param {*} prop style 属性
 */

function getStyle(ele, prop) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele, null)[prop];
    } else {
        return ele.currentStyle[prop];
    }
}

/**
 * addEvent事件处理函数
 * @param {*} ele DOM元素
 * @param {*} type 事件类型
 * @param {*} handle 事件处理函数
 */
function addEvent(ele, type, handle) {
    if (ele.addEventListener) {
        ele.addEventListener(type, handle, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, function () {
            handle.call(ele);
        })
    } else {
        ele['on' + type] = handle;
    }
}

/**
 * 取消冒泡
 * @param {*} event 事件对象
 */
function stopBubble(event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelbubble = true;
    }
}

/**
 * 阻止事件
 * @param {*} event 事件对象
 */
function cancelHandler(event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}

/**
 * DOM拖拽处理函数
 * @param {*} ele DOM元素
 */
function drag(ele) {
    var disX,
        disY,
        lockS = 0;
    addEvent(ele, 'mousedown', function (e) {
        e = e || window.event;//兼容ie
        // 获取鼠标按下时的top、left计算样式值
        disX = e.pageX - parseInt(getStyle(ele, 'left'));
        disY = e.pageY - parseInt(getStyle(ele, 'top'));
        //鼠标按下后解锁
        lockS = 1;
        // 绑定事件处理模型（mousemove、mouseup）
        addEvent(document, 'mousemove', function (e) {
            e = e || window.event;
            if (lockS) {// 检测按下后的当前位置移动时
                ele.style.top = e.pageY - disY + 'px';
                ele.style.left = e.pageX - disX + 'px';
            }
        });
        addEvent(document, 'mouseup', function () {
            // 鼠标弹起后加锁
            lockS = 0;
        });
    });
}


/**
 *  异步加载调用函数
 * @param {*} url 文件地址
 * @param {*} callback 需要执行的函数
 * 使用：
 * loadScript(url,function(){
 *      函数执行
 * })
 */
function loadScript(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
        script.onreadystatechange = function () {
            if (script.readyState == "complete" || script.readyState == "loaded") {
                callback();
            }
        }
    } else {
        script.onload = function () {
            callback();
        }
    }
    script.src = url;
    document.head.appendChild(script);
}