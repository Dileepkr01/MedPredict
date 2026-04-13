  // function DoctorDashboard() {
  //   return (
  //     <div>
  //       <h1>Doctor Dashboard</h1>
  //       <p>Welcome to your dashboard. Use the sidebar to navigate.</p>
  //     </div>
  //   );
  // }

  // export default DoctorDashboard;










  const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

  :root {
    --bg: #f7f8fa;
    --white: #ffffff;
    --border: #eaedf3;
    --border2: #d8dce8;
    --ink: #111827;
    --ink2: #374151;
    --muted: #9ca3af;
    --green: #059669;
    --green-light: #ecfdf5;
    --green-mid: #a7f3d0;
    --blue: #2563eb;
    --blue-light: #eff6ff;
    --amber: #d97706;
    --amber-light: #fffbeb;
    --rose: #e11d48;
    --rose-light: #fff1f2;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .dash-root {
    font-family: 'Plus Jakarta Sans', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    padding: 44px 40px;
    max-width: 1000px;
    margin: 0 auto;
  }

  /* ── TOP BAR ── */
  .dash-topbar {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 44px;
  }

  .dash-greeting-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--green);
    margin-bottom: 8px;
  }

  .dash-greeting-label::before {
    content: '◆ ';
    font-size: 7px;
    vertical-align: middle;
  }

  .dash-h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 42px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1.05;
    letter-spacing: -0.015em;
  }

  .dash-subtitle {
    font-size: 14px;
    color: var(--muted);
    font-weight: 400;
    margin-top: 8px;
    line-height: 1.6;
  }

  .dash-avatar-block {
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 14px 20px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    flex-shrink: 0;
  }

  .dash-avatar {
    width: 44px;
    height: 44px;
    border-radius: 12px;
    background: var(--green-light);
    border: 1.5px solid var(--green-mid);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 20px;
    font-weight: 700;
    color: var(--green);
  }

  .dash-avatar-name {
    font-weight: 700;
    font-size: 14px;
    color: var(--ink);
  }

  .dash-avatar-role {
    font-size: 11px;
    color: var(--muted);
    font-weight: 400;
    margin-top: 2px;
  }

  /* ── STAT CARDS ── */
  .dash-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }

  .dash-stat {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 22px 20px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    transition: box-shadow 0.2s, transform 0.2s;
  }

  .dash-stat:hover {
    box-shadow: 0 6px 24px rgba(0,0,0,0.07);
    transform: translateY(-2px);
  }

  .dash-stat-icon {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    margin-bottom: 14px;
  }

  .dash-stat-icon.green { background: var(--green-light); }
  .dash-stat-icon.blue  { background: var(--blue-light); }
  .dash-stat-icon.amber { background: var(--amber-light); }
  .dash-stat-icon.rose  { background: var(--rose-light); }

  .dash-stat-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 34px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  .dash-stat-lbl {
    font-size: 12px;
    color: var(--muted);
    font-weight: 500;
    margin-top: 4px;
    letter-spacing: 0.02em;
  }

  .dash-stat-change {
    font-size: 11px;
    font-weight: 600;
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .dash-stat-change.up   { color: var(--green); }
  .dash-stat-change.down { color: var(--rose); }

  /* ── TWO-COL ── */
  .dash-cols {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 20px;
    margin-bottom: 20px;
  }

  /* ── PANEL ── */
  .dash-panel {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  }

  .dash-panel-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid var(--border);
  }

  .dash-panel-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 19px;
    font-weight: 700;
    color: var(--ink);
  }

  .dash-panel-action {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--green);
    cursor: pointer;
    border: none;
    background: none;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  /* ── APPOINTMENTS ── */
  .dash-appt-list {
    list-style: none;
  }

  .dash-appt {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 22px;
    border-bottom: 1px solid var(--border);
    transition: background 0.15s;
  }

  .dash-appt:last-child { border-bottom: none; }
  .dash-appt:hover { background: var(--bg); }

  .dash-appt-time {
    font-family: 'Cormorant Garamond', serif;
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    min-width: 52px;
  }

  .dash-appt-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dash-appt-dot.green { background: var(--green); }
  .dash-appt-dot.blue  { background: var(--blue); }
  .dash-appt-dot.amber { background: var(--amber); }

  .dash-appt-info { flex: 1; min-width: 0; }

  .dash-appt-name {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }

  .dash-appt-type {
    font-size: 12px;
    color: var(--muted);
    margin-top: 1px;
  }

  .dash-appt-tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 3px 10px;
    flex-shrink: 0;
  }

  .dash-appt-tag.green { background: var(--green-light); color: var(--green); }
  .dash-appt-tag.blue  { background: var(--blue-light);  color: var(--blue); }
  .dash-appt-tag.amber { background: var(--amber-light); color: var(--amber); }

  /* ── QUICK LINKS ── */
  .dash-quick-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 18px;
  }

  .dash-quick-btn {
    border: 1.5px solid var(--border);
    border-radius: 13px;
    padding: 16px 14px;
    background: var(--bg);
    cursor: pointer;
    text-align: left;
    transition: border-color 0.18s, background 0.18s, transform 0.15s;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }

  .dash-quick-btn:hover {
    border-color: var(--border2);
    background: var(--white);
    transform: translateY(-1px);
  }

  .dash-quick-icon {
    font-size: 22px;
    margin-bottom: 8px;
    display: block;
  }

  .dash-quick-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--ink2);
    display: block;
  }

  .dash-quick-sub {
    font-size: 11px;
    color: var(--muted);
    margin-top: 2px;
    display: block;
  }

  /* ── NOTICE BANNER ── */
  .dash-notice {
    background: var(--green-light);
    border: 1px solid var(--green-mid);
    border-radius: 14px;
    padding: 16px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 13.5px;
    color: var(--ink2);
    font-weight: 400;
    line-height: 1.5;
  }

  .dash-notice-icon { font-size: 20px; flex-shrink: 0; }

  .dash-notice strong {
    font-weight: 700;
    color: var(--green);
  }
`;

function DoctorDashboard() {
  return (
    <>
      <style>{styles}</style>
      <div className="dash-root">

        {/* Top Bar */}
        <div className="dash-topbar">
          <div>
            <div className="dash-greeting-label">Good Morning</div>
            <h1 className="dash-h1">Doctor Dashboard</h1>
            <p className="dash-subtitle">Welcome to your dashboard. Use the sidebar to navigate.</p>
          </div>
          <div className="dash-avatar-block">
            <div className="dash-avatar">DR</div>
            <div>
              <div className="dash-avatar-name">Dr. Sharma</div>
              <div className="dash-avatar-role">General Physician</div>
            </div>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="dash-stats">
          <div className="dash-stat">
            <div className="dash-stat-icon green">🗓️</div>
            <div className="dash-stat-val">12</div>
            <div className="dash-stat-lbl">Today's Appointments</div>
            <div className="dash-stat-change up">↑ 3 from yesterday</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon blue">🧑‍⚕️</div>
            <div className="dash-stat-val">84</div>
            <div className="dash-stat-lbl">Total Patients</div>
            <div className="dash-stat-change up">↑ 5 this week</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon amber">⏳</div>
            <div className="dash-stat-val">4</div>
            <div className="dash-stat-lbl">Pending Reports</div>
            <div className="dash-stat-change down">↑ 2 new today</div>
          </div>
          <div className="dash-stat">
            <div className="dash-stat-icon rose">💊</div>
            <div className="dash-stat-val">31</div>
            <div className="dash-stat-lbl">Prescriptions</div>
            <div className="dash-stat-change up">↑ 8 this month</div>
          </div>
        </div>

        {/* Two Column */}
        <div className="dash-cols">

          {/* Appointments */}
          <div className="dash-panel">
            <div className="dash-panel-hd">
              <span className="dash-panel-title">Today's Appointments</span>
              <button className="dash-panel-action">View All →</button>
            </div>
            <ul className="dash-appt-list">
              {[
                { time: "09:00", name: "Riya Kapoor",   type: "General Checkup",    color: "green", tag: "Confirmed" },
                { time: "10:30", name: "Arjun Mehta",   type: "Follow-up",          color: "blue",  tag: "In Progress" },
                { time: "11:45", name: "Sunita Verma",  type: "Blood Pressure",     color: "green", tag: "Confirmed" },
                { time: "02:00", name: "Karan Singh",   type: "Diabetes Review",    color: "amber", tag: "Pending" },
                { time: "03:30", name: "Meena Patel",   type: "Post-Op Checkup",    color: "green", tag: "Confirmed" },
              ].map((a, i) => (
                <li key={i} className="dash-appt">
                  <span className="dash-appt-time">{a.time}</span>
                  <span className={`dash-appt-dot ${a.color}`} />
                  <div className="dash-appt-info">
                    <div className="dash-appt-name">{a.name}</div>
                    <div className="dash-appt-type">{a.type}</div>
                  </div>
                  <span className={`dash-appt-tag ${a.color}`}>{a.tag}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="dash-panel">
            <div className="dash-panel-hd">
              <span className="dash-panel-title">Quick Actions</span>
            </div>
            <div className="dash-quick-grid">
              {[
                { icon: "📋", label: "New Prescription",  sub: "Write & send Rx" },
                { icon: "🔬", label: "Lab Reports",       sub: "View results" },
                { icon: "👤", label: "Add Patient",       sub: "Register new" },
                { icon: "📅", label: "Schedule",          sub: "Manage calendar" },
                { icon: "💬", label: "Messages",          sub: "2 unread" },
                { icon: "📂", label: "Patient Records",   sub: "Search history" },
              ].map((q, i) => (
                <button key={i} className="dash-quick-btn">
                  <span className="dash-quick-icon">{q.icon}</span>
                  <span className="dash-quick-label">{q.label}</span>
                  <span className="dash-quick-sub">{q.sub}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Notice */}
        <div className="dash-notice">
          <span className="dash-notice-icon">💡</span>
          <span><strong>Tip:</strong> Use the sidebar to navigate between Appointments, Patients, Prescriptions, and Reports sections.</span>
        </div>

      </div>
    </>
  );
}

export default DoctorDashboard;