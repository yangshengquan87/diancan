//app.js
import {URL} from './utils/urlModel.js';

/**
 * 用户所用到的
 */
var scope = {
  userInfo:false,
  userLocation:false,
  address: false,
  writePhotosAlbum:false,
  camera:false
}
App({
  onLaunch: function () {   //onLaunch：生命周期回调——监听小程序初始化。
    var _this = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log('手机信息', res);
        _this.globalData.systemInfo = res;
        var systemInfo = res;
        var windowHeight = (systemInfo.windowHeight * (750 / systemInfo.windowWidth)); //将高度乘以换算后的该设备的rpx与px的
        _this.globalData.windowHeight = windowHeight;
      }
    });
  },
  bezier: function (pots, amount) {   //bezier:贝塞尔曲线
    var pot;
    var lines;
    var ret = [];
    var points;
    for (var i = 0; i <= amount; i++) {
      points = pots.slice(0);
      lines = [];
      while (pot = points.shift()) {
        if (points.length) {
          lines.push(pointLine([pot, points[0]], i / amount));
        } else if (lines.length > 1) {
          points = lines;
          lines = [];
        } else {
          break;
        }
      }
      ret.push(lines[0]);
    }
    function pointLine(points, rate) {
      var pointA, pointB, pointDistance, xDistance, yDistance, tan, radian, tmpPointDistance;
      var ret = [];
      pointA = points[0];//点击
      pointB = points[1];//中间
      xDistance = pointB.x - pointA.x;
      yDistance = pointB.y - pointA.y;
      pointDistance = Math.pow(Math.pow(xDistance, 2) + Math.pow(yDistance, 2), 1 / 2);
      tan = yDistance / xDistance;
      radian = Math.atan(tan);
      tmpPointDistance = pointDistance * rate;
      ret = {
        x: pointA.x + tmpPointDistance * Math.cos(radian),
        y: pointA.y + tmpPointDistance * Math.sin(radian)
      };
      return ret;
    }
    return {
      'bezier_points': ret
    };
  },

  /**
   * 全局变量数据
   */
  globalData: {
    userInfo: null,   // userInfo微信的
    token:null,      //登录后的token值
    systemInfo:null, //用户当前手机信息
    area:null,         //本程序支持的所有区域的信息详情
    windowHeight:900
  },

  /**
   * 当前选择的城市信息
   */
  citySelect:{
    provriceId: 120000, //省
    cityId: 120100,    //市
    districtId: 120103  //区
  },
  /**
   * 今天第一次打开项目吗？(第一次打开项目)
   */
  oneDayOneLogin:true,
  /**
   *当前选择的店铺ID 
   */
  currentShopId:null,
  near :{
    "id": -1,
    "name": "附近",
    "fullname": "附近",
    "py": "",
    "spy": "",
    "lat": "25.04347",
    "lng": "102.70737",
    "parent": '',
    "base":'',
    "municipality": "2"
  },

  /**
   * 桌号信息
   */
  number:{
    cid:'', //店铺id
    number:''//桌号
  },
  appid:'	wx393d8eed26475dd0'
  // issigned:true//首页判断是否已签到
})