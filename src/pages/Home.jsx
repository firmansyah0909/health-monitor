import { Link, useNavigate } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";
import { useState } from "react";

function Home() {

  const navigate = useNavigate();

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

        <button
          onClick={() => navigate("/dashboard")}
          className="btn-home"
        >
          Mulai Monitoring
        </button>

      </div>

    </div>

  );
}

export default Home;