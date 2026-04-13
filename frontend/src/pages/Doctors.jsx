// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Doctors() {
//   const [doctors, setDoctors] = useState([]);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const fetchDoctors = async () => {
//     try {
//       const res = await API.get("/users/doctors");
//       setDoctors(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await API.post("/auth/register", {
//         ...formData,
//         role: "doctor"
//       });

//       fetchDoctors();
//       setFormData({ name: "", email: "", password: "" });
//     } catch (error) {
//       alert("Error adding doctor");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await API.delete(`/users/doctors/${id}`);
//       fetchDoctors();
//     } catch (error) {
//       alert("Error deleting doctor");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Doctor Management</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Doctor Name"
//           value={formData.name}
//           onChange={(e) =>
//             setFormData({ ...formData, name: e.target.value })
//           }
//           required
//         />
//         <br /><br />

//         <input
//           type="email"
//           placeholder="Doctor Email"
//           value={formData.email}
//           onChange={(e) =>
//             setFormData({ ...formData, email: e.target.value })
//           }
//           required
//         />
//         <br /><br />

//         <input
//           type="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//           required
//         />
//         <br /><br />

//         <button type="submit">Add Doctor</button>
//       </form>

//       <hr />

//       <ul>
//         {doctors.map((doc) => (
//           <li key={doc._id}>
//             {doc.name} - {doc.email}
//             <button onClick={() => handleDelete(doc._id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Doctors;
















import { useEffect, useState } from "react";
import API from "../api/axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const fetchDoctors = async () => {
    try {
      const res = await API.get("/users/doctors");
      setDoctors(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", {
        ...formData,
        role: "doctor"
      });
      fetchDoctors();
      setFormData({ name: "", email: "", password: "" });
    } catch (error) {
      alert("Error adding doctor");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/users/doctors/${id}`);
      fetchDoctors();
    } catch (error) {
      alert("Error deleting doctor");
    }
  };

  const getInitials = (name = "") =>
    name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  const AVATAR_COLORS = [
    { bg: "#eef2ff", color: "#4338ca" },
    { bg: "#ecfdf5", color: "#065f46" },
    { bg: "#fff7ed", color: "#92400e" },
    { bg: "#fdf2f8", color: "#9d174d" },
    { bg: "#f0fdf4", color: "#166534" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

        .dc-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

        .dc-page-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .dc-page-title {
          font-size: 22px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.4px;
          margin: 0 0 4px;
        }

        .dc-page-sub {
          font-size: 12px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
        }

        .dc-count-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
          border-radius: 8px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 600;
          font-family: 'Fira Mono', monospace;
        }

        /* ── Form Card ── */
        .dc-form-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px 24px;
          margin-bottom: 24px;
        }

        .dc-form-card-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }

        .dc-form-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          flex-shrink: 0;
        }

        .dc-form-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .dc-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 14px;
          margin-bottom: 16px;
        }

        @media (max-width: 760px) { .dc-form-grid { grid-template-columns: 1fr; } }

        .dc-form-group { display: flex; flex-direction: column; gap: 6px; }

        .dc-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .dc-input {
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

        .dc-input:focus {
          border-color: #10b981;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.08);
        }

        .dc-input::placeholder { color: #cbd5e1; }

        .dc-submit-row {
          display: flex;
          justify-content: flex-end;
        }

        .dc-submit-btn {
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

        .dc-submit-btn:hover { background: #1e293b; }
        .dc-submit-btn:active { transform: scale(0.98); }
        .dc-submit-btn svg { width: 14px; height: 14px; stroke: currentColor; flex-shrink: 0; }

        /* ── Doctor Grid ── */
        .dc-table-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          overflow: hidden;
        }

        .dc-table-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 22px;
          border-bottom: 1px solid #f1f5f9;
        }

        .dc-table-title {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
        }

        .dc-section-label {
          font-size: 10.5px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: #cbd5e1;
          text-transform: uppercase;
          font-family: 'Fira Mono', monospace;
        }

        .dc-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }

        .dc-table thead th {
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

        .dc-table tbody tr {
          border-bottom: 1px solid #f8fafc;
          transition: background 0.1s;
        }

        .dc-table tbody tr:last-child { border-bottom: none; }
        .dc-table tbody tr:hover { background: #f8fafc; }

        .dc-table td {
          padding: 14px 22px;
          color: #334155;
          vertical-align: middle;
        }

        .dc-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.5px;
          flex-shrink: 0;
        }

        .dc-doctor-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .dc-doctor-name {
          font-weight: 500;
          color: #0f172a;
          font-size: 13.5px;
        }

        .dc-doctor-role {
          font-size: 11px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
          margin-top: 1px;
        }

        .dc-email-cell {
          font-family: 'Fira Mono', monospace;
          font-size: 12.5px;
          color: #64748b;
        }

        .dc-status-badge {
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

        .dc-status-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #10b981;
        }

        .dc-delete-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
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

        .dc-delete-btn:hover { background: #fee2e2; }
        .dc-delete-btn svg { width: 12px; height: 12px; stroke: currentColor; }

        .dc-empty {
          text-align: center;
          padding: 48px 20px;
          color: #94a3b8;
          font-size: 13.5px;
          font-family: 'Fira Mono', monospace;
        }

        .dc-empty svg {
          width: 36px;
          height: 36px;
          stroke: #e2e8f0;
          margin-bottom: 10px;
          display: block;
          margin-inline: auto;
        }
      `}</style>

      <div className="dc-root">
        {/* Page Header */}
        <div className="dc-page-header">
          <div>
            <h2 className="dc-page-title">Doctor Management</h2>
            <p className="dc-page-sub">Register and manage hospital doctors</p>
          </div>
          <div className="dc-count-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
              <path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
              <line x1="12" y1="18" x2="12" y2="22" /><line x1="10" y1="20" x2="14" y2="20" />
            </svg>
            {doctors.length} doctors
          </div>
        </div>

        {/* Form Card */}
        <div className="dc-form-card">
          <div className="dc-form-card-header">
            <span className="dc-form-dot" />
            <span className="dc-form-title">Register New Doctor</span>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="dc-form-grid">
              <div className="dc-form-group">
                <label className="dc-label">Full Name</label>
                <input
                  className="dc-input"
                  type="text"
                  placeholder="e.g. Dr. Ayesha Khan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="dc-form-group">
                <label className="dc-label">Email Address</label>
                <input
                  className="dc-input"
                  type="email"
                  placeholder="e.g. ayesha@hospital.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>
              <div className="dc-form-group">
                <label className="dc-label">Password</label>
                <input
                  className="dc-input"
                  type="password"
                  placeholder="Set a secure password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="dc-submit-row">
              <button className="dc-submit-btn" type="submit">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Add Doctor
              </button>
            </div>
          </form>
        </div>

        {/* Doctors Table */}
        <div className="dc-table-card">
          <div className="dc-table-header">
            <span className="dc-table-title">Doctors List</span>
            <span className="dc-section-label">All Staff</span>
          </div>

          {doctors.length === 0 ? (
            <div className="dc-empty">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
                <path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
              </svg>
              No doctors registered yet
            </div>
          ) : (
            <table className="dc-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Doctor</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doc, i) => {
                  const ac = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  return (
                    <tr key={doc._id}>
                      <td style={{ color: "#cbd5e1", fontFamily: "'Fira Mono', monospace", fontSize: "12px" }}>
                        {String(i + 1).padStart(2, "0")}
                      </td>
                      <td>
                        <div className="dc-doctor-cell">
                          <div className="dc-avatar" style={{ background: ac.bg, color: ac.color }}>
                            {getInitials(doc.name)}
                          </div>
                          <div>
                            <div className="dc-doctor-name">{doc.name}</div>
                            <div className="dc-doctor-role">Specialist</div>
                          </div>
                        </div>
                      </td>
                      <td className="dc-email-cell">{doc.email}</td>
                      <td>
                        <span className="dc-status-badge">
                          <span className="dc-status-dot" />
                          Active
                        </span>
                      </td>
                      <td>
                        <button className="dc-delete-btn" onClick={() => handleDelete(doc._id)}>
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" /><path d="M14 11v6" />
                            <path d="M9 6V4h6v2" />
                          </svg>
                          Delete
                        </button>
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

export default Doctors;