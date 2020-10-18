var fs = require('fs');
var User = require('../models/User');
var File = require('../models/File');

exports.upload = function (req, res) {
	res.render('upload', {
		title: 'Upload'
	});
};

exports.postUpload = function (req, res) {
	console.log(req.file);

	fs.rename(req.file.path, './uploads/' + req.file.originalname, function (err) {
		if (err) {
			return console.log(err)
		}


		req.session.filename = req.file.originalname;
		req.session.stlfile = './uploads/' + req.file.originalname;

		var uploadedFile = new File({
			fileName: req.file.originalname,
			s3Url: './uploads/' + req.file.originalname
		});

		if (req.user) {
			User.findById(req.user.id, function (err, user) {
				if (err) {
					return console.log(err);
				}

				user.accountHistory.uploadedFiles.push(uploadedFile);
				user.save(function (err) {
					return console.log(err);
				});
			});
        }

		res.redirect('/viewer');
	});

}

/**
 * GET /
 * Home page.
 */
 exports.index = function(req, res) {
 	res.render('home', {
 		title: 'Home'
 	});
 };
