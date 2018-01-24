let utils = {};

/*************************************
 * 字符串操作
 ************************************/

// 随机值
utils.randomNum = (count = 36) => Math.random().toString(count).substring(2);

// 随机颜色
utils.randomColor = () => '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);

// 重复字符串
utils.repeatString = (str, n) => new Array(n + 1).join(str); 

/*************************************
 * 时间操作
 ************************************/

// 获取时间戳
utils.timestamp = () => (new Date()).valueOf();

/*************************************
 * 数组操作
 ************************************/

// 去重
utils.unique = arr => [...new Set(arr)];

// 打乱数组顺序
utils.upset = arr => arr.sort(() => Math.random() - 0.5);

// 数组中的最大数
utils.arrMaxItem = arr => Math.max.apply(null, arr);

// 数组中的最小数
utils.arrMinItem = arr => Math.min.apply(null, arr);

// 求和 元素得都值
utils.arrSum = arr => arr.reduce((sum, val) => sum + val, 0);

/*************************************
 * DOM操作
 ************************************/

// 获取元素样式的属性值
utils.getStyle = (obj, attr) => obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, null)[attr];

/*************************************
 * 其他操作
 ************************************/

/**
 * 生成随机数
 * @param {*} floor 下限
 * @param {*} upper 上限
 */
utils.random = (floor = 1, upper = 0) => {

  if (upper === 0) {
    return Math.random() * floor;
  }

  if (upper < floor) [floor, upper] = [upper, floor];

  return Math.random() * (upper - floor) + (floor + 1);
}

/**
 * 复制
 * @param {*} ele       元素
 * @param {*} isSelect  是否选中
 */
utils.copy = (ele, isSelect) => {
  const rng = window.getSelection();
  rng.removeAllRanges();
  const sRng = document.createRange();
  sRng.selectNodeContents(ele);
  rng.addRange(sRng);
  document.execCommand('copy');
  if(!isSelect) rng.removeAllRanges();
}

// 获取当前页面的协议
utils.protocol = () => window.location.protocol;

// 获取当前页面端口
utils.port = () => window.location.port;

// 输出信息
utils.info = () => {
  console.log('JavaScript Utils V1.0.0');
}

export default utils;
