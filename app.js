//app.js

var onfire = require("utils/onfire.js");
var util = require('utils/mqtt/util.js')
var Promise = require('utils/es6-promise.js')
var {
  Client,
  Message
} = require('utils/mqtt/paho-mqtt.js')

App({
  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    client: null
  },
  subscribe: function(filter, subscribeOptions) {
    // 订阅
    var client = data.client;
    if (client && client.isConnected()) {
      console.log('订阅成功');
      return client.subscribe(filter, subscribeOptions);
    }
    console.log('订阅失败');
  },
  publish: function(topic, message, qos = 0, retained = false) {
    // 发布
    var client = this.data.client;
    if (client && client.isConnected()) {
      var message = new Message(message);
      message.destinationName = topic;
      message.qos = qos;
      message.retained = retained;
      console.log('发送ok');
      return client.send(message);
    }
    console.log('发送fail');
  },
  setOnMessageArrived: function(onMessageArrived) {
    if (typeof onMessageArrived === 'function') {
      this.data.onMessageArrived = onMessageArrived
    }
  },
  setOnConnectionLost: function(onConnectionLost) {
    if (typeof onConnectionLost === 'function') {
      this.data.onConnectionLost = onConnectionLost
    }
  },
  doSubscribe: function(topic, qos) {
    this.subscribe(app.globalData.subTopic, {
      qos: 1
    })
  },
  doPublish: function(topic, payload) {
    this.publish(app.globalData.pubTopic, 'Hello World', 1, false)
  },

  doConnect: function() {
    var that = this;
    if (that.data.client && that.data.client.isConnected()) {
      console.log('不要重复连接');
      return
    }
    var client = new Client(this.globalData.server_domain, this.globalData.clientId());
    client.connect({
      userName: this.globalData.userName,
      password: this.globalData.password,
      useSSL: true,
      cleanSession: true,
      keepAliveInterval: this.globalData.keepAliveInterval,
      onFailure: function(errorCode) {
        onfire.fire(that.mqttEventCode.CodeAllEvent, that.mqttEventCode.CodeFailureConnect, "CodeFailureConnect", "errorCode:" + errorCode.errorCode + ",code:" + errorCode.errorMessage)
        //console.log("connect failed code:" + errorCode.errorCode)
        //console.log("connect failed message:" + errorCode.errorMessage)
      },
      onSuccess: function() {
        //console.log("connect success..")
        onfire.fire(that.mqttEventCode.CodeAllEvent, that.mqttEventCode.CodeSuccessConnect, "CodeSuccessConnect", null)
        that.data.client = client
        client.onMessageArrived = function(msg) {

          if (typeof that.data.onMessageArrived === 'function') {
            return that.data.onMessageArrived(msg)
          }
          console.log("onMessageArrived topic:" + msg.destinationName)
          console.log("onMessageArrived payload:" + msg.payloadString)
        }
        client.onConnectionLost = function(responseObject) {
          if (typeof that.data.onConnectionLost === 'function') {
            return that.data.onConnectionLost(responseObject)
          }
          if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
          }
        }
      }
    });
  },
  onLaunch: function() {
    //延迟链接，以防后面的收不到链接成功回调
    var that = this
    setTimeout(function() {
      that.doConnect();
    }, 1100)
  },
  globalData: {
    //连接的域名：注意格式，不要带端口号
    server_domain: "wss://www.xuhonys.cn/mqtt",
    //心跳
    keepAliveInterval: 60,
    //本工程的链接服务器的名字和密码
    userName: "admin",
    password: "xuhong123",
    //请保持唯一，一旦多个客户端用相同的clientID连接服务器就会挤掉之前的链接，后者先得。
    clientId: function() {
      var len = 20; //长度
      var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
      var maxPos = $chars.length;
      var pwd = 'WECHAT—';
      for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
      }
      return pwd;
    }, //或者你用时间戳也可以的。参考上面的随机数获取方法即可！

  },
  mqttEventCode: {
    CodeAllEvent: '-1',
    CodeSuccessConnect: '0',
    CodeFailureConnect: '1',
    CodeSubscribe: '2',
    CodePushMsg: '3',
    CodeLostConnect: '4',
  }

})