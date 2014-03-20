/**
 * Created by zcl on 14-2-15.
 */
var appjs = require('./app');


module.exports = function (app) {
    app.get('/', appjs.index);
    app.get('/index', appjs.index);
    app.post('/upload', appjs.upload);
    app.get('/video', appjs.video);

}