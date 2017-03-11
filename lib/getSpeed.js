'use strict'

var exec = require('child_process').exec

exports.convert = function (inputFile, outputFile, callback) {
  exec('gpsbabel -V', function (error, stdout, stderr) {
    if (error !== null) {
      throw new Error('GPSBabel is not installed.')
    }
// gpsbabel -t -i gpx -f input.gpx -x track,speed -o unicsv -F output.csv
    exec('gpsbabel -t -i gpx -f ' + inputFile + ' -x track,speed -o unicsv -F ' + outputFile, function (error, stdout, stderr) {
      if (error) {
        callback('Could not convert file.', null)
      } else {
        callback(null, outputFile)
      }
    })
  })
}
