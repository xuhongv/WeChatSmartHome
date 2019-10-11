var mOnFire = require("onfire.js");
var $wxMqttImp = require('xMqttImp.js');


// 0表示阿里小程序 1表示微信小程序
let XMQTT_SYSTEM = {
    AlisMqtt: 0,
    WXMqtt: 1,
};

let XMQTT_TYPE = {
    TYPE_CONNECTED: 0,
    TYPE_DIS_CONNECTED: 1,
    TYPE_GET_MSG: 2,
    TYPE_RE_CONNECTED: 3,
    TYPE_SUB_OK: 4, //订阅成功
    TYPE_SUB_FAIL: 5, //订阅失败
    TYPE_UN_SUB_OK: 6, //取消订阅ok
    TYPE_UN_SUB_FAIL: 7, //取消订阅失败
};

var EVENT_ALL_EVENT = 'EVENT_ALL_EVENT';//状态事件
var EVENT_NOFITY_CONNECT = 'EVENT_NOFITY_CONNECT'; //连接事件通知
var EVENT_NOFITY_PUB = 'EVENT_NOFITY_PUB'; //发布消息
var EVENT_NOFITY_SUB = 'EVENT_NOFITY_SUB'; //订阅消息
var EVENT_NOFITY_UN_SUB = 'EVENT_NOFITY_UN_SUB'; //取消订阅消息


function initXMqttAndConnect(host, options) {
    $wxMqttImp.initWXMqtt(host, options);
}

/****************************** 发布 ***************************************/

/**
 * 连接或断开 mqtt
 *
 * @param isConnected 是否连接
 * @param options 连接参数
 */
function notifyDisConnectMqttEvent(options) {
    mOnFire.fire(EVENT_NOFITY_CONNECT, options);
}

/**
 * 发布消息
 * @param options 参数
 */
function notifyPublishMqttMsg(options) {
    mOnFire.fire(EVENT_NOFITY_PUB, options);
}


/**
 * 订阅主题
 * @param options 参数
 */
function notifySubscribeMqttTopic(topic, qos) {
    mOnFire.fire(EVENT_NOFITY_SUB, topic, qos);
}

/**
 * 取消订阅主题
 * @param options 参数
 */
function notifyUnSubscribeMqttTopic(options) {
    mOnFire.fire(EVENT_NOFITY_UN_SUB, options);
}

/**
 * 监听mqtt事件
 */
function notifyAllxMqttEvent(type, data) {
    mOnFire.fire(EVENT_ALL_EVENT, type, data);
}


/****************************** 订阅 ***************************************/

/**
 * 连接或断开 mqtt
 */
function listenDisConnectMqttEvent(isSetListener, funtion) {
    if (isSetListener) {
        mOnFire.on(EVENT_NOFITY_CONNECT, funtion)
    } else {
        mOnFire.un(funtion)
    }
}

/**
 * 发布消息
 * @param options 参数
 */
function listenPublishMqttMsg(isSetListener, funtion) {
    if (isSetListener) {
        mOnFire.on(EVENT_NOFITY_PUB, funtion)
    } else {
        mOnFire.un(funtion)
    }
}

/**
 * 订阅主题
 * @param options 参数
 */
function listenSubscribeMqttTopic(isSetListener, funtion) {
    if (isSetListener) {
        mOnFire.on(EVENT_NOFITY_SUB, funtion)
    } else {
        mOnFire.un(funtion)
    }
}

/**
 * 取消订阅主题
 * @param options 参数
 */
function listenUnSubscribeMqttTopic(isSetListener, funtion) {
    if (isSetListener) {
        mOnFire.on(EVENT_NOFITY_UN_SUB, funtion)
    } else {
        mOnFire.un(funtion)
    }
}

/**
 * 监听mqtt事件
 */
function listenAllxMqttEvent(isSetListener, funtion) {
    if (isSetListener) {
        mOnFire.on(EVENT_ALL_EVENT, funtion)
    } else {
        mOnFire.un(funtion)
    }
}


/****************************** 对外  ***************************************/

module.exports = {
    XMQTT_TYPE: XMQTT_TYPE,


    notifyDisConnectMqttEvent: notifyDisConnectMqttEvent,
    listenDisConnectMqttEvent: listenDisConnectMqttEvent,

    notifyAllxMqttEvent: notifyAllxMqttEvent,
    listenAllxMqttEvent: listenAllxMqttEvent,

    notifyPublishMqttMsg: notifyPublishMqttMsg,
    listenPublishMqttMsg: listenPublishMqttMsg,

    notifySubscribeMqttTopic: notifySubscribeMqttTopic,
    listenSubscribeMqttTopic: listenSubscribeMqttTopic,

    notifyUnSubscribeMqttTopic: notifyUnSubscribeMqttTopic,
    listenUnSubscribeMqttTopic: listenUnSubscribeMqttTopic,


    initXMqttAndConnect: initXMqttAndConnect,

};