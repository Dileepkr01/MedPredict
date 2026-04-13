// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function AdminDashboard() {
//   const [stats, setStats] = useState({});

//   const fetchStats = async () => {
//     try {
//       const res = await API.get("/dashboard/stats");
//       setStats(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>

//       <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
//         <div style={cardStyle}>
//           <h3>Total Patients</h3>
//           <p>{stats.totalPatients}</p>
//         </div>

//         <div style={cardStyle}>
//           <h3>Total Doctors</h3>
//           <p>{stats.totalDoctors}</p>
//         </div>

//         <div style={cardStyle}>
//           <h3>Total Appointments</h3>
//           <p>{stats.totalAppointments}</p>
//         </div>

//         <div style={cardStyle}>
//           <h3>Pending Appointments</h3>
//           <p>{stats.pendingAppointments}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// const cardStyle = {
//   padding: "20px",
//   background: "#f8f9fa",
//   borderRadius: "10px",
//   width: "200px",
//   textAlign: "center",
//   boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
// };

// export default AdminDashboard;






















import { useEffect, useState } from "react";
import API from "../api/axios";

const CARDS = [
  {
    key: "totalPatients",
    label: "Total Patients",
    sub: "Registered in system",
    accent: "#6366f1",
    light: "#eef2ff",
    border: "#c7d2fe",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    key: "totalDoctors",
    label: "Total Doctors",
    sub: "Active specialists",
    accent: "#10b981",
    light: "#ecfdf5",
    border: "#a7f3d0",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
        <path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="10" y1="20" x2="14" y2="20" />
      </svg>
    ),
  },
  {
    key: "totalAppointments",
    label: "Total Appointments",
    sub: "All time bookings",
    accent: "#f59e0b",
    light: "#fffbeb",
    border: "#fde68a",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    key: "pendingAppointments",
    label: "Pending Appointments",
    sub: "Awaiting confirmation",
    accent: "#ef4444",
    light: "#fef2f2",
    border: "#fecaca",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [mlData, setMlData] = useState({});
  const [loaded, setLoaded] = useState(false);

  const fetchStats = async () => {
    setLoaded(false);
    try {
      const res = await API.get("/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoaded(true);
    }
  };

  const fetchML = async () => {
    try {
      const res = await API.get("/predictions/ml");
      setMlData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchML();
  }, []);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

        .adm-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

        .adm-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .adm-title {
          font-size: 22px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.4px;
          margin: 0 0 4px;
        }

        .adm-date {
          font-size: 12px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
        }

        .adm-refresh {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 9px;
          font-size: 13px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          color: #64748b;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }

        .adm-refresh:hover { background: #f8fafc; border-color: #cbd5e1; color: #0f172a; }
        .adm-refresh svg { width: 14px; height: 14px; stroke: currentColor; flex-shrink: 0; }

        .adm-section-label {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #cbd5e1;
          text-transform: uppercase;
          font-family: 'Fira Mono', monospace;
          margin: 0 0 14px;
        }

        /* ── AI Banner ── */
        .adm-ai-banner {
          background: #0f172a;
          border-radius: 14px;
          padding: 22px 26px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }

        .adm-ai-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .adm-ai-glow {
          position: absolute;
          top: -40px;
          right: -40px;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(6,182,212,0.2) 0%, transparent 70%);
          pointer-events: none;
        }

        .adm-ai-left {
          display: flex;
          align-items: center;
          gap: 16px;
          position: relative;
          z-index: 1;
        }

        .adm-ai-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(6,182,212,0.15);
          border: 1px solid rgba(6,182,212,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .adm-ai-icon svg { width: 22px; height: 22px; stroke: #22d3ee; }

        .adm-ai-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #475569;
          text-transform: uppercase;
          font-family: 'Fira Mono', monospace;
          margin-bottom: 3px;
        }

        .adm-ai-title {
          font-size: 15px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.2px;
        }

        .adm-ai-right {
          display: flex;
          align-items: center;
          gap: 32px;
          position: relative;
          z-index: 1;
        }

        .adm-ai-stat {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 3px;
        }

        .adm-ai-stat-value {
          font-size: 32px;
          font-weight: 700;
          color: #22d3ee;
          letter-spacing: -1.5px;
          line-height: 1;
          font-family: 'Fira Mono', monospace;
        }

        .adm-ai-stat-label {
          font-size: 11px;
          color: #475569;
          font-family: 'Fira Mono', monospace;
        }

        .adm-ai-divider {
          width: 1px;
          height: 40px;
          background: rgba(255,255,255,0.06);
          flex-shrink: 0;
        }

        .adm-ai-message {
          max-width: 240px;
          font-size: 12.5px;
          color: #64748b;
          line-height: 1.5;
          text-align: right;
          font-family: 'Fira Mono', monospace;
        }

        .adm-ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: rgba(6,182,212,0.12);
          border: 1px solid rgba(6,182,212,0.25);
          color: #22d3ee;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 11px;
          font-family: 'Fira Mono', monospace;
          font-weight: 500;
          margin-bottom: 6px;
        }

        .adm-ai-badge-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #22d3ee;
          animation: ai-pulse 1.8s infinite;
        }

        @keyframes ai-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        /* ── Metric grid ── */
        .adm-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 960px) { .adm-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .adm-grid { grid-template-columns: 1fr; } }

        @media (max-width: 760px) {
          .adm-ai-right { flex-direction: column; align-items: flex-start; gap: 10px; }
          .adm-ai-banner { flex-direction: column; align-items: flex-start; }
          .adm-ai-message { text-align: left; }
          .adm-ai-stat { align-items: flex-start; }
          .adm-ai-divider { display: none; }
        }

        .adm-card {
          background: #ffffff;
          border-radius: 14px;
          border: 1px solid #e8eaf0;
          padding: 20px 18px 18px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.15s, transform 0.15s;
          cursor: default;
        }

        .adm-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          transform: translateY(-2px);
        }

        .adm-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .adm-icon-wrap {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .adm-live-tag {
          font-size: 10.5px;
          font-weight: 500;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: 'Fira Mono', monospace;
        }

        .adm-value {
          font-size: 30px;
          font-weight: 700;
          letter-spacing: -1px;
          color: #0f172a;
          line-height: 1;
          margin-bottom: 5px;
          min-height: 30px;
        }

        .adm-value.loading {
          background: #f1f5f9;
          color: transparent;
          border-radius: 6px;
          width: 60px;
          animation: adm-pulse 1.4s ease-in-out infinite;
        }

        @keyframes adm-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        .adm-card-label {
          font-size: 13px;
          font-weight: 500;
          color: #475569;
          margin-bottom: 2px;
        }

        .adm-divider { height: 1px; background: #f1f5f9; margin: 14px 0 12px; }

        .adm-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .adm-footer-tag {
          font-size: 11px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
        }

        .adm-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
      `}</style>

      <div className="adm-root">
        {/* Header */}
        <div className="adm-header">
          <div>
            <h1 className="adm-title">Admin Dashboard</h1>
            <p className="adm-date">{today}</p>
          </div>
          <button className="adm-refresh" onClick={() => { fetchStats(); fetchML(); }}>
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            Refresh
          </button>
        </div>

        {/* AI Prediction Banner */}
        <div className="adm-ai-banner">
          <div className="adm-ai-glow" />

          <div className="adm-ai-left">
            <div className="adm-ai-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
                <circle cx="9" cy="14" r="1" fill="currentColor" strokeWidth="0" />
                <circle cx="15" cy="14" r="1" fill="currentColor" strokeWidth="0" />
              </svg>
            </div>
            <div>
              <div className="adm-ai-label">AI Prediction</div>
              <div className="adm-ai-title">ML Forecast Model</div>
            </div>
          </div>

          <div className="adm-ai-right">
            <div className="adm-ai-stat">
              <div className="adm-ai-badge">
                <span className="adm-ai-badge-dot" />
                AI · Live
              </div>
              <div className="adm-ai-stat-value">
                {mlData.predictedPatients ?? "--"}
              </div>
              <div className="adm-ai-stat-label">Predicted Patients</div>
            </div>

            <div className="adm-ai-divider" />

            <div className="adm-ai-message">
              {mlData.message || "Fetching prediction data..."}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <p className="adm-section-label">Key Metrics</p>

        <div className="adm-grid">
          {CARDS.map((card) => (
            <div className="adm-card" key={card.key}>
              <div className="adm-card-top">
                <div
                  className="adm-icon-wrap"
                  style={{ background: card.light, border: `1px solid ${card.border}`, color: card.accent }}
                >
                  {card.icon}
                </div>
                <span className="adm-live-tag" style={{ background: card.light, color: card.accent }}>
                  Live
                </span>
              </div>

              <div className={`adm-value${!loaded ? " loading" : ""}`}>
                {loaded ? (stats[card.key] ?? "—") : "0"}
              </div>
              <div className="adm-card-label">{card.label}</div>

              <div className="adm-divider" />

              <div className="adm-footer-row">
                <span className="adm-footer-tag">{card.sub}</span>
                <span className="adm-dot" style={{ background: card.accent }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;