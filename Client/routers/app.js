/**
 * Created by zcl on 14-2-18.
 */
var tool=require('./../tools/tool');

var index=function(req,res){
    tool.localIp(function(data){
        console.log(data);

        res.render('index.html',{ip:data});
    })

}
var image=function(req,res){

}
var upload= function (req, res) {
    console.log(req.files.img);
    var tmp_path = req.files.img.path;
    var target_path = './uploads/show.jpg';
    tool.upload(tmp_path, target_path, function (data) {
    });
}

var video=function(req,res){
    tool.videoHtml(function(arr){
        res.send(arr);
        res.end();
    });

}

exports.index=index;
exports.image=image;
exports.upload=upload;
exports.video=video;