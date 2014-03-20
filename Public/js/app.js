/**
 * Created by zcl on 14-2-18.
 */


var socket = io.connect('http://' + window.ip + ':3000');


socket.on('server', function (data) {
    alert(data.msg);
});

/**************************
 * Application
 **************************/
var App = Ember.Application.create({
    ready: function () {
        socket.emit('conn');
        App.videoData.GetList();
    }
});
App.Router.map(function () {
    this.resource("index", {path: "/"});
    this.resource("picture", {path: "/picture"});
    this.resource("video", {path: "/video"});
    this.resource("music", {path: "/music"});
    this.resource("message", {path: "/message"});
});

/**************************
 * Models
 **************************/
App.videoData = Ember.Object.create({
    videoList: '',
    GetList: function () {
        var my = this;
        if (localStorage.getItem('yk')) {
            my.videoList = eval(localStorage.getItem('yk'));
        } else {
            $.ajax({url: '/video', success: function (data) {
                console.log(data)
                my.videoList = data;
                localStorage.setItem('yk', JSON.stringify(data));

            }});
        }


    }
});
/**************************
 * Views
 **************************/

/**************************
 * Controllers
 **************************/
App.VideoController = Ember.Controller.extend({
    actions: {
        SendVideo: function (link) {
            socket.emit('getVideo', {url: link});
        },
        Back:function(){
            this.transitionTo('index');
        }
    }
});