const DEV_IP = 'http://47.93.242.107:8111';
const PRO_IP = 'http://47.93.242.107:8111';

const cu = path => process.env.NODE_ENV === 'development' ? DEV_IP + path : PRO_IP + path;

const API = {
  // 订单

  // 订单列表
  'GET_ORDER_LIST': cu('/Order/GetOrderList'),
  // 删除订单
  'DELETE_ORDER': cu('/Order/DeleteOrder'),  


  // 采集规则

  // 添加 修改采集规则
  'AU_TASK_RULE': cu('/TaskRule/AUTaskRule'),
  // 删除采集规则
  'DELETE_TASK_RULE': cu('/TaskRule/DeleteTaskRule'),
  // 采集规则列表
  'GET_TASK_RULE_LIST': cu('/TaskRule/GetTaskRuleList'),


  // 校验规则

  // 添加 修改校验规则
  'AU_CHECK_RULE': cu('/CheckRule/AUCheckRule'),
  // 删除校验规则
  'DELETE_CHECK_RULE': cu('/CheckRule/DeleteCheckRule'),
  // 获取校验规则列表
  'GET_CHECK_RULE_LIST': cu('/CheckRule/GetCheckRuleList'),
}

export default API;
