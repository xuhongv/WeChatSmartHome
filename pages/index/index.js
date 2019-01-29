
//获取应用实例
const app = getApp()
var util = require('../../utils/mqtt/util.js')
var {
  Client,
  Message
} = require('../../utils/mqtt/paho-mqtt.js')
var onfire = require("../../utils/onfire.js");
var that;
var eventObj;
//模拟数据获取，小伙伴项目可以去自己的服务器请求数据。
var postData = require('../post-data.js');

Page({
  data: {
   
  },
  onLoad: function() {

    wx.showLoading({
      title: '加载中...' ,
    })
    this.setData({
      cloudsDevices: postData.listData
    })
  
    eventObj = onfire.on(app.mqttEventCode.CodeAllEvent, function(typeEvent, topic, msg) {
      switch (typeEvent) {
        //connect success
        case app.mqttEventCode.CodeSuccessConnect:
          console.log("connect success");
          wx.hideLoading()
          break;
        //connect fail
        case app.mqttEventCode.CodeFailureConnect:
          console.log("connect fail -->  " + topic + ",msg:" + msg);
          wx.hideLoading()
          wx.showToast({
            title: '抱歉，连接异常。' + msg,
            icon: 'none',
            duration: 3000
          })
          break;
      }
      // 当消息被传递时，做具体的事
      ///console.log("recieve topic :" + topic + ",msg:" + msg);
    });


  },
  onUnload: function() {
    onfire.un(app.mqttEventCode.CodeAllEvent);
    onfire.un(eventObj); //移除
  },
  jumpDevice: function(e) {

  }
})