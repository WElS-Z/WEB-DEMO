var arr = []
var div = document.getElementsByClassName('wraper')[0];
var ul = div.getElementsByTagName('ul')[0];
for (let i = 0; i < 50; ++i) {
    arr.push(random(1, 50))
}
/**
 * 产生随机整数、包含下限-上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
 * 数据交换函数
 * @param {Array} arr 数组
 * @param {Number} origin 需要交换的位置
 * @param {Number} target 等待交换的位置
 */
function swap(arr, origin, target) {
    var temp = arr[origin];
    arr[origin] = arr[target];
    arr[target] = temp;
}

/**
 * 渲染html结构
 * @param {Object} origin 父元素
 * @param {Array} target 数组
 */
function createEle(origin, target) {
    origin.innerHTML = '';
    for (var i = 0; i < target.length; ++i) {
        var oLi = document.createElement('li');
        oLi.style.height = 5 * target[i] + 'px';
        oLi.style.marginLeft = i * 20 + 'px';
        oLi.innerText = target[i];
        origin.appendChild(oLi);
    }
}
createEle(ul, arr);
var li = ul.getElementsByTagName('li');


/**
 * 选择排序
 * @param {Array} origin 需要排序的数组
 */
function selectSort(origin) {
    var len,
        active,
        min,
        max,
        num;
    num = 0;
    min = null;
    max = null;
    len = origin.length;
    // for (var i = 0; i < len + 1; ++i) {
    //     for (var j = 0; j < len; ++j) {
    //         if (origin[i] < origin[j]) {
    //             var active = origin[j];
    //             origin[j] = origin[i];
    //             origin[i] = active;
    //         }
    //     }
    // }
    var timer = null;
    timer = setInterval(() => {
        for (var i = num; i < len; ++i) {
            if (!origin[min] && origin[min] != 0) {
                min = i;
            } else if (origin[min] > origin[i]) {
                min = i;
            }
        }
        createEle(ul, origin);
        swap(origin, num++, min);
        active = ul.getElementsByClassName('active');
        for (var j = 0; j < active.length; j++) {
            active[j].classList.remove('active');
        }
        li[num - 1].classList.add('active');
        li[min].classList.add('active');

        min = null;
        if (num > len - 1) {
            return clearInterval(timer);
        }
    }, 1000)
}
// selectSort(arr);

/**
 *  冒泡排序
 * @param {Array} origin 
 */
function bubblingSort(origin) {
    //循环数组 找到最大的一位将最大的一位
    var len,
        timer,
        index,
        num;
    num = index = 0;
    len = origin.length;
    timer = setInterval(() => {
        if (origin[index] > origin[index + 1]) {
            swap(origin, index, index + 1);
            createEle(ul, origin);
        }
        if (len - 1 == 0) {
            clearInterval(timer);
        }
        if (++index > len - 1) {
            index = 0;
            ++num;
            --len;
        }
    }, 30)
}
// bubblingSort(arr);

/**
 * 插入排序
 * @param {Array} target 需要排序的数组
 */
function insertSort(target) {
    // 记录数组长度
    // 循环数组  if n-1>n
    // 逆向循环数组
    // n-1>n swap(n-1,n)
    var len = target.length;
    for (var i = 1; i < len; ++i) {
        if (target[i] < target[i - 1]) {
            var temp = target[i];
            for (var j = i; j >= 0; --j) {
                // if (target[j - 1] > target[j]) {
                //     swap(target, j - 1, j)
                //     if (target[j - 1] > target[j - 2] && target[j - 1] < target[j]) {
                //         // 循环结束条件
                //         break;
                //     }
                // }

                if (j > 0 && target[j - 1] > temp) {
                    target[j] = target[j - 1];
                } else {
                    target[j] = temp;
                    break;
                }
            }
        }
    }
}

// insertSort(arr);

/**
 * 快速排序
 * @param {Array} target 
 */
function quickSort(target) {
    /**
     * 快速排序 辅助
     * @param {Array} target 数组
     * @param {Number} start 开始下标
     * @param {Number} end 结束下标
     */
    function _quickSort(target, start, end) {
        // 判断传入的数值是否有效
        if (start >= end || start > end) return;
        var key,
            left,
            right;
        // 记录基准值
        key = target[start];
        left = start;
        right = end;
        // 循环函数判断条件为起始下标小于结束下标
        for (; left < right;) {
            // 并且向左循环时下标值大于基准值;
            // 小于则停止循环
            // 交换两个值
            // Array[0 <-- length] 右向左
            for (; left < right && target[right] >= key; --right);
            swap(target, left, right);
            // 从左向右循环
            // Array[0 --> length] 左向右
            for (; left < right && target[left] <= key; ++left);
            swap(target, left, right);
        }
        // 到当前步骤时left与right相同，分区进行排序
        return _quickSort(target, start, left - 1) || _quickSort(target, right + 1, end)
    }
    _quickSort(target, 0, target.length - 1)
}


// var myArr = [6, 7, 4, 3, 1, 2, 9, 8, 5];
console.log(arr);
quickSort(arr);


console.log(arr);

