import { useEffect, useState } from "react";
import axios from "axios";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  FaHeartbeat,
  FaTemperatureHigh
} from "react-icons/fa";

import { MdBloodtype } from "react-icons/md";

import "../App.css";

function Dashboard() {

  const [data, setData] = useState({
    hr: 0,
    spo2: 0,
    temp: 0,
    heartStatus: "-",
    tempStatus: "-",
    timestamp: "-"
  });

  const [history, setHistory] = useState([]);

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {

  const timer = setInterval(() => {

    setCurrentTime(new Date());

  }, 1000);

  return () => clearInterval(timer);

  }, []);

  const API = "https://health-monitor-6ls3.onrender.com";

  const ambilData = async () => {

    try {

      const resData = await axios.get(
        `${API}/data`
      );

      setData(resData.data);

      const resHistory = await axios.get(
        `${API}/history`
      );

      setHistory(resHistory.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    ambilData();

    const interval = setInterval(
      ambilData,
      500
    );

    return () => clearInterval(interval);

  }, []);

const exportCSV = () => {

  window.open(
    `${API}/export`,
    "_blank"
  );

};

  const clearData = async () => {

    await axios.get(
      `${API}/clear`
    );

    ambilData();

  };

const data10Terakhir =
  [...history]
    .reverse()
    .slice(0, 10);

const namaPasien =
  localStorage.getItem("namaPasien") || "-";

const umurPasien =
  localStorage.getItem("umurPasien") || "-";

const jkPasien =
  localStorage.getItem("jkPasien") || "-";

return (

  <div className="container">

<div className="header-monitor">

  <div className="header-left">

    <img
      src="/logo-kkn.jpeg"
      alt="Logo KKN"
      className="header-logo"
    />

    <h2>
      KKN UNTIDAR 2026
    </h2>

  </div>

  <div className="header-right">

    Jam :
    {currentTime.toLocaleTimeString('id-ID')}

  </div>

</div>

      {
        data.tempStatus === "TINGGI" && (
          <div className="alert-red">
            ⚠️ DEMAM TERDETEKSI
          </div>
        )
      }

      {
        data.heartStatus === "CEPAT" && (
          <div className="alert-red">
            ⚠️ DETAK JANTUNG TINGGI
          </div>
        )
      }

      <div className="cards">

        <div className="card">

          <FaHeartbeat size={40} />

          <h2>
            Heart Rate
          </h2>

          <h1>
            {data.hr}
          </h1>

          <p>
            BPM
          </p>

          <span>
            {data.heartStatus}
          </span>

        </div>

        <div className="card">

          <MdBloodtype size={40} />

          <h2>
            SpO₂
          </h2>

          <h1>
            {data.spo2}
          </h1>

          <p>
            %
          </p>

        </div>

        <div className="card">

          <FaTemperatureHigh size={40} />

          <h2>
            Temperature
          </h2>

          <h1>
            {data.temp}
          </h1>

          <p>
            °C
          </p>

          <span>
            {data.tempStatus}
          </span>

        </div>

      </div>

 <div className="charts-row">

  <div className="chart">

    <h2>
      Grafik Heart Rate
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart
        data={history}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="timestamp"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="hr"
          stroke="#ff0000"
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

  <div className="chart">

    <h2>
      Grafik Suhu
    </h2>

    <ResponsiveContainer
      width="100%"
      height={300}
    >

      <LineChart
        data={history}
      >

        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis
          dataKey="timestamp"
        />

        <YAxis />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="temp"
          stroke="#0066ff"
        />

      </LineChart>

    </ResponsiveContainer>

  </div>

</div>

      <div className="button-group">

        <button
          onClick={exportCSV}
        >
          Export CSV
        </button>

        <button
          onClick={clearData}
        >
          Clear Data
        </button>

      </div>

      <div className="table-box">

        <h2>
          10 Data Terakhir
        </h2>

        <table>

          <thead>

            <tr>

              <th>No</th>
              <th>HR</th>
              <th>SpO₂</th>
              <th>Suhu</th>
              <th>Status HR</th>
              <th>Status Suhu</th>
              <th>Waktu</th>

            </tr>

          </thead>

          <tbody>

            {
              data10Terakhir.map(
                (
                  item,
                  index
                ) => (

                  <tr
                    key={index}
                  >

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {item.hr}
                    </td>

                    <td>
                      {item.spo2}
                    </td>

                    <td>
                      {item.temp}
                    </td>

                    <td>
                      {item.heartStatus}
                    </td>

                    <td>
                      {item.tempStatus}
                    </td>

                    <td>
                      {item.timestamp}
                    </td>

                  </tr>

                )
              )
            }

          </tbody>

        </table>

      </div>

    </div>

  );
}

export default Dashboard;