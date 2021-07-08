const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=<ACCESS_KEY>&query=' + latitude + ',' + longitude + '&units=m';
    
    request({
        url,
        json: true
    }, (error, response) => {
        if (error){
            callback('Unable to connect to weather services!', undefined);
        }else if(response.body.current.error){
            callback('Unable to find location. Try another search', undefined);
        }else{
            callback(undefined,                
                response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' out. It feels like ' + response.body.current.feelslike + ' degrees out. The humidiy is ' + response.body.current.humidity + "%."
            )
        }
    });
};

module.exports = {
    forecast: forecast    
}

