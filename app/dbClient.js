const {InfluxDB, Point} = require('@influxdata/influxdb-client')

const token = process.env.INFLUXDB_TOKEN
const url = 'https://ap-southeast-2-1.aws.cloud2.influxdata.com'

const client = new InfluxDB({url, token})

let org = `kouichi.hirachi@gmail.com`
let bucket = `KokenEnv`

let writeClient = client.getWriteApi(org, bucket, 'ns')

exports.addData = async function addData(data){
  console.log(data);
  let point = new Point('air_condition')
    .tag('host', 'esp32')
    .intField('co2', data.co2)
    .floatField('temprature', data.temp)
    .floatField('humidity', data.humid)
  await writeClient.writePoint(point);
  await writeClient.flush();
}