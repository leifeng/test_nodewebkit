/**
 * Created by zcl on 14-2-14.
 */
var os = require('os')
    , fs = require('fs')
    , $ = require('jquery')
    , iconv = require('iconv-lite')
    , http = require('http')
    , async = require('async');

var localIp = function (cb) {
    var ifaces = os.networkInterfaces();
    for (var dev in ifaces) {
        if (dev.indexOf("vip") == -1 && dev.indexOf("Loop") == -1) {
            if (ifaces[dev][0].family == "IPv4")
                cb(ifaces[dev][0].address)
        }
    }
}

var upload = function (tmp_path, target_path, cb) {
    fs.rename(tmp_path, target_path, function (err) {
        if (err) {
            console.log(err);
        } else {
            cb("ok");
        }
    });
}

var yuKuList = function (cb) {
    http.get('http://www.youku.com/v/', function (res) {
        var html = '';
        res.setEncoding('binary');
        res.on('data',function (data) {
            html += data;
        }).on('end', function () {
                var buf = new Buffer(html, 'binary');
                var str = iconv.decode(buf, 'utf-8');
                var dom = $(str).find('#getVideoList').html();
                var arr = new Array();
                $(dom).find('.yk-col4').each(function (i, div) {
                    var link = $(div).find('.v-link').find('a').attr('href')
                    arr.push(link);
                });
                cb(arr);
            });
    });
}
var videoHtml = function (cb) {
    yuKuList(function (arr) {
        var arr1 = new Array();
        async.forEach(arr, function (item, callback) {
            http.get(item, function (res) {
                var html = '';
                res.on('data',function (data) {
                    html += data;
                }).on('end', function () {
                        var link = $(html).find('#link2').val();
                        var title = $(html).find('h1.title').text();
                        arr1.push({"title": title, "link": link});
                        callback();
                    });
            });
        }, function (err) {
            console.log(arr1);
            cb(arr1);
        });
    });
}

exports.localIp = localIp;
exports.upload = upload;
exports.videoHtml = videoHtml;


