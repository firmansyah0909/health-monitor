import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// =========================
// DATA TERBARU
// =========================

let sensorData = {

  hr: 0,
  spo2: 0,
  temp: 0,

  heartStatus: "Tidak Ada Data",
  tempStatus: "Tidak Ada Data",

  timestamp: new Date().toLocaleTimeString('id-ID', {
  timeZone: 'Asia/Jakarta'
})

}

// =========================
// RIWAYAT
// =========================

let history = []

// =========================
// ROOT
// =========================

app.get('/', (req, res) => {

  res.send('SERVER AKTIF')

})

// =========================
// INPUT DATA DARI ESP
// =========================

app.post('/input', (req, res) => {

  console.log(
    '\n===== DATA MASUK ====='
  )

  console.log(req.body)

  const {

    hr,
    spo2,
    temp,

    heartStatus,
    tempStatus

  } = req.body

  sensorData = {

    hr:
    Number(hr),

    spo2:
    Number(spo2),

    temp:
    Number(temp),

    heartStatus:
    heartStatus || "Normal",

    tempStatus:
    tempStatus || "Normal",

    timestamp:
    new Date().toLocaleTimeString('id-ID', {
  timeZone: 'Asia/Jakarta'
})

  }

  history.push(sensorData)

  // Simpan 20 data terakhir

  if (
    history.length > 20
  ) {

    history.shift()

  }

  console.log(
    'DATA TERSIMPAN'
  )

  console.log(
    sensorData
  )

  res
  .status(200)
  .send('DATA MASUK')

})

// =========================
// DATA TERBARU
// =========================

app.get('/data', (req, res) => {

  res.json(sensorData)

})

// =========================
// RIWAYAT
// =========================

app.get('/history', (req, res) => {

  res.json(history)

})

// =========================
// EXPORT CSV
// =========================

app.get('/export', (req, res) => {

  let csv =

  'Time,HeartRate,SpO2,Temperature,HeartStatus,TempStatus\n'

  history.forEach(item => {

    csv +=

    `${item.timestamp},`

    +

    `${item.hr},`

    +

    `${item.spo2},`

    +

    `${item.temp},`

    +

    `${item.heartStatus},`

    +

    `${item.tempStatus}\n`

  })

  res.header(
    'Content-Type',
    'text/csv'
  )

  res.attachment(
    'health_monitor.csv'
  )

  res.send(csv)

})

// =========================
// CLEAR DATA
// =========================

app.get('/clear', (req, res) => {

  history = []

  sensorData = {

    hr: 0,
    spo2: 0,
    temp: 0,

    heartStatus:
    "Tidak Ada Data",

    tempStatus:
    "Tidak Ada Data",

    timestamp:
    new Date()
    .toLocaleTimeString()

  }

  res.send(
    'DATA DIHAPUS'
  )

})

// =========================
// START SERVER
// =========================
// =========================
// START SERVER
// =========================

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {

  console.log('\n========================');
  console.log(`SERVER RUNNING PORT ${PORT}`);
  console.log('========================\n');

});