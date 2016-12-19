#!/usr/bin/env node

// require('request').debug = true

var request = require('request')

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
        build       : 'ae0b05e24983c4eded98d82129c6e6397a1e5ca3',
        results     : 
[
  {
    "browser": "winphone 8.1, Ie Mobile null",
    "tests": [
      {
        "name": "should return null for a non-HTMLElement node",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return null for a non-HTMLElement node"
        ],
        "status": "passed",
        "runtime": 0,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return a valid object for body element",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return a valid object for body element"
        ],
        "status": "passed",
        "runtime": 1,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return a valid object for body element",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return a valid object for body element"
        ],
        "status": "passed",
        "runtime": 0,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return null for a non-HTMLElement node",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return null for a non-HTMLElement node"
        ],
        "status": "passed",
        "runtime": 0,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return null for a non-HTMLElement node",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return null for a non-HTMLElement node"
        ],
        "status": "passed",
        "runtime": 1,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return a valid object for body element",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return a valid object for body element"
        ],
        "status": "passed",
        "runtime": 0,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return null for a non-HTMLElement node",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return null for a non-HTMLElement node"
        ],
        "status": "passed",
        "runtime": 0,
        "errors": [],
        "assertions": []
      },
      {
        "name": "should return a valid object for body element",
        "suiteName": "Browse",
        "fullName": [
          "Browse",
          "should return a valid object for body element"
        ],
        "status": "passed",
        "runtime": 0,
        "errors": [],
        "assertions": []
      }
    ],
    "suites": {
      "fullName": [],
      "childSuites": [
        {
          "name": "Browse",
          "fullName": [
            "Browse"
          ],
          "childSuites": [],
          "tests": [
            {
              "name": "should return null for a non-HTMLElement node",
              "suiteName": "Browse",
              "fullName": [
                "Browse",
                "should return null for a non-HTMLElement node"
              ],
              "status": "passed",
              "runtime": 0,
              "errors": [],
              "assertions": []
            },
            {
              "name": "should return a valid object for body element",
              "suiteName": "Browse",
              "fullName": [
                "Browse",
                "should return a valid object for body element"
              ],
              "status": "passed",
              "runtime": 0,
              "errors": [],
              "assertions": []
            }
          ],
          "status": "passed",
          "testCounts": {
            "passed": 2,
            "failed": 0,
            "skipped": 0,
            "total": 2
          },
          "runtime": 0
        }
      ],
      "tests": [],
      "status": "passed",
      "testCounts": {
        "passed": 2,
        "failed": 0,
        "skipped": 0,
        "total": 2
      },
      "runtime": 0
    }
  }
]
    }
},
function(error, response, body) {
  console.log('error:', error)
  console.log('statusCode:', response && response.statusCode)
  console.log('body:', body)
})
