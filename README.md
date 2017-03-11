# [SpeedGPS](https://github.com/ankitiitb1069/SpeedGPS)

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)


A speed calculater for GPS data using the [GPSBabel](http://www.gpsbabel.org/) application.

## Getting Started
Install the module with: 
`npm install speedgps`

```javascript
var speedGPS = require('SpeedGPS');
speedGPS.getSpeed(arr, function(result){
    console.log(results)
    // result contains the array of JSON objects
}); // "convert file"
// where arr = [ {lat: //Latitude, lng: //Longitude, time: //ISO time} ]
// result = [ {lat: //Latitude, lng: //Longitude, time: //ISO time, speed: // in m/s}.. ]
```
## Contributions
Feel free to contribute to add other functionalities of GPS Babel


## License
Copyright (c) 2017 Ankit Parashar  
Licensed under the MIT license.
