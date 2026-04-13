// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Appointments() {
//     const [appointments, setAppointments] = useState([]);
//     const [patients, setPatients] = useState([]);
//     const [doctors, setDoctors] = useState([]);

//     const [formData, setFormData] = useState({
//         patient: "",
//         doctor: "",
//         date: "",
//         time: ""
//     });

//     const role = localStorage.getItem("role");

//     // Fetch Data
//     const fetchAppointments = async () => {
//         const res = await API.get("/appointments");
//         setAppointments(res.data);
//     };

//     const fetchPatients = async () => {
//         const res = await API.get("/patients");
//         setPatients(res.data);
//     };

//     const fetchDoctors = async () => {
//         const res = await API.get("/users/doctors");
//         setDoctors(res.data);
//     };

//     useEffect(() => {
//         fetchAppointments();
//         if (role === "admin" || role === "reception") {
//             fetchPatients();
//             fetchDoctors();
//         }
//     }, []);

//     // Create Appointment
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         await API.post("/appointments", formData);
//         fetchAppointments();
//         setFormData({ patient: "", doctor: "", date: "", time: "" });
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Appointments</h2>

//             {(role === "admin" || role === "reception") && (
//                 <form onSubmit={handleSubmit}>
//                     <select
//                         value={formData.patient}
//                         onChange={(e) =>
//                             setFormData({ ...formData, patient: e.target.value })
//                         }
//                         required
//                     >
//                         <option value="">Select Patient</option>
//                         {patients.map((p) => (
//                             <option key={p._id} value={p._id}>
//                                 {p.name}
//                             </option>
//                         ))}
//                     </select>

//                     <br /><br />

//                     <select
//                         value={formData.doctor}
//                         onChange={(e) =>
//                             setFormData({ ...formData, doctor: e.target.value })
//                         }
//                         required
//                     >
//                         <option value="">Select Doctor</option>
//                         {doctors.map((d) => (
//                             <option key={d._id} value={d._id}>
//                                 {d.name}
//                             </option>
//                         ))}
//                     </select>

//                     <br /><br />

//                     <input
//                         type="date"
//                         value={formData.date}
//                         onChange={(e) =>
//                             setFormData({ ...formData, date: e.target.value })
//                         }
//                         required
//                     />

//                     <br /><br />

//                     <input
//                         type="time"
//                         value={formData.time}
//                         onChange={(e) =>
//                             setFormData({ ...formData, time: e.target.value })
//                         }
//                         required
//                     />

//                     <br /><br />
//                     <button type="submit">Create Appointment</button>
//                 </form>
//             )}

//             <hr />

//             <h3>Appointment List</h3>

//             <ul>
//                 {appointments.map((a) => (
//                     <li key={a._id}>
//                         {a.patient?.name} | {a.doctor?.name} | {a.date} | {a.time} | {a.status}

//                         {(role === "doctor" || role === "admin") && a.status === "Pending" && (
//                             <button
//                                 onClick={async () => {
//                                     await API.put(`/appointments/${a._id}/status`, {
//                                         status: "Completed",
//                                     });
//                                     fetchAppointments();
//                                 }}
//                             >
//                                 Mark Completed
//                             </button>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Appointments;

























import { useEffect, useState } from "react";
import API from "../api/axios";

function Appointments() {
    const [appointments, setAppointments] = useState([]);
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    const [formData, setFormData] = useState({
        patient: "",
        doctor: "",
        date: "",
        time: ""
    });

    const role = localStorage.getItem("role");

    const fetchAppointments = async () => {
        const res = await API.get("/appointments");
        setAppointments(res.data);
    };

    const fetchPatients = async () => {
        const res = await API.get("/patients");
        setPatients(res.data);
    };

    const fetchDoctors = async () => {
        const res = await API.get("/users/doctors");
        setDoctors(res.data);
    };

    useEffect(() => {
        fetchAppointments();
        if (role === "admin" || role === "reception") {
            fetchPatients();
            fetchDoctors();
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await API.post("/appointments", formData);
        fetchAppointments();
        setFormData({ patient: "", doctor: "", date: "", time: "" });
    };

    const pendingCount = appointments.filter((a) => a.status === "Pending").length;
    const completedCount = appointments.filter((a) => a.status === "Completed").length;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

                .ap-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

                /* ── Page header ── */
                .ap-page-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 24px;
                }

                .ap-page-title {
                    font-size: 22px;
                    font-weight: 600;
                    color: #0f172a;
                    letter-spacing: -0.4px;
                    margin: 0 0 4px;
                }

                .ap-page-sub {
                    font-size: 12px;
                    color: #94a3b8;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-badges {
                    display: flex;
                    gap: 8px;
                }

                .ap-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    border-radius: 8px;
                    padding: 6px 13px;
                    font-size: 12.5px;
                    font-weight: 600;
                    font-family: 'Fira Mono', monospace;
                    border: 1px solid;
                }

                /* ── Stat mini-row ── */
                .ap-stats-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 14px;
                    margin-bottom: 24px;
                }

                .ap-stat {
                    background: #fff;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 16px 18px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                }

                .ap-stat-icon {
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .ap-stat-icon svg { width: 18px; height: 18px; }

                .ap-stat-value {
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    letter-spacing: -0.5px;
                    line-height: 1;
                    margin-bottom: 2px;
                }

                .ap-stat-label {
                    font-size: 11.5px;
                    color: #94a3b8;
                    font-family: 'Fira Mono', monospace;
                }

                /* ── Form card ── */
                .ap-form-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 22px 24px;
                    margin-bottom: 24px;
                }

                .ap-form-card-header {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 20px;
                }

                .ap-form-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #f59e0b;
                    flex-shrink: 0;
                }

                .ap-form-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #0f172a;
                }

                .ap-form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-bottom: 16px;
                }

                @media (max-width: 640px) { .ap-form-grid { grid-template-columns: 1fr; } }

                .ap-form-group { display: flex; flex-direction: column; gap: 6px; }

                .ap-label {
                    font-size: 11px;
                    font-weight: 500;
                    color: #64748b;
                    font-family: 'Fira Mono', monospace;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                .ap-select, .ap-input {
                    height: 38px;
                    padding: 0 12px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 9px;
                    font-size: 13.5px;
                    font-family: 'Outfit', sans-serif;
                    color: #0f172a;
                    outline: none;
                    transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
                    width: 100%;
                }

                .ap-select:focus, .ap-input:focus {
                    border-color: #f59e0b;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(245,158,11,0.08);
                }

                .ap-input[type="date"]::-webkit-calendar-picker-indicator,
                .ap-input[type="time"]::-webkit-calendar-picker-indicator {
                    opacity: 0.4;
                    cursor: pointer;
                }

                .ap-submit-row {
                    display: flex;
                    justify-content: flex-end;
                }

                .ap-submit-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 9px 22px;
                    background: #0f172a;
                    color: #fff;
                    border: none;
                    border-radius: 9px;
                    font-size: 13.5px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.15s, transform 0.1s;
                }

                .ap-submit-btn:hover { background: #1e293b; }
                .ap-submit-btn:active { transform: scale(0.98); }
                .ap-submit-btn svg { width: 14px; height: 14px; stroke: currentColor; flex-shrink: 0; }

                /* ── Table card ── */
                .ap-table-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    overflow: hidden;
                }

                .ap-table-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 18px 22px;
                    border-bottom: 1px solid #f1f5f9;
                }

                .ap-table-title { font-size: 14px; font-weight: 600; color: #0f172a; }

                .ap-section-label {
                    font-size: 10.5px;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    color: #cbd5e1;
                    text-transform: uppercase;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

                .ap-table thead th {
                    text-align: left;
                    padding: 11px 22px;
                    font-size: 10.5px;
                    font-weight: 500;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    color: #94a3b8;
                    font-family: 'Fira Mono', monospace;
                    background: #f8fafc;
                    border-bottom: 1px solid #f1f5f9;
                }

                .ap-table tbody tr {
                    border-bottom: 1px solid #f8fafc;
                    transition: background 0.1s;
                }

                .ap-table tbody tr:last-child { border-bottom: none; }
                .ap-table tbody tr:hover { background: #f8fafc; }

                .ap-table td {
                    padding: 13px 22px;
                    color: #334155;
                    vertical-align: middle;
                }

                .ap-table td.bold { font-weight: 500; color: #0f172a; }

                .ap-name-cell {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                }

                .ap-dot-avatar {
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 11px;
                    font-weight: 600;
                    flex-shrink: 0;
                }

                .ap-datetime {
                    display: flex;
                    flex-direction: column;
                    gap: 1px;
                }

                .ap-date-val {
                    font-size: 13px;
                    font-weight: 500;
                    color: #0f172a;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-time-val {
                    font-size: 11px;
                    color: #94a3b8;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-status-pending {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: #fffbeb;
                    color: #92400e;
                    border: 1px solid #fde68a;
                    padding: 3px 10px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 500;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-status-completed {
                    display: inline-flex;
                    align-items: center;
                    gap: 5px;
                    background: #ecfdf5;
                    color: #065f46;
                    border: 1px solid #a7f3d0;
                    padding: 3px 10px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 500;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-status-dot {
                    width: 5px;
                    height: 5px;
                    border-radius: 50%;
                    flex-shrink: 0;
                }

                .ap-complete-btn {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    padding: 6px 13px;
                    background: #ecfdf5;
                    color: #065f46;
                    border: 1px solid #a7f3d0;
                    border-radius: 7px;
                    font-size: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.13s;
                }

                .ap-complete-btn:hover { background: #d1fae5; }
                .ap-complete-btn svg { width: 12px; height: 12px; stroke: currentColor; }

                .ap-no-action {
                    font-size: 12px;
                    color: #e2e8f0;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-empty {
                    text-align: center;
                    padding: 48px 20px;
                    color: #94a3b8;
                    font-size: 13.5px;
                    font-family: 'Fira Mono', monospace;
                }

                .ap-empty svg {
                    width: 36px;
                    height: 36px;
                    stroke: #e2e8f0;
                    margin-bottom: 10px;
                    display: block;
                    margin-inline: auto;
                }
            `}</style>

            <div className="ap-root">
                {/* Page Header */}
                <div className="ap-page-header">
                    <div>
                        <h2 className="ap-page-title">Appointments</h2>
                        <p className="ap-page-sub">Schedule and track patient appointments</p>
                    </div>
                    <div className="ap-badges">
                        <div className="ap-badge" style={{ background: "#fffbeb", color: "#92400e", borderColor: "#fde68a" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                            {pendingCount} pending
                        </div>
                        <div className="ap-badge" style={{ background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0" }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            {completedCount} done
                        </div>
                    </div>
                </div>

                {/* Mini Stats */}
                <div className="ap-stats-row">
                    <div className="ap-stat">
                        <div className="ap-stat-icon" style={{ background: "#fffbeb", color: "#f59e0b" }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        <div>
                            <div className="ap-stat-value">{appointments.length}</div>
                            <div className="ap-stat-label">Total</div>
                        </div>
                    </div>
                    <div className="ap-stat">
                        <div className="ap-stat-icon" style={{ background: "#fffbeb", color: "#f59e0b" }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                            </svg>
                        </div>
                        <div>
                            <div className="ap-stat-value">{pendingCount}</div>
                            <div className="ap-stat-label">Pending</div>
                        </div>
                    </div>
                    <div className="ap-stat">
                        <div className="ap-stat-icon" style={{ background: "#ecfdf5", color: "#10b981" }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        </div>
                        <div>
                            <div className="ap-stat-value">{completedCount}</div>
                            <div className="ap-stat-label">Completed</div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                {(role === "admin" || role === "reception") && (
                    <div className="ap-form-card">
                        <div className="ap-form-card-header">
                            <span className="ap-form-dot" />
                            <span className="ap-form-title">Create New Appointment</span>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="ap-form-grid">
                                <div className="ap-form-group">
                                    <label className="ap-label">Patient</label>
                                    <select
                                        className="ap-select"
                                        value={formData.patient}
                                        onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Patient</option>
                                        {patients.map((p) => (
                                            <option key={p._id} value={p._id}>{p.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="ap-form-group">
                                    <label className="ap-label">Doctor</label>
                                    <select
                                        className="ap-select"
                                        value={formData.doctor}
                                        onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Doctor</option>
                                        {doctors.map((d) => (
                                            <option key={d._id} value={d._id}>{d.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="ap-form-group">
                                    <label className="ap-label">Date</label>
                                    <input
                                        className="ap-input"
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="ap-form-group">
                                    <label className="ap-label">Time</label>
                                    <input
                                        className="ap-input"
                                        type="time"
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="ap-submit-row">
                                <button className="ap-submit-btn" type="submit">
                                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="12" y1="11" x2="12" y2="17" />
                                        <line x1="9" y1="14" x2="15" y2="14" />
                                    </svg>
                                    Create Appointment
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table */}
                <div className="ap-table-card">
                    <div className="ap-table-header">
                        <span className="ap-table-title">Appointment List</span>
                        <span className="ap-section-label">All Records</span>
                    </div>

                    {appointments.length === 0 ? (
                        <div className="ap-empty">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="4" width="18" height="18" rx="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            No appointments scheduled yet
                        </div>
                    ) : (
                        <table className="ap-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patient</th>
                                    <th>Doctor</th>
                                    <th>Date &amp; Time</th>
                                    <th>Status</th>
                                    {(role === "doctor" || role === "admin") && <th>Action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {appointments.map((a, i) => (
                                    <tr key={a._id}>
                                        <td style={{ color: "#cbd5e1", fontFamily: "'Fira Mono', monospace", fontSize: "12px" }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </td>
                                        <td>
                                            <div className="ap-name-cell">
                                                <div className="ap-dot-avatar" style={{ background: "#eef2ff", color: "#4338ca" }}>
                                                    {(a.patient?.name || "?").slice(0, 2).toUpperCase()}
                                                </div>
                                                <span style={{ fontWeight: 500, color: "#0f172a" }}>{a.patient?.name || "—"}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ap-name-cell">
                                                <div className="ap-dot-avatar" style={{ background: "#ecfdf5", color: "#065f46" }}>
                                                    {(a.doctor?.name || "?").slice(0, 2).toUpperCase()}
                                                </div>
                                                <span style={{ fontWeight: 500, color: "#0f172a" }}>{a.doctor?.name || "—"}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="ap-datetime">
                                                <span className="ap-date-val">{a.date || "—"}</span>
                                                <span className="ap-time-val">{a.time || ""}</span>
                                            </div>
                                        </td>
                                        <td>
                                            {a.status === "Completed" ? (
                                                <span className="ap-status-completed">
                                                    <span className="ap-status-dot" style={{ background: "#10b981" }} />
                                                    Completed
                                                </span>
                                            ) : (
                                                <span className="ap-status-pending">
                                                    <span className="ap-status-dot" style={{ background: "#f59e0b" }} />
                                                    Pending
                                                </span>
                                            )}
                                        </td>
                                        {(role === "doctor" || role === "admin") && (
                                            <td>
                                                {a.status === "Pending" ? (
                                                    <button
                                                        className="ap-complete-btn"
                                                        onClick={async () => {
                                                            await API.put(`/appointments/${a._id}/status`, { status: "Completed" });
                                                            fetchAppointments();
                                                        }}
                                                    >
                                                        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                            <polyline points="20 6 9 17 4 12" />
                                                        </svg>
                                                        Mark Completed
                                                    </button>
                                                ) : (
                                                    <span className="ap-no-action">—</span>
                                                )}
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    );
}

export default Appointments;