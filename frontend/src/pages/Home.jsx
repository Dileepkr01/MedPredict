// import { Link, useNavigate } from "react-router-dom";
// import { useEffect } from "react";

// function Home() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Auto redirect if already logged in
// //   useEffect(() => {
// //     if (token && role) {
// //       if (role === "admin") navigate("/admin");
// //       if (role === "doctor") navigate("/doctor");
// //       if (role === "reception") navigate("/reception");
// //     }
// //   }, []);

//   return (
//     <div style={styles.container}>
//       {/* Navbar */}
//       <nav style={styles.navbar}>
//         <h2 style={{ color: "#2c3e50" }}>Hospital RMS</h2>

//         <Link to="/login" style={styles.button}>
//           Login
//         </Link>
//       </nav>

//       {/* Hero Section */}
//       <div style={styles.hero}>
//         <h1>Hospital Resource Management System</h1>
//         <p>
//           Securely manage Patients, Doctors, Appointments & Beds.
//         </p>

//         <Link to="/login" style={styles.primaryBtn}>
//           Login to Continue
//         </Link>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     background: "linear-gradient(to right, #667eea, #764ba2)",
//   },
//   navbar: {
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "20px 50px",
//     alignItems: "center",
//     background: "white",
//   },
//   button: {
//     textDecoration: "none",
//     padding: "8px 18px",
//     background: "#3498db",
//     color: "white",
//     borderRadius: "6px",
//   },
//   hero: {
//     textAlign: "center",
//     marginTop: "150px",
//     color: "white",
//   },
//   primaryBtn: {
//     marginTop: "20px",
//     display: "inline-block",
//     textDecoration: "none",
//     padding: "12px 28px",
//     background: "#2c3e50",
//     color: "white",
//     borderRadius: "8px",
//   },
// };

// export default Home;





import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .hm-root {
          min-height: 100vh;
          background: #0b0f1a;
          font-family: 'Outfit', sans-serif;
          color: #e8eaf0;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* Background grid */
        .hm-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
          z-index: 0;
        }

        /* Glow blob */
        .hm-glow {
          position: absolute;
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 700px;
          height: 500px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        /* ── Navbar ── */
        .hm-nav {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 22px 60px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          backdrop-filter: blur(4px);
        }

        .hm-brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .hm-brand-icon {
          width: 36px;
          height: 36px;
          background: #6366f1;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hm-brand-icon svg { width: 18px; height: 18px; stroke: #fff; }

        .hm-brand-name {
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .hm-brand-sub {
          font-size: 10px;
          color: #475569;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.06em;
          margin-top: 1px;
        }

        .hm-nav-login {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 20px;
          background: #fff;
          color: #0f172a;
          border-radius: 9px;
          font-size: 13.5px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          transition: background 0.15s, transform 0.1s;
        }

        .hm-nav-login:hover { background: #f1f5f9; }
        .hm-nav-login:active { transform: scale(0.98); }
        .hm-nav-login svg { width: 14px; height: 14px; stroke: currentColor; }

        /* ── Hero ── */
        .hm-hero {
          position: relative;
          z-index: 1;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 80px 24px 60px;
        }

        .hm-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.28);
          border-radius: 20px;
          padding: 6px 16px;
          font-size: 12px;
          color: #a5b4fc;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.04em;
          margin-bottom: 30px;
        }

        .hm-tag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: hm-pulse 2s infinite;
        }

        @keyframes hm-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }

        .hm-heading {
          font-size: 54px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -2px;
          line-height: 1.1;
          max-width: 700px;
          margin-bottom: 20px;
        }

        .hm-heading span { color: #818cf8; }

        .hm-desc {
          font-size: 16px;
          color: #64748b;
          max-width: 480px;
          line-height: 1.75;
          margin-bottom: 40px;
        }

        .hm-cta-row {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
          justify-content: center;
          margin-bottom: 64px;
        }

        .hm-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 28px;
          background: #6366f1;
          color: #fff;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          transition: background 0.15s, transform 0.1s;
          letter-spacing: 0.01em;
        }

        .hm-cta-primary:hover { background: #4f46e5; }
        .hm-cta-primary:active { transform: scale(0.98); }
        .hm-cta-primary svg { width: 15px; height: 15px; stroke: currentColor; }

        .hm-cta-ghost {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 13px 24px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8;
          border-radius: 11px;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
          text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }

        .hm-cta-ghost:hover { border-color: rgba(255,255,255,0.25); color: #e2e8f0; }

        /* Feature cards */
        .hm-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          max-width: 900px;
          width: 100%;
        }

        @media (max-width: 760px) {
          .hm-cards { grid-template-columns: repeat(2, 1fr); }
          .hm-heading { font-size: 34px; letter-spacing: -1px; }
          .hm-nav { padding: 18px 24px; }
        }

        @media (max-width: 480px) {
          .hm-cards { grid-template-columns: 1fr 1fr; }
        }

        .hm-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          padding: 20px 16px 16px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          text-align: left;
          transition: border-color 0.15s, background 0.15s;
        }

        .hm-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,255,255,0.12);
        }

        .hm-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .hm-card-icon svg { width: 17px; height: 17px; }

        .hm-card-title {
          font-size: 13px;
          font-weight: 600;
          color: #e2e8f0;
        }

        .hm-card-desc {
          font-size: 11.5px;
          color: #475569;
          line-height: 1.55;
          font-family: 'Fira Mono', monospace;
        }

        /* ── Footer strip ── */
        .hm-footer {
          position: relative;
          z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 18px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
        }

        .hm-footer-text {
          font-size: 11.5px;
          color: #334155;
          font-family: 'Fira Mono', monospace;
        }

        .hm-role-chips {
          display: flex;
          gap: 7px;
        }

        .hm-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 11px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          border: 1px solid;
          font-family: 'Outfit', sans-serif;
        }

        .hm-chip-dot { width: 5px; height: 5px; border-radius: 50%; }
      `}</style>

      <div className="hm-root">
        <div className="hm-glow" />

        {/* Navbar */}
        <nav className="hm-nav">
          <div className="hm-brand">
            <div className="hm-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <div className="hm-brand-name">MedPredict</div>
              <div className="hm-brand-sub">HMS v2.0</div>
            </div>
          </div>

          <Link to="/login" className="hm-nav-login">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
            Login
          </Link>
        </nav>

        {/* Hero */}
        <div className="hm-hero">
          <div className="hm-hero-tag">
            <span className="hm-tag-dot" />
            Hospital Resource Management System
          </div>

          <h1 className="hm-heading">
            Manage care,<br /><span>predict</span> outcomes.
          </h1>

          <p className="hm-desc">
            Securely manage Patients, Doctors, Appointments & Beds — all in one unified platform built for modern healthcare teams.
          </p>

          <div className="hm-cta-row">
            <Link to="/login" className="hm-cta-primary">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login to Continue
            </Link>
            <a href="#features" className="hm-cta-ghost">
              Explore features
            </a>
          </div>

          {/* Feature cards */}
          <div className="hm-cards" id="features">
            <div className="hm-card">
              <div className="hm-card-icon" style={{ background: "rgba(99,102,241,0.12)", color: "#818cf8" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="hm-card-title">Patients</div>
              <div className="hm-card-desc">Register, track and update patient records with ease.</div>
            </div>

            <div className="hm-card">
              <div className="hm-card-icon" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
                  <path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
                  <line x1="12" y1="18" x2="12" y2="22" /><line x1="10" y1="20" x2="14" y2="20" />
                </svg>
              </div>
              <div className="hm-card-title">Doctors</div>
              <div className="hm-card-desc">Manage specialist profiles and assignments.</div>
            </div>

            <div className="hm-card">
              <div className="hm-card-icon" style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
              </div>
              <div className="hm-card-title">Appointments</div>
              <div className="hm-card-desc">Schedule and track patient visits in real time.</div>
            </div>

            <div className="hm-card">
              <div className="hm-card-icon" style={{ background: "rgba(239,68,68,0.1)", color: "#f87171" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
                  <path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" />
                </svg>
              </div>
              <div className="hm-card-title">Beds</div>
              <div className="hm-card-desc">Monitor ward occupancy and assign beds instantly.</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="hm-footer">
          <span className="hm-footer-text">MedPredict HMS · v2.0 · All rights reserved</span>
          <div className="hm-role-chips">
            <div className="hm-chip" style={{ background: "rgba(99,102,241,0.1)", color: "#818cf8", borderColor: "rgba(99,102,241,0.2)" }}>
              <span className="hm-chip-dot" style={{ background: "#6366f1" }} /> Admin
            </div>
            <div className="hm-chip" style={{ background: "rgba(16,185,129,0.1)", color: "#34d399", borderColor: "rgba(16,185,129,0.2)" }}>
              <span className="hm-chip-dot" style={{ background: "#10b981" }} /> Doctor
            </div>
            <div className="hm-chip" style={{ background: "rgba(245,158,11,0.1)", color: "#fbbf24", borderColor: "rgba(245,158,11,0.2)" }}>
              <span className="hm-chip-dot" style={{ background: "#f59e0b" }} /> Reception
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Home;