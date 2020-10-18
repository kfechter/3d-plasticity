var fs = require('fs');

exports.upload = function (req, res) {
    res.render('upload', {
        title: 'Upload'
    });
};