// import { Link, useNavigate } from "react-router-dom";

// function Layout({ children }) {
//     const role = localStorage.getItem("role");
//     const navigate = useNavigate();

//     const logout = () => {
//         localStorage.removeItem("token");
//         localStorage.removeItem("role");
//         navigate("/");
//     };

//     return (
//         <div className="d-flex" style={{ minHeight: "100vh" }}>

//             {/* Sidebar */}
//             <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
//                 <h4>MedPredict</h4>
//                 <hr />

//                 {role === "admin" && (
//                     <>
//                         <Link className="nav-link text-white" to="/admin">
//                             Dashboard
//                         </Link>
//                         <Link className="nav-link text-white" to="/admin/patients">
//                             Patients
//                         </Link>
//                         <Link className="nav-link text-white" to="/admin/doctors">
//                             Doctors
//                         </Link>
//                         <Link className="nav-link text-white" to="/admin/appointments">
//                             Appointments
//                         </Link>
//                         <Link className="nav-link text-white" to="/admin/beds">
//                             Beds
//                         </Link>
//                     </>
//                 )}

//                 {role === "doctor" && (
//                     <>
//                         <Link className="nav-link text-white" to="/doctor">
//                             Dashboard
//                         </Link>
//                         <Link className="nav-link text-white" to="/doctor/patients">
//                             My Patients
//                         </Link>
//                         <Link className="nav-link text-white" to="/doctor/appointments">
//                             My Appointments
//                         </Link>
//                     </>
//                 )}

//                 {role === "reception" && (
//                     <>
//                         <Link className="nav-link text-white" to="/reception">
//                             Dashboard
//                         </Link>
//                         <Link className="nav-link text-white" to="/reception/patients">
//                             Patients
//                         </Link>
//                         <Link className="nav-link text-white" to="/reception/appointments">
//                             Appointments
//                         </Link>
//                         <Link className="nav-link text-white" to="/reception/beds">
//                             Beds
//                         </Link>
//                     </>
//                 )}

//                 <hr />
//                 <button className="btn btn-danger w-100" onClick={logout}>
//                     Logout
//                 </button>
//             </div>

//             {/* Main Content */}
//             <div className="flex-grow-1">

//                 {/* Navbar */}
//                 <nav className="navbar navbar-light bg-light shadow-sm px-3">
//                     <span className="navbar-brand">Welcome, {role}</span>
//                 </nav>

//                 <div className="p-4">{children}</div>
//             </div>
//         </div>
//     );
// }

// export default Layout;































import { Link, useNavigate } from "react-router-dom";

const NAV_ITEMS = {
    admin: [
        {
            to: "/admin", label: "Dashboard",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
        },
        {
            to: "/admin/patients", label: "Patients",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
        },
        {
            to: "/admin/doctors", label: "Doctors",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" /><path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="10" y1="20" x2="14" y2="20" /></svg>,
        },
        {
            to: "/admin/appointments", label: "Appointments",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
        },
        {
            to: "/admin/beds", label: "Beds",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" /><path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" /><path d="M6 11V9" /><path d="M18 11V9" /></svg>,
        },
    ],
    doctor: [
        {
            to: "/doctor", label: "Dashboard",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
        },
        {
            to: "/doctor/patients", label: "My Patients",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
        },
        {
            to: "/doctor/appointments", label: "My Appointments",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
        },
    ],
    reception: [
        {
            to: "/reception", label: "Dashboard",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
        },
        {
            to: "/reception/patients", label: "Patients",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
        },
        {
            to: "/reception/appointments", label: "Appointments",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
        },
        {
            to: "/reception/beds", label: "Beds",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" /><path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" /></svg>,
        },
    ],
};

const ROLE_LABELS = {
    admin: "Administrator",
    doctor: "Doctor",
    reception: "Receptionist",
};

const ROLE_COLORS = {
    admin: { bg: "#eef2ff", text: "#3730a3", dot: "#6366f1" },
    doctor: { bg: "#ecfdf5", text: "#065f46", dot: "#10b981" },
    reception: { bg: "#fff7ed", text: "#92400e", dot: "#f59e0b" },
};

function Layout({ children }) {
    const role = localStorage.getItem("role");
    const navigate = useNavigate();
    const navItems = NAV_ITEMS[role] || [];
    const roleColor = ROLE_COLORS[role] || ROLE_COLORS.admin;
    const currentPath = window.location.pathname;

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    const initials = (ROLE_LABELS[role] || "User")
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Fira+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .ly-root {
          display: flex;
          min-height: 100vh;
          background: #f5f6fa;
          font-family: 'Outfit', sans-serif;
        }

        /* ── Sidebar ── */
        .ly-sidebar {
          width: 248px;
          flex-shrink: 0;
          background: #ffffff;
          border-right: 1px solid #e8eaf0;
          display: flex;
          flex-direction: column;
          padding: 0;
        }

        .ly-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 22px 20px 20px;
          border-bottom: 1px solid #f0f1f6;
        }

        .ly-brand-icon {
          width: 34px;
          height: 34px;
          background: #0f172a;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ly-brand-icon svg {
          width: 17px;
          height: 17px;
          stroke: #fff;
        }

        .ly-brand-name {
          font-size: 15px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.3px;
        }

        .ly-brand-sub {
          font-size: 10px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.06em;
          margin-top: 1px;
        }

        .ly-nav {
          flex: 1;
          padding: 16px 12px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ly-nav-label {
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.1em;
          color: #cbd5e1;
          text-transform: uppercase;
          font-family: 'Fira Mono', monospace;
          padding: 0 8px;
          margin-bottom: 6px;
        }

        .ly-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 10px;
          border-radius: 9px;
          text-decoration: none;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 400;
          transition: background 0.13s, color 0.13s;
          position: relative;
        }

        .ly-nav-link:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        .ly-nav-link.active {
          background: #f1f5f9;
          color: #0f172a;
          font-weight: 500;
        }

        .ly-nav-link.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 18px;
          background: #6366f1;
          border-radius: 0 2px 2px 0;
        }

        .ly-nav-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          flex-shrink: 0;
          background: transparent;
          transition: background 0.13s;
        }

        .ly-nav-link:hover .ly-nav-icon,
        .ly-nav-link.active .ly-nav-icon {
          background: #e8eaf0;
        }

        .ly-sidebar-footer {
          padding: 12px;
          border-top: 1px solid #f0f1f6;
        }

        .ly-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 10px;
          background: transparent;
          border: none;
          border-radius: 9px;
          color: #ef4444;
          font-size: 13.5px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.13s;
          text-align: left;
        }

        .ly-logout:hover {
          background: #fef2f2;
        }

        .ly-logout-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #fee2e2;
          flex-shrink: 0;
        }

        /* ── Main area ── */
        .ly-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .ly-topbar {
          height: 60px;
          background: #ffffff;
          border-bottom: 1px solid #e8eaf0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 28px;
          flex-shrink: 0;
        }

        .ly-topbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ly-topbar-greeting {
          font-size: 13px;
          color: #94a3b8;
          font-weight: 400;
        }

        .ly-topbar-name {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .ly-role-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 3px 10px 3px 7px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 500;
          font-family: 'Outfit', sans-serif;
        }

        .ly-role-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .ly-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #0f172a;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .ly-content {
          flex: 1;
          padding: 28px;
          overflow-y: auto;
        }
      `}</style>

            <div className="ly-root">
                {/* Sidebar */}
                <aside className="ly-sidebar">
                    <div className="ly-brand">
                        <div className="ly-brand-icon">
                            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                        </div>
                        <div>
                            <div className="ly-brand-name">MedPredict</div>
                            <div className="ly-brand-sub">HMS v2.0</div>
                        </div>
                    </div>

                    <nav className="ly-nav">
                        <div className="ly-nav-label">Navigation</div>
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                className={`ly-nav-link${currentPath === item.to ? " active" : ""}`}
                                to={item.to}
                            >
                                <span className="ly-nav-icon">{item.icon}</span>
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="ly-sidebar-footer">
                        <button className="ly-logout" onClick={logout}>
                            <span className="ly-logout-icon">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </span>
                            Logout
                        </button>
                    </div>
                </aside>

                {/* Main content */}
                <div className="ly-main">
                    <nav className="ly-topbar">
                        <div className="ly-topbar-left">
                            <span className="ly-topbar-greeting">Welcome back,</span>
                            <span className="ly-topbar-name">{ROLE_LABELS[role] || role}</span>
                            <span
                                className="ly-role-badge"
                                style={{ background: roleColor.bg, color: roleColor.text }}
                            >
                                <span className="ly-role-dot" style={{ background: roleColor.dot }} />
                                {role}
                            </span>
                        </div>
                        <div className="ly-avatar">{initials}</div>
                    </nav>

                    <div className="ly-content">{children}</div>
                </div>
            </div>
        </>
    );
}

export default Layout;