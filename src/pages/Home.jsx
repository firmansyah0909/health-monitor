import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import { useState } from "react";

function Home() {

  const [nama, setNama] = useState("");
  const [umur, setUmur] = useState("");
  const [jk, setJk] = useState("Laki-laki");
  const navigate = useNavigate();

  const mulaiMonitoring = () => {

    if (nama.trim() === "") {

      alert("Masukkan nama pasien terlebih dahulu");

      return;
    }

      localStorage.setItem(
        "namaPasien",
        nama
      );

      localStorage.setItem(
        "umurPasien",
        umur
      );

      localStorage.setItem(
        "jkPasien",
        jk
      );

      navigate("/dashboard");
  };

  return (

    <div className="home">

      <nav className="navbar">

        <div className="logo">

          <img
            src="/logo-kkn.jpeg"
            alt="Logo KKN"
            className="logo-img"
          />

        <div>
            <h2>KKN UNTIDAR 2026</h2>
            <p>Desa Sinduadi</p>
          </div>

        </div>

        <div className="menu">

          <Link to="/">Home</Link>

          <Link to="/dashboard">
            Dashboard
          </Link>

        </div>

      </nav>

      <div className="hero">

        <h1>Juven Monitoring</h1>

        <p>
          Real-time monitoring of Heart Rate
          and Body Temperature using
          Arduino & ESP8266.
        </p>

        <input
          type="text"
          placeholder="Masukkan Nama Pasien"
          value={nama}
          onChange={(e) =>
            setNama(e.target.value)
          }
          className="input-nama"
        />
        <input
          type="number"
          placeholder="Masukkan Umur"
          value={umur}
          onChange={(e) =>
            setUmur(e.target.value)
          }
          className="input-nama"
        />

        <select
          value={jk}
          onChange={(e) =>
            setJk(e.target.value)
          }
          className="input-nama"
        >
          <option>Laki-laki</option>
          <option>Perempuan</option>
        </select>

        <button
          onClick={mulaiMonitoring}
          className="btn-home"
        >
          Mulai Monitoring
        </button>

      </div>

    </div>

  );
}

export default Home;