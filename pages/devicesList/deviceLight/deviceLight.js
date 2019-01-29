Page({

  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    client: null,
    isOpen: false,
    lightValue: 0,
    valueSlier: 0,
    valuePic: '../../../resoures/png/devices/light_on.jpg',
  },

  onLoad: function(options) {

  },
  eventSlider: function (e) {
    console.log("发生 change 事件，携带值为:" + e.detail.value);
    this.setData({
      lightValue: e.detail.value
    })
    var obj = new Object();
    obj.change = "pwm";
    obj.value = e.detail.value;
   // this.publish(app.globalData.pubTopic, JSON.stringify(obj), 1, false)
  },
  onSwitch: function (e) {
    console.log("onSwitch success :" + e.detail.value);
    var jsonObj = new Object();
    jsonObj.change = "power";
    jsonObj.value = "" + e.detail.value + "";
    //this.publish(app.globalData.pubTopic, JSON.stringify(jsonObj), 1, false)
  },
  syncUI: function() {
    var msg;
    var jsonObj = JSON.parse(msg.payloadString);

    if (typeof jsonObj.power == "boolean")
      console.log("解析 power :" + jsonObj.power);

    if (typeof jsonObj.brightNess == "number")
      console.log("解析 brightNess ：" + jsonObj.brightNess);

    var temp;
    if (jsonObj.power == true) {
      temp = '../pic/light_on.jpg';
    } else
      temp = '../pic/light_off.jpg';

    that.setData({
      valueSlier: jsonObj.brightNess,
      lightValue: jsonObj.brightNess,
      isOpen: jsonObj.power,
      valuePic: temp,
    })
  }
})