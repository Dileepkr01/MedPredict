// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Beds() {
//   const role = localStorage.getItem("role");

//   const [beds, setBeds] = useState([]);
//   const [patients, setPatients] = useState([]);

//   const [formData, setFormData] = useState({
//     bedNumber: "",
//     type: "General",
//   });

//   const fetchBeds = async () => {
//     const res = await API.get("/beds");
//     setBeds(res.data);
//   };

//   const fetchPatients = async () => {
//     const res = await API.get("/patients");
//     setPatients(res.data);
//   };

//   useEffect(() => {
//     fetchBeds();
//     if (role === "admin" || role === "reception") {
//       fetchPatients();
//     }
//   }, []);

//   const handleCreateBed = async (e) => {
//     e.preventDefault();
//     await API.post("/beds", formData);
//     setFormData({ bedNumber: "", type: "General" });
//     fetchBeds();
//   };

//   const handleAssign = async (bedId, patientId) => {
//     await API.put(`/beds/${bedId}/assign`, { patientId });
//     fetchBeds();
//   };

//   const handleFree = async (bedId) => {
//     await API.put(`/beds/${bedId}/free`);
//     fetchBeds();
//   };

//   return (
//     <div>
//       <h2>Bed Management</h2>

//       {/* Add Bed Form - Admin Only */}
//       {role === "admin" && (
//         <form onSubmit={handleCreateBed} className="mb-4">
//           <input
//             type="text"
//             placeholder="Bed Number"
//             value={formData.bedNumber}
//             onChange={(e) =>
//               setFormData({ ...formData, bedNumber: e.target.value })
//             }
//             required
//           />

//           <select
//             value={formData.type}
//             onChange={(e) =>
//               setFormData({ ...formData, type: e.target.value })
//             }
//           >
//             <option value="ICU">ICU</option>
//             <option value="General">General</option>
//             <option value="Private">Private</option>
//           </select>

//           <button type="submit">Add Bed</button>
//         </form>
//       )}

//       {/* Bed Table */}
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Bed No</th>
//             <th>Type</th>
//             <th>Status</th>
//             <th>Patient</th>
//             <th>Action</th>
//           </tr>
//         </thead>

//         <tbody>
//           {beds.map((bed) => (
//             <tr key={bed._id}>
//               <td>{bed.bedNumber}</td>
//               <td>{bed.type}</td>
//               <td>
//                 <span
//                   style={{
//                     color:
//                       bed.status === "Available" ? "green" : "red",
//                     fontWeight: "bold",
//                   }}
//                 >
//                   {bed.status}
//                 </span>
//               </td>
//               <td>{bed.assignedPatient?.name || "-"}</td>
//               <td>
//                 {bed.status === "Available" &&
//                   (role === "admin" || role === "reception") && (
//                     <select
//                       onChange={(e) =>
//                         handleAssign(bed._id, e.target.value)
//                       }
//                     >
//                       <option value="">Assign Patient</option>
//                       {patients.map((p) => (
//                         <option key={p._id} value={p._id}>
//                           {p.name}
//                         </option>
//                       ))}
//                     </select>
//                   )}

//                 {bed.status === "Occupied" &&
//                   (role === "admin" || role === "reception") && (
//                     <button onClick={() => handleFree(bed._id)}>
//                       Free
//                     </button>
//                   )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Beds;




































import { useEffect, useState } from "react";
import API from "../api/axios";

function Beds() {
  const role = localStorage.getItem("role");

  const [beds, setBeds] = useState([]);
  const [patients, setPatients] = useState([]);

  const [formData, setFormData] = useState({
    bedNumber: "",
    type: "General",
  });

  const fetchBeds = async () => {
    const res = await API.get("/beds");
    setBeds(res.data);
  };

  const fetchPatients = async () => {
    const res = await API.get("/patients");
    setPatients(res.data);
  };

  useEffect(() => {
    fetchBeds();
    if (role === "admin" || role === "reception") {
      fetchPatients();
    }
  }, []);

  const handleCreateBed = async (e) => {
    e.preventDefault();
    await API.post("/beds", formData);
    setFormData({ bedNumber: "", type: "General" });
    fetchBeds();
  };

  const handleAssign = async (bedId, patientId) => {
    await API.put(`/beds/${bedId}/assign`, { patientId });
    fetchBeds();
  };

  const handleFree = async (bedId) => {
    await API.put(`/beds/${bedId}/free`);
    fetchBeds();
  };

  const availableCount = beds.filter((b) => b.status === "Available").length;
  const occupiedCount = beds.filter((b) => b.status === "Occupied").length;

  const TYPE_STYLES = {
    ICU: { bg: "#fef2f2", color: "#991b1b", border: "#fecaca" },
    General: { bg: "#eff6ff", color: "#1e40af", border: "#bfdbfe" },
    Private: { bg: "#f5f3ff", color: "#4c1d95", border: "#ddd6fe" },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

        .bd-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

        /* ── Page Header ── */
        .bd-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }
        .bd-page-title {
          font-size: 22px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.4px;
          margin: 0 0 4px;
        }
        .bd-page-sub {
          font-size: 12px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
        }
        .bd-header-badges { display: flex; gap: 8px; }
        .bd-hbadge {
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

        /* ── Stat row ── */
        .bd-stats-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          margin-bottom: 24px;
        }
        .bd-stat {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .bd-stat-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bd-stat-icon svg { width: 18px; height: 18px; }
        .bd-stat-value {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
          line-height: 1;
          margin-bottom: 2px;
        }
        .bd-stat-label {
          font-size: 11px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
        }

        /* ── Form card ── */
        .bd-form-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px 24px;
          margin-bottom: 24px;
        }
        .bd-form-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 18px;
        }
        .bd-form-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #6366f1;
          flex-shrink: 0;
        }
        .bd-form-title { font-size: 14px; font-weight: 600; color: #0f172a; }
        .bd-form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 16px;
        }
        @media (max-width: 560px) { .bd-form-row { grid-template-columns: 1fr; } }
        .bd-form-group { display: flex; flex-direction: column; gap: 6px; }
        .bd-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .bd-input, .bd-select {
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
        .bd-input:focus, .bd-select:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }
        .bd-input::placeholder { color: #cbd5e1; }
        .bd-submit-row { display: flex; justify-content: flex-end; }
        .bd-submit-btn {
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
        .bd-submit-btn:hover { background: #1e293b; }
        .bd-submit-btn:active { transform: scale(0.98); }
        .bd-submit-btn svg { width: 14px; height: 14px; stroke: currentColor; flex-shrink: 0; }

        /* ── Table card ── */
        .bd-table-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
        }
        .bd-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid #f1f5f9;
        }
        .bd-table-title { font-size: 14px; font-weight: 600; color: #0f172a; }
        .bd-section-label {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #cbd5e1;
          text-transform: uppercase;
          font-family: 'Fira Mono', monospace;
        }

        .bd-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
        .bd-table thead th {
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
        .bd-table tbody tr {
          border-bottom: 1px solid #f8fafc;
          transition: background 0.1s;
        }
        .bd-table tbody tr:last-child { border-bottom: none; }
        .bd-table tbody tr:hover { background: #f8fafc; }
        .bd-table td {
          padding: 13px 22px;
          color: #334155;
          vertical-align: middle;
        }

        /* Bed number chip */
        .bd-num-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-family: 'Fira Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
        }
        .bd-num-icon {
          width: 28px;
          height: 28px;
          border-radius: 7px;
          background: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .bd-num-icon svg { width: 14px; height: 14px; stroke: #64748b; }

        /* Type badge */
        .bd-type-badge {
          display: inline-flex;
          align-items: center;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11.5px;
          font-weight: 500;
          font-family: 'Fira Mono', monospace;
          border: 1px solid;
        }

        /* Status */
        .bd-status-avail {
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
        .bd-status-occ {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
          padding: 3px 10px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 500;
          font-family: 'Fira Mono', monospace;
        }
        .bd-sdot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        /* Patient cell */
        .bd-patient-cell {
          display: flex;
          align-items: center;
          gap: 9px;
        }
        .bd-patient-avatar {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #eef2ff;
          color: #4338ca;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10.5px;
          font-weight: 600;
          flex-shrink: 0;
        }

        /* Action controls */
        .bd-assign-select {
          height: 34px;
          padding: 0 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 12.5px;
          font-family: 'Outfit', sans-serif;
          color: #0f172a;
          outline: none;
          cursor: pointer;
          transition: border-color 0.15s;
          max-width: 180px;
        }
        .bd-assign-select:focus { border-color: #6366f1; }

        .bd-free-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 13px;
          background: #fef2f2;
          color: #dc2626;
          border: 1px solid #fecaca;
          border-radius: 7px;
          font-size: 12px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.13s;
        }
        .bd-free-btn:hover { background: #fee2e2; }
        .bd-free-btn svg { width: 12px; height: 12px; stroke: currentColor; }

        .bd-empty {
          text-align: center;
          padding: 48px 20px;
          color: #94a3b8;
          font-size: 13.5px;
          font-family: 'Fira Mono', monospace;
        }
        .bd-empty svg {
          width: 36px;
          height: 36px;
          stroke: #e2e8f0;
          margin-bottom: 10px;
          display: block;
          margin-inline: auto;
        }
      `}</style>

      <div className="bd-root">

        {/* Page Header */}
        <div className="bd-page-header">
          <div>
            <h2 className="bd-page-title">Bed Management</h2>
            <p className="bd-page-sub">Monitor and assign hospital beds</p>
          </div>
          <div className="bd-header-badges">
            <div className="bd-hbadge" style={{ background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
              {availableCount} free
            </div>
            <div className="bd-hbadge" style={{ background: "#fef2f2", color: "#991b1b", borderColor: "#fecaca" }}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" /><path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" />
              </svg>
              {occupiedCount} occupied
            </div>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="bd-stats-row">
          <div className="bd-stat">
            <div className="bd-stat-icon" style={{ background: "#f1f5f9", color: "#475569" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" /><path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" />
              </svg>
            </div>
            <div>
              <div className="bd-stat-value">{beds.length}</div>
              <div className="bd-stat-label">Total Beds</div>
            </div>
          </div>
          <div className="bd-stat">
            <div className="bd-stat-icon" style={{ background: "#ecfdf5", color: "#10b981" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <div>
              <div className="bd-stat-value">{availableCount}</div>
              <div className="bd-stat-label">Available</div>
            </div>
          </div>
          <div className="bd-stat">
            <div className="bd-stat-icon" style={{ background: "#fef2f2", color: "#ef4444" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <div className="bd-stat-value">{occupiedCount}</div>
              <div className="bd-stat-label">Occupied</div>
            </div>
          </div>
        </div>

        {/* Add Bed Form — Admin Only */}
        {role === "admin" && (
          <div className="bd-form-card">
            <div className="bd-form-header">
              <span className="bd-form-dot" />
              <span className="bd-form-title">Add New Bed</span>
            </div>
            <form onSubmit={handleCreateBed}>
              <div className="bd-form-row">
                <div className="bd-form-group">
                  <label className="bd-label">Bed Number</label>
                  <input
                    className="bd-input"
                    type="text"
                    placeholder="e.g. B-101"
                    value={formData.bedNumber}
                    onChange={(e) => setFormData({ ...formData, bedNumber: e.target.value })}
                    required
                  />
                </div>
                <div className="bd-form-group">
                  <label className="bd-label">Bed Type</label>
                  <select
                    className="bd-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="ICU">ICU</option>
                    <option value="General">General</option>
                    <option value="Private">Private</option>
                  </select>
                </div>
              </div>
              <div className="bd-submit-row">
                <button className="bd-submit-btn" type="submit">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Add Bed
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Bed Table */}
        <div className="bd-table-card">
          <div className="bd-table-header">
            <span className="bd-table-title">Bed List</span>
            <span className="bd-section-label">All Wards</span>
          </div>

          {beds.length === 0 ? (
            <div className="bd-empty">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" /><path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" />
              </svg>
              No beds registered yet
            </div>
          ) : (
            <table className="bd-table">
              <thead>
                <tr>
                  <th>Bed No</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Patient</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {beds.map((bed) => {
                  const ts = TYPE_STYLES[bed.type] || TYPE_STYLES.General;
                  return (
                    <tr key={bed._id}>
                      <td>
                        <div className="bd-num-chip">
                          <div className="bd-num-icon">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4" />
                              <path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z" />
                            </svg>
                          </div>
                          {bed.bedNumber}
                        </div>
                      </td>
                      <td>
                        <span className="bd-type-badge" style={{ background: ts.bg, color: ts.color, borderColor: ts.border }}>
                          {bed.type}
                        </span>
                      </td>
                      <td>
                        {bed.status === "Available" ? (
                          <span className="bd-status-avail">
                            <span className="bd-sdot" style={{ background: "#10b981" }} />
                            Available
                          </span>
                        ) : (
                          <span className="bd-status-occ">
                            <span className="bd-sdot" style={{ background: "#ef4444" }} />
                            Occupied
                          </span>
                        )}
                      </td>
                      <td>
                        {bed.assignedPatient?.name ? (
                          <div className="bd-patient-cell">
                            <div className="bd-patient-avatar">
                              {bed.assignedPatient.name.slice(0, 2).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 500, color: "#0f172a", fontSize: "13px" }}>
                              {bed.assignedPatient.name}
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: "#e2e8f0", fontFamily: "'Fira Mono', monospace", fontSize: "12px" }}>—</span>
                        )}
                      </td>
                      <td>
                        {bed.status === "Available" && (role === "admin" || role === "reception") && (
                          <select
                            className="bd-assign-select"
                            onChange={(e) => handleAssign(bed._id, e.target.value)}
                            defaultValue=""
                          >
                            <option value="">Assign Patient</option>
                            {patients.map((p) => (
                              <option key={p._id} value={p._id}>{p.name}</option>
                            ))}
                          </select>
                        )}
                        {bed.status === "Occupied" && (role === "admin" || role === "reception") && (
                          <button className="bd-free-btn" onClick={() => handleFree(bed._id)}>
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="8" y1="12" x2="16" y2="12" />
                            </svg>
                            Free Bed
                          </button>
                        )}
                        {(bed.status !== "Available" || role === "doctor") && !bed.assignedPatient && role === "doctor" && (
                          <span style={{ color: "#e2e8f0", fontFamily: "'Fira Mono', monospace", fontSize: "12px" }}>—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default Beds;