var createGPX = require('./lib/createGPX').GPXService
var gpsBabel = require('./lib/getSpeed')
var csv = require('csvtojson')
createGPX = new createGPX()

function gpsSpeed(){
    var self = this
    
     /**
     * Array of GPS points
     * @param arr
     */
    var results = [] 
    this.getSpeed(arr){

        if(!Array.isArray(arr)){
            throw new Error("Not an Array")
        }        
        else{
          var fileName =  createGPX.toXML(arr)
          gpsBabel.convert('gpx',fileName+'.gpx',fileName+'.csv', function(err, result){
              if(err){
                  throw new Error(err)
              }
              csv().fromFile(result)
              .on('json',(jsonObj)=>{
                results.push({lat:jsonObj.Latitude, lng: jsonObj.Longitude, speed: jsonObj.Speed, time: new Date(jsonObj.Date+','+jsonObj.Time).toISOString()})
              })
              .on('done',(error)=>{
                  if(error){
                      throw new Error(error)
                  }
                  fs.unlink(result)
                  fs.unlink(fileName+'.gpx')
                  return results
              })
          })

        }

    }
}

exports.gpsSpeed = gpsSpeed;