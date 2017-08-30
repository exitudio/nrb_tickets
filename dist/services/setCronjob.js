'use strict';

var router = require('express').Router();
var cron = require('node-cron');
var sendEmailLib = require('../libs/sendEmail');
var path = require('path');
var fs = require('fs');
var appDirectory = fs.realpathSync(process.cwd());
var resolveApp = function resolveApp(relativePath) {
    return path.resolve(appDirectory, relativePath);
};
var pdfPath = resolveApp('src/data/report.pdf');

router.post('/setcronjob', function (req, res) {
    console.log(req.body);
    var config = {};
    config.month = req.body.month;
    config.day = req.body.day;
    config.hour = req.body.hour;
    config.minute = req.body.minute;

    //if user didn't set lower parameter, set them to the lowest value
    var stack = ['month', 'day', 'hour', 'minute'];
    for (var i = 0; i < stack.length; i++) {
        if (config[stack[i]] !== '*') {
            console.log('* i = ', i);
            for (var j = i + 1; j < stack.length; j++) {
                console.log('* j = ', j, config[stack[j]]);
                if (config[stack[j]] === '*') {
                    if (j === 1) {
                        config[stack[j]] = 1;
                    } else {
                        config[stack[j]] = 0;
                    }
                }
                console.log('    stack[j]:', config[stack[j]]);
            }
        }
    }

    console.log('cron...', config.minute + ' ' + config.hour + ' ' + config.day + ' ' + config.month + ' *');
    cron.schedule(config.minute + ' ' + config.hour + ' ' + config.day + ' ' + config.month + ' *', function () {
        var mailOptions = {
            from: 'NRB Tickets System', // sender address
            to: req.body.email,
            subject: "Subscribe NRB ", // Subject line
            text: 'Report from your subscription: ',
            attachments: [{
                filename: 'report.pdf',
                path: pdfPath,
                contentType: 'application/pdf'
            }]
            //html: '<b>Hello world ?</b>' // html body
        };
        sendEmailLib.send(mailOptions, function () {
            console.log('sent email completed');
        }, function () {
            console.log('sent email fail');
        });
        console.log('cron called...', config.minute + ' ' + config.hour + ' ' + config.day + ' ' + config.month + ' *');
    });
    return res.status(200).json({
        status: 'complete!!!'
    });
});
module.exports = router;