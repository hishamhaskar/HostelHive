import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./pages/Home";

function App() {
  const [showMarquee, setShowMarquee] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowMarquee(false);
      } else {
        setShowMarquee(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Router>
      <div>
        {/* Header Section */}
        <header className="py-2" style={{ backgroundColor: "#004e96" }}>
          <div className="container d-flex align-items-center justify-content-between">
            {/* Logo and Titles */}
            <div className="d-flex align-items-center">
              <img
                src="/images/FISAT-Conference-2021-2.png"
                alt="FISAT logo"
                style={{ height: "60px", marginRight: "5px" }}
              />
              <div>
                <div
                  className="text-white px-3 py-1 fw-bold rounded"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#faa61a",
                    border: "1px solid white", // Add a border
    borderRadius: "5px", // Optional: Rounded edges
                  }}
                >
                  Federal Institute of Science and Technology
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <a className="nav-link text-white" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">About</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Admission</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Mission</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Rules</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">Contact</a>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="text-white nav-link dropdown-toggle"
                    href="#"
                    id="hostelDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Hostels
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">Boys Hostel</a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">Girls Hostel</a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="text-white nav-link text-danger fw-bold" href="#">
                    SignIn
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Marquee (Hidden on Scroll) */}
        {showMarquee && (
          <div className="bg-warning py-2">
            <marquee className="fw-bold text-dark">
              Payments will now only be Accepted through{" "}
              <a href="https://pay.fisat.ac.in" className="text-dark">
                pay.fisat.ac.in
              </a>.
            </marquee>
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-dark text-white text-center py-3 mt-5">
          <p>&copy; 2025 FISAT Hostel. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
