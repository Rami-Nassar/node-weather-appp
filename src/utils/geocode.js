const request = require('request');
const axios = require('axios');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=<ACCESS_TOKEN>&limit=1';

    request({
        url,
        json: true
    }, (error, { body }) => {
        if (error){
            callback('Unable to connect to location services!', undefined);
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search', undefined);
        }else{
            callback(undefined, {
                lat: body.features[0].center[1],
                lon: body.features[0].center[0],
                location: body.features[0].place_name           
            })
        }
    });
};

const geoCodePromise = (address) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=<ACCESS_TOKEN>&limit=1';
    return new Promise((resolve, reject) => {         
        request({
            url: url,
            json: true
        }, (error, response) => {
            if (error){
                reject('Unable to connect to location services!', undefined);
            }else if(response.body.features.length === 0){
                reject('Unable to find location. Try another search', undefined);
            }else{
                resolve({
                    lat: response.body.features[0].center[1],
                    lon: response.body.features[0].center[0],
                    location: response.body.features[0].place_name           
                })
            }
        });        
    });
};

const geoCodeAsync = async (address) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=<ACCESS_TOKEN>&limit=1';
    
    try {
        // fetch data from a url endpoint
        const data = await axios.get(url);
        return data;
      } catch(error) {
        console.log("Error: could not connect to map box api");
        // appropriately handle the error
      }
   
    // return output.data.features[0].center[0]
};


module.exports = {
    geoCode: geoCode,
    geoCodePromise: geoCodePromise,
    geoCodeAsync: geoCodeAsync
}