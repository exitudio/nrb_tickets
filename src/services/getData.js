import express from 'express'
import csv from 'fast-csv'
const router = express.Router()

const maxDisplayTypes = 10
const setData = (key, value) => {
    if (typeof key[value] === 'undefined') {
        key[value] = 1
    } else {
        key[value]++
    }
}

const convertAndTrimObjectToArray = obj =>{
    return trimArray( convertObjectToSortedArray(obj) )
}

const convertObjectToSortedArray = obj => {
    //convert object to array and sort array
    //thereby knowing which type occurs most
    let array = []
    for (let key in obj) {
        array.push({
            name: key,
            value: obj[key],
        })
    }
    array.sort( (a,b)=>{
        return b.value-a.value
    })
    return array
}

const trimArray = array =>{
    // slice the other index than more than "maxDisplayTypes"
    // to show only major types
    if(array.length>=maxDisplayTypes-1){
        let otherArray = array.splice(maxDisplayTypes-1)
        let otherTotalNumber = 0
        for(let i=0; i<otherArray.length; i++){
            otherTotalNumber += otherArray[i].value
        }
        let otherObject = {
            name: 'other',
            value: otherTotalNumber,
        }
        array.push(otherObject)
    }
    return array
}

router.get('/getdata', (req, res) => {
    console.log('REST get services/test', req.query)

    const startDate = new Date(req.query.start)
    const endDate = new Date(req.query.end)

    let problemTypeHash = {},
        dateHash = {},
        deviceModelHash = {}
    let isHeader = true
    csv.fromPath("./src/data/testdata.csv")
        .on("data", function (data) {
            if (isHeader) {
                isHeader = false
            } else {
                let cursorDate = new Date(data[2])
                if (cursorDate >= startDate && cursorDate <= endDate) {
                    setData(problemTypeHash, data[1])
                    setData(dateHash, data[2])
                    setData(deviceModelHash, data[3])
                }
            }
        })
        .on("end", function () {
            return res.status(200).json(
                {
                    problemType: convertAndTrimObjectToArray(problemTypeHash),
                    date: convertObjectToSortedArray(dateHash),
                    deviceModel: convertAndTrimObjectToArray(deviceModelHash),
                })
        })


})
module.exports = router