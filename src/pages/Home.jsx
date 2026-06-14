import { Link } from "react-router-dom";
import { FaHeartbeat } from "react-icons/fa";

function Home() {
  return (
    <div className="home">

      <nav className="navbar">

        <div className="logo">

          <FaHeartbeat size={30} />

          <h2>Capstone</h2>

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

        <Link
          to="/dashboard"
          className="btn-home"
        >
          Go To Dashboard
        </Link>

      </div>

    </div>
  );
}

export default Home;