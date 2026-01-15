import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const images = [
  "/images/fisat_1.jpeg",
  "/images/fisat_2.jpeg",
  "/images/fisat3.jpeg",
];

function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const [attendedDays, setAttendedDays] = useState("");
  const [isAdmin, setIsAdmin] = useState(true); // Simulating admin login
  const costPerDay = 145;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Function to handle attendance input
  const handleAttendanceChange = (e) => {
    const value = e.target.value;
    if (value === "" || (Number(value) >= 0 && Number(value) <= 30)) {
      setAttendedDays(value);
    } else {
      alert("Attendance must be between 0 and 30 days.");
    }
  };

  // Placeholder for payment integration
  const handlePayment = () => {
    if (attendedDays === "" || attendedDays < 0 || attendedDays > 30) {
      alert("Please enter a valid attendance (0-30 days).");
      return;
    }
    const amount = attendedDays * costPerDay;
    alert(`Redirecting to payment for ₹${amount}`);
    // Integrate payment gateway like Razorpay/Stripe here
  };

  return (
    <div>
      {/* Hero Section with Image Transition */}
      <div
        className="hero-section"
        style={{
          background: `url(${images[currentImage]}) center/cover no-repeat`,
          height: "400px",
          transition: "background 1s ease-in-out",
        }}
      >
        <div className="overlay text-white text-center d-flex flex-column justify-content-center h-100">
          <h1>Welcome to FISAT Hostel</h1>
          <p>Your home away from home</p>
        </div>
      </div>

      {/* Notification & Forms Section */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <h3>Notifications</h3>
            <div className="card">
              <div className="card-body">
                <p>Revised rules of CUSAT Hostels.</p>
                <span className="text-danger">open</span>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <h3>Forms</h3>
            <div className="card">
              <div className="card-body">
                <p>Late Entry Form</p>
                <span className="text-danger">open</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Attendance Section */}
      {isAdmin && (
        <div className="container mt-4">
          <h3>Administrator Attendance Management</h3>
          <div className="mb-3">
            <label className="form-label"><strong>Enter Days Attended (0-30):</strong></label>
            <input
              type="number"
              className="form-control"
              value={attendedDays}
              onChange={handleAttendanceChange}
              min="0"
              max="30"
            />
          </div>
          <button className="btn btn-success" onClick={handlePayment}>
            Pay Fees (₹{attendedDays * costPerDay || 0})
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;
