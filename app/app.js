const LightController = require("./AlertAPI.js");
var Ambient = require('ambient-lib');
const {
  addData
} = require("./dbClient.js");

am = new Ambient("55766", "8ed5eb5c87488242", "8ed5eb5c87488242");

const accessToken = process.env.accessToken;
const deviceId = process.env.deviceId;

const light = new LightController(accessToken, deviceId);

async function sendData(data) {
  await addData({
    co2: data.d1,
    temp: data.d3,
    humid: data.d2
  })
}

async function eventHandler(data) {
  console.log("CO2", data.d1);
  // CO2濃度が1500ppmを超えたらライトを点灯
  if (data.d1 > 1500) {
    await light.turnOn();
  } else {
    await light.turnOff();
  }
}

async function getData() {
  am.read({
    n: 1
  }, async function (response) {
    if (response.status != 200) return;
    // await sendData(response.data[0]);
    await eventHandler(response.data[0]);
  });
}

async function main() {
  setInterval(getData, 10 * 1000);
}

main();