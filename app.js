var CreateGPXX = require('./lib/createGPX').GPXService
var gpsBabel = require('./lib/getSpeed')
var csv = require('csvtojson')
var createGPX = new CreateGPXX()
var path = require('path')
var appDir = path.dirname(require.main.filename)
var fs = require('fs')

var gpsSpeed = {
    // var self = this

     /**
     * Array of GPS points
     * @param arr
     */

  getSpeed: function (arr, cb) {
    var results = []
    if (!Array.isArray(arr)) {
      throw new Error('Not an Array')
    } else {
      var fileName = createGPX.toXML(arr, appDir)
      gpsBabel.convert(fileName + '.gpx', fileName + '.csv', function (err, result) {
        if (err) {
          throw new Error(err)
        }
        csv().fromFile(result)
              .on('json', (jsonObj) => {
                results.push({lat: jsonObj.Latitude, lng: jsonObj.Longitude, speed: jsonObj.Speed, time: new Date(jsonObj.Date + ',' + jsonObj.Time).toISOString()})
              })
              .on('done', (error) => {
                if (error) {
                  throw new Error(error)
                }
                fs.unlink(result)
                fs.unlink(fileName + '.gpx')
                return cb(results)
              })
      })
    }
  }
}

module.exports = gpsSpeed
