# gps-babel

A speed calculater for GPS data using the [GPSBabel](http://www.gpsbabel.org/) application.

## Getting Started
Install the module with: `npm install SpeedGPS`

```javascript
var speedGPS = require('SpeedGPS').SpeedGPS();
var result = speedGPS.getSpeed(arr); // "convert file"
// where arr = [ {lat: //Latitude, lng: //Longitude, time: //ISO time} ]
// result = [ {lat: //Latitude, lng: //Longitude, time: //ISO time, speed: // in m/s} ]
```

## License
Copyright (c) 2017 Ankit Parashar  
Licensed under the MIT license.
