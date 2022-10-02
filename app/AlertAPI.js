const axios = require('axios');

module.exports = class LightController {
  constructor(accessToken, deviceId) {
    this.accessToken = accessToken;
    this.deviceId = deviceId;
  }

  async turnOn() {
    return this.apiCall(true);
  }

  async turnOff() {
    return this.apiCall(false);
  }

  async apiCall(state){
    // state shoud be true or false
    if(typeof(state) !== 'boolean') return;

    var data = JSON.stringify({
      "shadow": {
        "state": {
          "desired": {
            "on": state
          }
        }
      }
    });
    
    var config = {
      method: 'post',
      url: `https://mdash.net/api/v2/devices/${this.deviceId}?access_token=${this.accessToken}`,
      headers: { 
        'User-Agent': 'stardustChrome', 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    return await axios(config);
  }
}