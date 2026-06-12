import { useEffect, useState } from 'react'

export default function Dashboard() {

  // STATE DATA SENSOR
  const [sensorData, setSensorData] = useState({
    hr: 0,
    spo2: 0,
    temp: 0
  })

  // AMBIL DATA DARI NODE JS
  useEffect(() => {

    const ambilData = async () => {

      try {

        const response = await fetch(
          'http://192.168.1.25:3000/data'
        )

        const data = await response.json()

        setSensorData(data)

      } catch (error) {

        console.log(error)
      }
    }

    // AMBIL PERTAMA
    ambilData()

    // REALTIME 1 DETIK
    const interval = setInterval(ambilData, 1000)

    return () => clearInterval(interval)

  }, [])

  // STATUS HEART RATE
  let hrStatus = "Normal"

  if (sensorData.hr > 100) {

    hrStatus = "Takikardia (Cepat)"
  }
  else if (sensorData.hr < 60) {

    hrStatus = "Bradikardia (Lambat)"
  }

  // STATUS SUHU
  let tempStatus = "Normal"

  if (sensorData.temp > 37.5) {

    tempStatus = "Demam"
  }
  else if (sensorData.temp < 36) {

    tempStatus = "Hipotermia"
  }

  return (

    <div style={{
      padding: '30px',
      fontFamily: 'Arial',
      background: '#f5f5f5',
      minHeight: '100vh'
    }}>

      <h1>Monitoring Kesehatan</h1>

      <div style={{
        display: 'flex',
        gap: '20px',
        marginTop: '30px',
        flexWrap: 'wrap'
      }}>

        {/* HEART RATE */}
        <div style={{
          width: '300px',
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>

          <h2>Heart Rate</h2>

          <h1 style={{
            fontSize: '50px'
          }}>
            {sensorData.hr}
            <span style={{
              fontSize: '25px'
            }}>
              BPM
            </span>
          </h1>

          <h3>{hrStatus}</h3>

        </div>

        {/* TEMPERATURE */}
        <div style={{
          width: '300px',
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>

          <h2>Body Temperature</h2>

          <h1 style={{
            fontSize: '50px'
          }}>
            {sensorData.temp}
            <span style={{
              fontSize: '25px'
            }}>
              °C
            </span>
          </h1>

          <h3>{tempStatus}</h3>

        </div>

        {/* SPO2 */}
        <div style={{
          width: '300px',
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}>

          <h2>SpO2</h2>

          <h1 style={{
            fontSize: '50px'
          }}>
            {sensorData.spo2}
            <span style={{
              fontSize: '25px'
            }}>
              %
            </span>
          </h1>

          <h3>
            {sensorData.spo2 >= 95
              ? "Normal"
              : "Rendah"}
          </h3>

        </div>

      </div>

    </div>
  )
}