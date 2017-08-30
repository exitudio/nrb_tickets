'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _fastCsv = require('fast-csv');

var _fastCsv2 = _interopRequireDefault(_fastCsv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var maxDisplayTypes = 10;
var setData = function setData(key, value) {
    if (typeof key[value] === 'undefined') {
        key[value] = 1;
    } else {
        key[value]++;
    }
};

var convertAndTrimObjectToArray = function convertAndTrimObjectToArray(obj) {
    return trimArray(convertObjectToSortedArray(obj));
};

var convertObjectToSortedArray = function convertObjectToSortedArray(obj) {
    //convert object to array and sort array
    //thereby knowing which type occurs most
    var array = [];
    for (var key in obj) {
        array.push({
            name: key,
            value: obj[key]
        });
    }
    array.sort(function (a, b) {
        return b.value - a.value;
    });
    return array;
};

var trimArray = function trimArray(array) {
    // slice the other index than more than "maxDisplayTypes"
    // to show only major types
    if (array.length >= maxDisplayTypes - 1) {
        var otherArray = array.splice(maxDisplayTypes - 1);
        var otherTotalNumber = 0;
        for (var i = 0; i < otherArray.length; i++) {
            otherTotalNumber += otherArray[i].value;
        }
        var otherObject = {
            name: 'other',
            value: otherTotalNumber
        };
        array.push(otherObject);
    }
    return array;
};

router.get('/getdata', function (req, res) {
    console.log('REST get services/test', req.query);

    var startDate = new Date(req.query.start);
    var endDate = new Date(req.query.end);

    var problemTypeHash = {},
        dateHash = {},
        deviceModelHash = {};
    var isHeader = true;
    _fastCsv2.default.fromPath("./src/data/testdata.csv").on("data", function (data) {
        if (isHeader) {
            isHeader = false;
        } else {
            var cursorDate = new Date(data[2]);
            if (cursorDate >= startDate && cursorDate <= endDate) {
                setData(problemTypeHash, data[1]);
                setData(dateHash, data[2]);
                setData(deviceModelHash, data[3]);
            }
        }
    }).on("end", function () {
        return res.status(200).json({
            problemType: convertAndTrimObjectToArray(problemTypeHash),
            date: convertObjectToSortedArray(dateHash),
            deviceModel: convertAndTrimObjectToArray(deviceModelHash)
        });
    });
});
module.exports = router;