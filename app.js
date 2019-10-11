import $mqtt from 'utils/xMqtt/xMqttLib';

App({
    data: {
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: '',
        client: null
    },
    doConnect: function () {
        let options = {
            protocolVersion: 4, //MQTT连接协议版本
            clientId: 'miniTest',
            clean: true,
            password: 'xuhong123',
            username: 'admin',
            reconnectPeriod: 1000, //1000毫秒，两次重新连接之间的间隔
            connectTimeout: 30 * 1000, //1000毫秒，两次重新连接之间的间隔
            resubscribe: true //如果连接断开并重新连接，则会再次自动订阅已订阅的主题（默认true）
        };
        $mqtt.initXMqttAndConnect("wxs://www.xuhonys.cn/mqtt", options)


    },
    onLaunch: function () {
        //延迟链接，以防后面的收不到链接成功回调
        var that = this
        setTimeout(function () {
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
        clientId: function () {
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