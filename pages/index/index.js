//获取应用实例
const app = getApp()

var that;
var eventObj;
//模拟数据获取，小伙伴项目可以去自己的服务器请求数据。
var postData = require('../post-data.js');
import $mqtt from '../../utils/xMqtt/xMqttLib';


Page({
    data: {
        localDatas: postData
    },
    listenAllxMqttEvent(type, data) {
        console.log("listenAllxMqttEvent type:", type);
        console.log("listenAllxMqttEvent data:", data);
        switch (type) {
            //订阅
            case $mqtt.XMQTT_TYPE.TYPE_CONNECTED:
                wx.hideLoading();
                $mqtt.notifySubscribeMqttTopic('topic', 1);
                $mqtt.notifySubscribeMqttTopic('topic2', 0);
                break;
            //取消订阅
            case $mqtt.XMQTT_TYPE.TYPE_SUB_OK:
                $mqtt.notifyUnSubscribeMqttTopic('topic');
                break;
            case $mqtt.XMQTT_TYPE.TYPE_DIS_CONNECTED:
                wx.hideLoading()
                wx.showToast({
                    title: '抱歉，连接异常。' + msg,
                    icon: 'none',
                    duration: 3000
                });
                break;
        }
    },
    onLoad: function () {
        wx.showLoading({
            title: '加载中...',
        })
        this.setData({
            cloudsDevices: this.data.localDatas.listData
        })
        $mqtt.listenAllxMqttEvent(true, this.listenAllxMqttEvent)
    },
    onUnload: function () {
        $mqtt.listenAllxMqttEvent(false, this.listenAllxMqttEvent)
    }
    ,
    jumpDeviceControl: function (e) {

        var device = this.data.cloudsDevices[e.currentTarget.dataset.index];
        // console.log("jumpDeviceControl name:" + device.name);
        // console.log("jumpDeviceControl uuid:" + device.uuid);
        switch (device.type) {
            case 'light':
                wx.navigateTo({
                    url: "../devicesList/deviceLight/deviceLight?uuid=" + device.uuid
                })
                break;
            case 'socket':
                break;
            default:
                break;
        }
    }
})