#!/usr/bin/env node

var browserstackRunner = require('browserstack-runner')

console.log(process.cwd() + '/' + process.argv[2])

var config = require(process.cwd() + '/' + process.argv[2])

var request = require('request')

browserstackRunner.run(config, function(error, report) {
    if(error) {
        console.log("Error:" + error)
        return
    }
    console.log(JSON.stringify(report, null, 2))
    console.log('Sending report to build report server ...')
    request.post('https://www.piaxis.tech/api/v1/runs/',
        {
            auth : {
                username : 'browserstack-' + process.env.BROWSERSTACK_USERNAME,
                password : process.env.BROWSERSTACK_ACCESS_KEY,
                sendImmediately : true,
            },
            json : true,
            followAllRedirects : true,
            rejectUnauthorized : false,
            body : {
                project     : 'browse.js',
                platform    : 'BrowserStack',
                build       : process.env.BROWSERSTACK_BUILD,
                results     : report
            }
        },
        function(error, response, body) {
            console.log('Response from build report server')
            console.log('error:', error)
            console.log('statusCode:', response && response.statusCode)
            console.log('body:', body)
        }
    )
    console.log("Test Finished")
})
