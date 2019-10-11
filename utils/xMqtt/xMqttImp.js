function initWXMqtt(host, options) {

    var $mqttLib = require('mqtt.min.js');
    var xMqtt = require('xMqttLib.js');
    let client = null;

    //开始连接
    client = $mqttLib.connect(host, options);
    client.on('connect', function (connack) {
        xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_CONNECTED, connack)
    });

    //服务器下发消息的回调
    client.on("message", function (topic, payload) {
        xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_GET_MSG, {topic, payload})
    });

    //服务器连接异常的回调
    client.on("error", function (error) {
        xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_DIS_CONNECTED, error)
    });

    //服务器重连连接异常的回调
    client.on("reconnect", function (error) {
        xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_RE_CONNECTED, error)
    });

    //服务器连接异常的回调
    client.on("offline", function (error) {
        xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_ERROR_CONNECTED, error)
    });


    xMqtt.listenSubscribeMqttTopic(true, function (topic, Qos) {
        if (client || client.connected)
            client.subscribe(topic, {qos: Qos}, function (err, granted) {
                if (!err) {
                    xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_SUB_OK, granted)
                } else xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_SUB_FAIL, granted)
            })
        else xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_SUB_FAIL, "nerver connected server")
    });

    xMqtt.listenUnSubscribeMqttTopic(true, function (options) {
        if (client || client.connected) {
            client.unsubscribe(options);
            xMqtt.notifyAllxMqttEvent(xMqtt.XMQTT_TYPE.TYPE_UN_SUB_OK)
        } else xMqtt.notifyAllxMqttEvent(xMqtt.TYPE_UN_SUB_FAIL, "nerver connected server"
        )
    });
}

module.exports = {
    initWXMqtt: initWXMqtt,
};