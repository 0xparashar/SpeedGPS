'use strict'

var fs = require('fs')
var shortid = require('shortid')

var writeFile = function (fileName, txt, cb) {
  fs.writeFile(fileName + '.gpx', txt, function (err) {
    if (err) {
      return cb(err, null)
    }
    return cb(null, fileName)
  })
}

function GPXService (name) {
  const self = this

  const metadata = {
    name: '',
    author: {
      name: 'Ankit Parashar'
    },
    description: '',
    date: new Date(),
    fileName: ''
  }

  const xmlStart = `<?xml version="1.0"?>
<gpx
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xmlns="http://www.topografix.com/GPX/1/1"
    xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd"
    version="1.1"
    creator="${metadata.author.name}" >`
  const xmlEnd = '</gpx>'

    /**
     * Array of points. A point can be formed by latitude, longitude, elevation and time. To add a point please use self.addPoint()
     * @type {Array}
     */
    // let points = [];

    /**
     * Set the file's author
     * @param author
     */

    /**
     * Pass points
     * @param points
     * [{
     *   lat: float number (required)
     *   lng: float number (required)
     *   date: Date object (optional)
     *   elevation: number (optional)
     * }]
     *
     *
     */

    /**
     * Returns the generated XML string in GPX format
     */
  self.toXML = function (points, appDir, cb) {
    metadata.fileName = shortid.generate()
    let xmlOutput = xmlStart
    xmlOutput += `<metadata>
    <name>${metadata.name}</name>
    <author><name>${metadata.author.name}</name></author>
    <time>${metadata.date.toISOString()}</time>
</metadata>`

    xmlOutput += `<trk>
    <name>${metadata.name}</name>
    <cmt></cmt>
    <desc></desc>
    <src></src>
<trkseg>
`

    for (let i = points.length - 1; i >= 0; i--) {
      let point = points[i]
      if (point.lat && point.lng && point.time) {
        xmlOutput += `<trkpt lat="${point.lat}" lon="${point.lng}">
`
        if (point.elevation) {
          xmlOutput += `    <ele>${point.elevation}</ele>
`
        }
        if (point.time) {
          xmlOutput += `    <time>${point.time}</time>
`
        }
        xmlOutput += `</trkpt>
`
      } else throw Error("Point has to have 'lat' and 'lon'")
    }

        // And add the end
    xmlOutput += `</trkseg>
</trk>
${xmlEnd}`
    writeFile(appDir + '/' + metadata.fileName, xmlOutput, function (err, fName) {
      if (err) {
        return cb(err)
      }
      return cb(null, fName)
    })
  }
}
exports.GPXService = GPXService
