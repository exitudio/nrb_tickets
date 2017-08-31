const router = require('express').Router()
const cron = require('node-cron')
const sendEmailLib = require('../libs/sendEmail')
const path = require('path')
const fs = require('fs')
const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)
const pdfPath = resolveApp('src/data/report.pdf')

router.post('/setcronjob', function (req, res) {
    console.log(req.body)
    let config = {}
    config.month = req.body.month
    config.day = req.body.day
    config.hour = req.body.hour
    config.minute = req.body.minute
    config.email = req.body.email

    //if user didn't set lower parameter, set them to the lowest value
    const stack = ['month', 'day', 'hour', 'minute']
    for(let i=0; i<stack.length; i++){
        if( config[stack[i]]!=='*' ){
            console.log('* i = ',i)
            for(let j=i+1; j<stack.length; j++){
                console.log('* j = ',j, config[stack[j]])
                if( config[stack[j]] ==='*'){
                    if(j===1){
                        config[stack[j]] = 1
                    }else{
                        config[stack[j]] = 0
                    }
                }
                console.log('    stack[j]:',config[stack[j]])
            }
        }
    }
    
    console.log('cron...', `${config.minute} ${config.hour} ${config.day} ${config.month} *`)
    cron.schedule(`${config.minute} ${config.hour} ${config.day} ${config.month} *`, function () {
        callSendEmail(config)
    })
    return res.status(200).json(
        {
            status: 'complete!!!'
        })



})

function callSendEmail(config){
    console.log('___ call send email :',config)
    var mailOptions = {
        from: 'NRB Tickets System', // sender address
        to: config.email,
        subject: "Subscribe NRB ",// Subject line
        text: 'Report from your subscription: ',
        attachments: [{
            filename: 'report.pdf',
            path: pdfPath,
            contentType: 'application/pdf'
        }]
        //html: '<b>Hello world ?</b>' // html body
    }
    sendEmailLib.send(mailOptions,
        function () {
            console.log('sent email completed')
        }, function () {
            console.log('sent email fail')
        })
        console.log('cron called...', `${config.minute} ${config.hour} ${config.day} ${config.month} *`)
}
module.exports = router