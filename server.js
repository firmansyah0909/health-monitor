import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

// =========================
// DATA TERBARU
// =========================

let sensorData = {

  nama: "",
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

    nama,
    hr,
    spo2,
    temp,

    heartStatus,
    tempStatus

  } = req.body

  sensorData = {

    nama:
    nama|| "",

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
  'Time,HeartRate,SpO2,Temperature,HeartStatus,TempStatus\n';

  // DATA MONITORING
  history.forEach(item => {

    csv +=
      `${item.timestamp},` +
      `${item.hr},` +
      `${item.spo2},` +
      `${item.temp},` +
      `${item.heartStatus},` +
      `${item.tempStatus}\n`;

  });

  // RATA-RATA 10 DATA TERAKHIR
  const last10 = history.slice(-10);

  if (last10.length > 0) {

    const avgHR =
      (
        last10.reduce(
          (sum, item) => sum + item.hr,
          0
        ) / last10.length
      ).toFixed(2);

    const avgSpO2 =
      (
        last10.reduce(
          (sum, item) => sum + item.spo2,
          0
        ) / last10.length
      ).toFixed(2);

    const avgTemp =
    
      (
        last10.reduce(
          (sum, item) => sum + item.temp,
          0
        ) / last10.length
      ).toFixed(2);
      let statusHR = "";
      let statusSpO2 = "";
      let statusTemp = "";

      // Heart Rate
      if (avgHR < 60) {
        statusHR = "LAMBAT";
      }
      else if (avgHR > 100) {
        statusHR = "CEPAT";
      }
      else {
        statusHR = "NORMAL";
      }

      // SpO2
      if (avgSpO2 >= 95) {
        statusSpO2 = "NORMAL";
      }
      else {
        statusSpO2 = "RENDAH";
      }

      // Temperature
      if (avgTemp < 36) {
        statusTemp = "RENDAH";
      }
      else if (avgTemp > 37.5) {
        statusTemp = "TINGGI";
      }
      else {
        statusTemp = "NORMAL";
      }
    csv += "\n";
    csv += "RATA-RATA 10 DATA TERAKHIR\n";
    csv += "Parameter,Nilai,Status\n";

    csv += `Heart Rate,${avgHR},${statusHR}\n`;
    csv += `SpO2,${avgSpO2},${statusSpO2}\n`;
    csv += `Temperature,${avgTemp},${statusTemp}\n`;

  }

  res.header(
    "Content-Type",
    "text/csv"
  );

  res.attachment(
    "juven.csv"
  );

  res.send(csv);

});

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
    new Date().toLocaleTimeString('id-ID', {
  timeZone: 'Asia/Jakarta',
  hour12: false
})

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