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


  // 节点信息

  // 获取节点列表
  'GET_NODE_INFO_LIST': cu('/NodeInfo/GetNodeInfoList'),
  // 添加节点
  'AU_NODE': cu('/NodeInfo/AUNode'),

  
  // 主机信息

  // 主机列表
  'GET_VPS_LIST': cu('/VPSInfo/GetVpsList'),
  // 根据id查主机
  'GET_VPS_BY_ID': cu('/VPSInfo/GetVpsById'),


  // 版本

  // 获取版本列表
  'GET_VERSION_LIST': cu('/VersionInfo/GetVersionList'),


  // IP价格

  // 获取价格列表
  'GET_IP_PRICE_LIST': cu('/IpPrice/GetIpPriceList'),
  // 修改、添加价格表
  'AU_IP_PRICE': cu('/IpPrice/AUIpPrice'),
  // 删除价格表
  'DELETE_IP_PRICE': cu('/IpPrice/DeleteIpPrice'),


  // 用户相关

  // 退出
  'LOGIN_OUT': cu('/LoginOut'),


  // 模块相关

  // 添加 修改模块
  'AU_MODULE': cu('/Code/AUModule'),
  // 获取模块列表
  'GET_MODULE': cu('/Code/GetModule'),
  // 删除模块 客户端
  'DELETE_CODE': cu('/Code/DeleteCode'),
  // 获取模块对应的客户端
  'GET_CLIENT': cu('/Code/GetClient'),
}

export default API;
