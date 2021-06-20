var arr = []
var div = document.getElementsByClassName('wraper')[0];
var ul = div.getElementsByTagName('ul')[0];
for (let i = 0; i < 50; ++i) {
    arr.push(random(1, 50))
}
/**
 * 产生随机整数，包含下限值，包括上限值
 * @param {Number} lower 下限
 * @param {Number} upper 上限
 * @return {Number} 返回在下限到上限之间的一个随机整数
 */
function random(lower, upper) {
    return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/**
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
 * @param {array} target 数组
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
 * @param {array} origin 需要排序的数组
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
 * @param {array} origin 
 */
function bubblingSort(origin) {
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
 * @param {array} target 需要排序的数组
 */
function insertSort(target) {
    // 记录数组长度
    // 循环数组  if n-1>n
    // 逆向循环数组
    // n-1>n swap(n-1,n)
    var len = target.length;
    for (var i = 1; i < len; ++i) {
        if (target[i] < target[i - 1]) {
            for (var j = i; j >= 0; --j) {
                if (target[j - 1] > target[j]) {
                    swap(target, j - 1, j)
                    if (target[j - 1] > target[j - 2] && target[j - 1] < target[j]) {
                        // 循环结束条件
                        break;
                    }
                }
            }
        }
    }
}

insertSort(arr);


