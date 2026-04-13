// import { Link } from "react-router-dom";

// function ReceptionDashboard() {
//   return (
//     <div>
//       <h1>Reception Dashboard</h1>
//       <Link to="/reception/patients">Manage Patients</Link>
//       <Link to="/reception/appointments">Manage Appointments</Link>
//     </div>
//   );
// }

// export default ReceptionDashboard;








import { Link } from "react-router-dom";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,400;0,600;0,700;1,400&family=Nunito:wght@300;400;500;600;700;800&display=swap');

  :root {
    --bg: #f6f7f9;
    --white: #ffffff;
    --border: #e9ecf2;
    --border2: #d5dae6;
    --ink: #0e1521;
    --ink2: #3d4a5c;
    --muted: #8f9baf;
    --violet: #6c47e8;
    --violet-light: #f0ecff;
    --violet-mid: #c8b8f8;
    --cyan: #0891b2;
    --cyan-light: #ecfeff;
    --orange: #ea580c;
    --orange-light: #fff7ed;
    --emerald: #059669;
    --emerald-light: #ecfdf5;
    --rose: #e11d48;
    --rose-light: #fff1f2;
    --yellow: #ca8a04;
    --yellow-light: #fefce8;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .rec-root {
    font-family: 'Nunito', sans-serif;
    background: var(--bg);
    min-height: 100vh;
    padding: 48px 40px;
    max-width: 1020px;
    margin: 0 auto;
  }

  /* ── HEADER ── */
  .rec-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 48px;
  }

  .rec-header-left {}

  .rec-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: var(--violet-light);
    border: 1px solid var(--violet-mid);
    border-radius: 999px;
    padding: 4px 14px;
    font-size: 10.5px;
    font-weight: 800;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--violet);
    margin-bottom: 14px;
  }

  .rec-h1 {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 46px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
    letter-spacing: -0.02em;
  }

  .rec-h1 em {
    font-style: italic;
    color: var(--violet);
  }

  .rec-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .rec-date-box {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 14px 20px;
    text-align: right;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }

  .rec-date-day {
    font-family: 'Fraunces', serif;
    font-size: 28px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
  }

  .rec-date-meta {
    font-size: 11px;
    color: var(--muted);
    font-weight: 600;
    letter-spacing: 0.06em;
    margin-top: 3px;
  }

  .rec-status-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--emerald);
    box-shadow: 0 0 0 3px rgba(5,150,105,0.2);
    flex-shrink: 0;
  }

  /* ── STATS ── */
  .rec-stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
    margin-bottom: 28px;
  }

  .rec-stat {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 18px;
    padding: 22px 20px 18px;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
    transition: transform 0.18s, box-shadow 0.18s;
    position: relative;
    overflow: hidden;
  }

  .rec-stat::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 3px;
    border-radius: 0 0 18px 18px;
  }

  .rec-stat.violet::after { background: var(--violet); }
  .rec-stat.cyan::after   { background: var(--cyan); }
  .rec-stat.orange::after { background: var(--orange); }
  .rec-stat.emerald::after { background: var(--emerald); }

  .rec-stat:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.08);
  }

  .rec-stat-icon {
    font-size: 22px;
    margin-bottom: 12px;
    display: block;
  }

  .rec-stat-num {
    font-family: 'Fraunces', serif;
    font-size: 38px;
    font-weight: 700;
    color: var(--ink);
    line-height: 1;
    display: block;
  }

  .rec-stat-label {
    font-size: 12px;
    color: var(--muted);
    font-weight: 600;
    margin-top: 5px;
    display: block;
    letter-spacing: 0.02em;
  }

  .rec-stat-trend {
    font-size: 11px;
    font-weight: 700;
    margin-top: 10px;
    display: block;
  }

  .rec-stat-trend.up   { color: var(--emerald); }
  .rec-stat-trend.warn { color: var(--orange); }

  /* ── GRID ── */
  .rec-grid {
    display: grid;
    grid-template-columns: 1fr 320px;
    gap: 18px;
    margin-bottom: 18px;
  }

  /* ── PANEL ── */
  .rec-panel {
    background: var(--white);
    border: 1px solid var(--border);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  }

  .rec-panel-hd {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 22px;
    border-bottom: 1px solid var(--border);
  }

  .rec-panel-title {
    font-family: 'Fraunces', serif;
    font-size: 18px;
    font-weight: 700;
    color: var(--ink);
  }

  .rec-panel-link {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--violet);
    text-decoration: none;
    font-family: 'Nunito', sans-serif;
  }

  .rec-panel-link:hover { text-decoration: underline; }

  /* ── QUEUE TABLE ── */
  .rec-queue {
    list-style: none;
  }

  .rec-queue-item {
    display: grid;
    grid-template-columns: 36px 1fr auto auto;
    align-items: center;
    gap: 14px;
    padding: 13px 22px;
    border-bottom: 1px solid var(--border);
    transition: background 0.14s;
  }

  .rec-queue-item:last-child { border-bottom: none; }
  .rec-queue-item:hover { background: var(--bg); }

  .rec-queue-num {
    font-family: 'Fraunces', serif;
    font-size: 14px;
    font-weight: 600;
    color: var(--muted);
    text-align: center;
  }

  .rec-queue-name {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--ink);
  }

  .rec-queue-sub {
    font-size: 11.5px;
    color: var(--muted);
    font-weight: 500;
    margin-top: 1px;
  }

  .rec-queue-time {
    font-size: 12px;
    font-weight: 700;
    color: var(--ink2);
    white-space: nowrap;
  }

  .rec-badge {
    font-size: 10px;
    font-weight: 800;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    border-radius: 999px;
    padding: 3px 10px;
    white-space: nowrap;
  }

  .rec-badge.green  { background: var(--emerald-light); color: var(--emerald); }
  .rec-badge.violet { background: var(--violet-light);  color: var(--violet); }
  .rec-badge.orange { background: var(--orange-light);  color: var(--orange); }
  .rec-badge.cyan   { background: var(--cyan-light);    color: var(--cyan); }
  .rec-badge.yellow { background: var(--yellow-light);  color: var(--yellow); }

  /* ── QUICK NAV ── */
  .rec-nav-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 16px;
  }

  .rec-nav-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 16px 14px;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.16s, background 0.16s, transform 0.14s;
    font-family: 'Nunito', sans-serif;
    text-decoration: none;
  }

  .rec-nav-btn:hover {
    border-color: var(--violet-mid);
    background: var(--violet-light);
    transform: translateY(-1px);
  }

  .rec-nav-icon { font-size: 20px; }

  .rec-nav-label {
    font-size: 12.5px;
    font-weight: 800;
    color: var(--ink2);
  }

  .rec-nav-sub {
    font-size: 11px;
    color: var(--muted);
    font-weight: 500;
  }

  /* ── ALERT BAR ── */
  .rec-alert {
    background: var(--white);
    border: 1px solid var(--border);
    border-left: 4px solid var(--violet);
    border-radius: 14px;
    padding: 16px 22px;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 13.5px;
    color: var(--ink2);
    line-height: 1.5;
    box-shadow: 0 1px 4px rgba(0,0,0,0.03);
  }

  .rec-alert-icon { font-size: 20px; flex-shrink: 0; }
  .rec-alert strong { font-weight: 800; color: var(--violet); }
`;

const today = new Date();
const dayName = today.toLocaleDateString("en-IN", { weekday: "long" });
const dateStr = today.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });

function ReceptionDashboard() {
  return (
    <>
      <style>{styles}</style>
      <div className="rec-root">

        {/* Header */}
        <div className="rec-header">
          <div className="rec-header-left">
            <div className="rec-tag">⚡ Live</div>
            <h1 className="rec-h1">Reception <em>Dashboard</em></h1>
          </div>
          <div className="rec-header-right">
            <div className="rec-status-dot" />
            <div className="rec-date-box">
              <div className="rec-date-day">{today.getDate()}</div>
              <div className="rec-date-meta">{dayName}, {dateStr}</div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="rec-stats">
          {[
            { icon: "🗓️", num: "18", label: "Appointments Today", trend: "↑ 4 more than usual", trendType: "up",   color: "violet" },
            { icon: "⏳", num: "6",  label: "Waiting Patients",   trend: "↑ Avg. wait: 12 min",  trendType: "warn", color: "cyan" },
            { icon: "✅", num: "9",  label: "Checked In",         trend: "↑ 3 in last hour",     trendType: "up",   color: "emerald" },
            { icon: "📋", num: "3",  label: "Pending Tasks",      trend: "↑ 1 urgent",           trendType: "warn", color: "orange" },
          ].map((s, i) => (
            <div key={i} className={`rec-stat ${s.color}`}>
              <span className="rec-stat-icon">{s.icon}</span>
              <span className="rec-stat-num">{s.num}</span>
              <span className="rec-stat-label">{s.label}</span>
              <span className={`rec-stat-trend ${s.trendType}`}>{s.trend}</span>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="rec-grid">

          {/* Patient Queue */}
          <div className="rec-panel">
            <div className="rec-panel-hd">
              <span className="rec-panel-title">Today's Patient Queue</span>
              <Link to="/appointments" className="rec-panel-link">View All →</Link>
            </div>
            <ul className="rec-queue">
              {[
                { name: "Aarav Sharma",   sub: "Dr. Mehta · General",      time: "09:00", badge: "Checked In", color: "green" },
                { name: "Priya Kapoor",   sub: "Dr. Iyer · Cardiology",     time: "09:30", badge: "Waiting",    color: "violet" },
                { name: "Rajan Verma",    sub: "Dr. Singh · Ortho",         time: "10:00", badge: "Waiting",    color: "violet" },
                { name: "Sunita Mishra",  sub: "Dr. Mehta · Follow-up",     time: "10:30", badge: "Confirmed",  color: "cyan" },
                { name: "Kiran Patel",    sub: "Dr. Iyer · Diabetes",       time: "11:00", badge: "Pending",    color: "orange" },
                { name: "Deepak Nair",    sub: "Dr. Singh · Post-Op",       time: "11:30", badge: "Confirmed",  color: "cyan" },
              ].map((p, i) => (
                <li key={i} className="rec-queue-item">
                  <span className="rec-queue-num">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <div className="rec-queue-name">{p.name}</div>
                    <div className="rec-queue-sub">{p.sub}</div>
                  </div>
                  <span className="rec-queue-time">{p.time}</span>
                  <span className={`rec-badge ${p.color}`}>{p.badge}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Nav */}
          <div className="rec-panel">
            <div className="rec-panel-hd">
              <span className="rec-panel-title">Quick Actions</span>
            </div>
            <div className="rec-nav-grid">
              {[
                { icon: "➕", label: "New Appointment", sub: "Book a slot",      to: "/appointments/new" },
                { icon: "👤", label: "Register Patient", sub: "Add to system",   to: "/patients/new" },
                { icon: "🔍", label: "Find Patient",    sub: "Search records",   to: "/patients" },
                { icon: "💊", label: "Prescriptions",   sub: "View & print",     to: "/prescriptions" },
                { icon: "🧾", label: "Billing",         sub: "Invoices & dues",  to: "/billing" },
                { icon: "📞", label: "Contact Doctors", sub: "Directory",        to: "/doctors" },
              ].map((n, i) => (
                <Link key={i} to={n.to} className="rec-nav-btn">
                  <span className="rec-nav-icon">{n.icon}</span>
                  <span className="rec-nav-label">{n.label}</span>
                  <span className="rec-nav-sub">{n.sub}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Alert */}
        <div className="rec-alert">
          <span className="rec-alert-icon">🔔</span>
          <span><strong>Reminder:</strong> Use the sidebar to navigate between Appointments, Patients, Billing, and Doctor sections of the system.</span>
        </div>

      </div>
    </>
  );
}

export default ReceptionDashboard;