import axios from 'axios';

let utils = {};

utils.setScpoe = scpoe => {
  this.scpoe = scpoe;
  if (document.getElementById('leftContainer') !== null) {
    setTimeout(function () {
      document.getElementById('leftContainer').style.height = document.documentElement.clientHeight - 70 + 'px';
      document.getElementById('rightContainer').style.height = document.documentElement.clientHeight - 70 + 'px';
    }, 80);
  }
}

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

  if (upper < floor)[floor, upper] = [upper, floor];

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
  if (!isSelect) rng.removeAllRanges();
}

// 获取当前页面的协议
utils.protocol = () => window.location.protocol;

// 获取当前页面端口
utils.port = () => window.location.port;

// 输出信息
utils.info = () => {
  console.log('JavaScript Utils V1.0.0');
}

// 封装axios的get
utils.get = (url, params = {}, isReturnAxiosData = false) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params
    }).then(res => {
      if (isReturnAxiosData) {
        resolve(res);
        return;
      }
      resolve(res.data);
    }).catch(e => {
      reject(e);
    });
  });
};

// 封装axios的post 并默认把数据以表单形式提交
utils.post = (url, params = {}, isReturnAxiosData = false) => {
  let updateParams = new URLSearchParams();
  for (let i in params) {
    if (params.hasOwnProperty(i)) {
      updateParams.append(i, params[i]);
    }
  }

  return new Promise((resolve, reject) => {
    axios.post(url, updateParams).then(res => {
      if (isReturnAxiosData) {
        resolve(res);
        return;
      }
      resolve(res.data);
    }).catch(e => {
      reject(e);
    });
  });
}

utils.error = (message = '', title = '错误') => {
  this.scpoe.$notify.error({
    title,
    message
  });
}

utils.errormsg = () => {
  this.scpoe.$notify.error({
    title: '错误',
    message: '发生错误(如: 无网络)'
  });
}

utils.success = (message = '', title = '成功') => {
  this.scpoe.$notify({
    title,
    message,
    type: "success"
  });
}

utils.info = (message = '', title = '通知') => {
  this.scpoe.$notify.info({
    title,
    message
  });
}

utils.msg = (message = '') => {
  this.scpoe.$message({
    message,
    type: 'success'
  });
}

utils.msgInfo = (message = '') => {
  this.scpoe.$message(message);
}

utils.msgErr = (message = '') => {
  this.scpoe.$message.error(message);
}

utils.verify = (type, str) => {
  switch (type) {
    case 'url':
      return /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/.test(str);
      break;
    default:
      break;
  }
}

// 获取当前时间 (YYYY-MM-DD HH:mm:ss)
utils.getCurTime = () => {
  let date = new Date();
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')} ${(date.getHours()).toString().padStart(2, '0')}:${(date.getMinutes()).toString().padStart(2, '0')}:${(date.getSeconds()).toString().padStart(2, '0')}`;
}

// 时间比较 (YYYY-MM-DD HH:mm:ss)
utils.compareTime = (startTime,endTime) => {
  let startTimes = startTime.substring(0, 10).split('-');
  let endTimes = endTime.substring(0, 10).split('-');
  startTime = startTimes[1] + '-' + startTimes[2] + '-' + startTimes[0] + ' ' + startTime.substring(10, 19);
  endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
  let thisResult = (Date.parse(endTime) - Date.parse(startTime)) / 3600 / 1000;
  if (thisResult > 0) return false;
  return true;
}

// 往localStorage添加数据
utils.setLocalData = (key, val) => {
  val = val || {};

  localStorage.setItem(key, JSON.stringify(val));
}

// 从loaclStorage取数据
utils.getLocalData = key => JSON.parse(localStorage.getItem(key));

// 往sesstionStorage添加数据
utils.setLocalSession = (key, val) => {
  val = val || {};

  sessionStorage.setItem(key, JSON.stringify(val));
}

// 从sessionStorage取数据
utils.getLocalSession = key => JSON.parse(sessionStorage.getItem(key));


export default utils;
