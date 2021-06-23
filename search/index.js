var arr = [1, 2, 4, 5, 6, 7, 8, 9, 10];

/**
 * 顺序查找（无序数列）
 * @param {Arrar} origin 需要查询的数组
 * @param {*} target 需要查询的值
 * @returns {Number} 返回值为下标，-1则未找到
 */
function orderSearch(origin, target) {
    for (var i = 0; i < origin.length; ++i)
        if (origin[i] === target) {
            return i;
        }
    return -1;
}

/**
 * 二分查找（有序数列）
 * @param {Array} origin 需要查询的数组
 * @param {*} target 需要查询的值
 * @returns {Number} 返回值为下标，-1则未找到
 */
function BinarySearch(origin, target) {
    if (arr.length === 0 || arr[0] > target || arr[length - 1] < target) return;
    var min = 0;
    var max = origin.length - 1;
    var mid;
    while (min <= max) {
        mid = Math.round((min + max) / 2);
        if (origin[mid] === target) {
            return mid;
        } else {
            if (origin[mid] > target) {
                max = mid - 1;
            } else if (origin[mid] < target) {
                min = mid + 1;
            }
        }
    }
    return -1;
}

/**
 * 插值查找（有序并相同步长数列）
 * @param {Array} origin 需要查询的数组
 * @param {*} target 需要查询的值
 * @returns {Number} 返回值为下标，-1则未找到
 */
function interpolationSearch(origin, target) {
    if (arr.length === 0 || arr[0] > target || arr[length - 1] < target) return;
    var min = 0;
    var max = origin.length - 1;
    var mid;
    while (min <= max) {
        // 目标下标 = （目标值-最小值）/（最大值-最小值）*（最大下标-最小下标）+最小下标；
        mid = (target - origin[min]) / (origin[max] - origin[min]) * (max - min) + min;
        if (origin[mid] === target) {
            return mid;
        } else {
            if (origin[mid] > target) {
                max = mid - 1;
            } else if (origin[mid] < target) {
                min = mid + 1;
            }
        }
    }
    return -1;
}