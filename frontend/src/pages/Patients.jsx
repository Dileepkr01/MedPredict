// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Patients() {
//     const [doctors, setDoctors] = useState([]);
//     const [patients, setPatients] = useState([]);
//     const [editingId, setEditingId] = useState(null);

//     const [formData, setFormData] = useState({
//         name: "",
//         age: "",
//         gender: "male",
//         disease: "",
//         assignedDoctor: "",

//     });

//     const role = localStorage.getItem("role");

//     const fetchDoctors = async () => {
//         try {
//             const res = await API.get("/users/doctors");
//             setDoctors(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     // Fetch Patients
//     const fetchPatients = async () => {
//         try {
//             const res = await API.get("/patients");
//             setPatients(res.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         fetchPatients();
//         fetchDoctors();
//     }, []);

//     // Add or Update Patient
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             if (editingId) {
//                 await API.put(`/patients/${editingId}`, formData);
//                 setEditingId(null);
//             } else {
//                 await API.post("/patients", formData);
//             }

//             fetchPatients();
//             setFormData({ name: "", age: "", gender: "male", disease: "" });

//         } catch (error) {
//             alert("Error saving patient");
//         }
//     };

//     // Delete Patient
//     const handleDelete = async (id) => {
//         try {
//             await API.delete(`/patients/${id}`);
//             fetchPatients();
//         } catch (error) {
//             alert("Only admin can delete");
//         }
//     };

//     // Edit Patient
//     const handleEdit = (patient) => {
//         setFormData({
//             name: patient.name,
//             age: patient.age,
//             gender: patient.gender,
//             disease: patient.disease,
//         });
//         setEditingId(patient._id);
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <h2>Patients</h2>

//             {/* Form */}
//             {(role === "admin" || role === "reception") && (
//                 <form onSubmit={handleSubmit}>
//                     <input
//                         type="text"
//                         placeholder="Name"
//                         value={formData.name}
//                         onChange={(e) =>
//                             setFormData({ ...formData, name: e.target.value })
//                         }
//                         required
//                     />
//                     <br /><br />

//                     <input
//                         type="number"
//                         placeholder="Age"
//                         value={formData.age}
//                         onChange={(e) =>
//                             setFormData({ ...formData, age: e.target.value })
//                         }
//                         required
//                     />
//                     <br /><br />

//                     <select
//                         value={formData.gender}
//                         onChange={(e) =>
//                             setFormData({ ...formData, gender: e.target.value })
//                         }
//                     >
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                     </select>

//                     <br /><br />

//                     <input
//                         type="text"
//                         placeholder="Disease"
//                         value={formData.disease}
//                         onChange={(e) =>
//                             setFormData({ ...formData, disease: e.target.value })
//                         }
//                         required
//                     />

//                     <br /><br />
//                     <select
//                         value={formData.assignedDoctor}
//                         onChange={(e) =>
//                             setFormData({ ...formData, assignedDoctor: e.target.value })
//                         }
//                         required
//                     >
//                         <option value="">Select Doctor</option>
//                         {doctors.map((doc) => (
//                             <option key={doc._id} value={doc._id}>
//                                 {doc.name}
//                             </option>
//                         ))}
//                     </select>


//                     <br /><br />
//                     <button type="submit">
//                         {editingId ? "Update Patient" : "Add Patient"}
//                     </button>
//                 </form>
//             )}

//             <hr />

//             {/* Patient List */}
//             <h3>Patient List</h3>
//             <ul>
//                 {patients.map((patient) => (
//                     <li key={patient._id}>
//                         {patient.name} - {patient.age} - {patient.disease}

//                         {/* Edit Button */}
//                         {(role === "admin" || role === "reception") && (
//                             <button onClick={() => handleEdit(patient)}>
//                                 Edit
//                             </button>
//                         )}

//                         {/* Delete Button */}
//                         {role === "admin" && (
//                             <button onClick={() => handleDelete(patient._id)}>
//                                 Delete
//                             </button>
//                         )}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default Patients;

























import { useEffect, useState } from "react";
import API from "../api/axios";

function Patients() {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "male",
        disease: "",
        assignedDoctor: "",
    });

    const role = localStorage.getItem("role");

    const fetchDoctors = async () => {
        try {
            const res = await API.get("/users/doctors");
            setDoctors(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchPatients = async () => {
        try {
            const res = await API.get("/patients");
            setPatients(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPatients();
        fetchDoctors();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await API.put(`/patients/${editingId}`, formData);
                setEditingId(null);
            } else {
                await API.post("/patients", formData);
            }
            fetchPatients();
            setFormData({ name: "", age: "", gender: "male", disease: "", assignedDoctor: "" });
        } catch (error) {
            alert("Error saving patient");
        }
    };

    const handleDelete = async (id) => {
        try {
            await API.delete(`/patients/${id}`);
            fetchPatients();
        } catch (error) {
            alert("Only admin can delete");
        }
    };

    const handleEdit = (patient) => {
        setFormData({
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            disease: patient.disease,
            assignedDoctor: patient.assignedDoctor || "",
        });
        setEditingId(patient._id);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setFormData({ name: "", age: "", gender: "male", disease: "", assignedDoctor: "" });
    };

    const genderColors = {
        male: { bg: "#eef2ff", color: "#4338ca" },
        female: { bg: "#fdf2f8", color: "#9d174d" },
        other: { bg: "#f0fdf4", color: "#166534" },
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

                .pt-root { font-family: 'Outfit', sans-serif; color: #0f172a; }

                .pt-page-header {
                    display: flex;
                    align-items: flex-start;
                    justify-content: space-between;
                    margin-bottom: 24px;
                }

                .pt-page-title {
                    font-size: 22px;
                    font-weight: 600;
                    color: #0f172a;
                    letter-spacing: -0.4px;
                    margin: 0 0 4px;
                }

                .pt-page-sub {
                    font-size: 12px;
                    color: #94a3b8;
                    font-family: 'Fira Mono', monospace;
                }

                .pt-count-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: #eef2ff;
                    color: #4338ca;
                    border: 1px solid #c7d2fe;
                    border-radius: 8px;
                    padding: 6px 14px;
                    font-size: 13px;
                    font-weight: 600;
                    font-family: 'Fira Mono', monospace;
                }

                /* ── Form Card ── */
                .pt-form-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    padding: 22px 24px;
                    margin-bottom: 24px;
                }

                .pt-form-card-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .pt-form-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #0f172a;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .pt-form-title-dot {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: #6366f1;
                }

                .pt-cancel-btn {
                    background: transparent;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 5px 12px;
                    font-size: 12.5px;
                    font-family: 'Outfit', sans-serif;
                    color: #64748b;
                    cursor: pointer;
                    transition: all 0.13s;
                }

                .pt-cancel-btn:hover { background: #f8fafc; color: #0f172a; }

                .pt-form-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 14px;
                    margin-bottom: 14px;
                }

                @media (max-width: 640px) { .pt-form-grid { grid-template-columns: 1fr; } }

                .pt-form-group { display: flex; flex-direction: column; gap: 6px; }

                .pt-label {
                    font-size: 11.5px;
                    font-weight: 500;
                    color: #64748b;
                    font-family: 'Fira Mono', monospace;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }

                .pt-input, .pt-select {
                    height: 38px;
                    padding: 0 12px;
                    background: #f8fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 9px;
                    font-size: 13.5px;
                    font-family: 'Outfit', sans-serif;
                    color: #0f172a;
                    outline: none;
                    transition: border-color 0.15s, background 0.15s;
                    width: 100%;
                }

                .pt-input:focus, .pt-select:focus {
                    border-color: #6366f1;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
                }

                .pt-input::placeholder { color: #cbd5e1; }

                .pt-form-row-full { margin-bottom: 14px; }

                .pt-submit-row {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 6px;
                }

                .pt-submit-btn {
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

                .pt-submit-btn:hover { background: #1e293b; }
                .pt-submit-btn:active { transform: scale(0.98); }

                .pt-submit-btn svg { width: 14px; height: 14px; stroke: currentColor; flex-shrink: 0; }

                /* ── Table Card ── */
                .pt-table-card {
                    background: #ffffff;
                    border: 1px solid #e2e8f0;
                    border-radius: 14px;
                    overflow: hidden;
                }

                .pt-table-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 18px 22px;
                    border-bottom: 1px solid #f1f5f9;
                }

                .pt-table-title {
                    font-size: 14px;
                    font-weight: 600;
                    color: #0f172a;
                }

                .pt-section-label {
                    font-size: 10.5px;
                    font-weight: 500;
                    letter-spacing: 0.12em;
                    color: #cbd5e1;
                    text-transform: uppercase;
                    font-family: 'Fira Mono', monospace;
                }

                table.pt-table {
                    width: 100%;
                    border-collapse: collapse;
                    font-size: 13.5px;
                }

                .pt-table thead th {
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

                .pt-table tbody tr {
                    border-bottom: 1px solid #f8fafc;
                    transition: background 0.1s;
                }

                .pt-table tbody tr:last-child { border-bottom: none; }
                .pt-table tbody tr:hover { background: #f8fafc; }

                .pt-table td {
                    padding: 13px 22px;
                    color: #334155;
                    vertical-align: middle;
                }

                .pt-table td.bold { font-weight: 500; color: #0f172a; }

                .pt-gender-badge {
                    display: inline-flex;
                    align-items: center;
                    padding: 3px 10px;
                    border-radius: 6px;
                    font-size: 11px;
                    font-weight: 500;
                    font-family: 'Fira Mono', monospace;
                    text-transform: capitalize;
                }

                .pt-disease-tag {
                    display: inline-flex;
                    align-items: center;
                    background: #fff7ed;
                    color: #92400e;
                    border: 1px solid #fde68a;
                    padding: 3px 10px;
                    border-radius: 6px;
                    font-size: 12px;
                    font-weight: 500;
                }

                .pt-actions { display: flex; align-items: center; gap: 8px; }

                .pt-edit-btn {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    padding: 5px 12px;
                    background: #eef2ff;
                    color: #4338ca;
                    border: 1px solid #c7d2fe;
                    border-radius: 7px;
                    font-size: 12px;
                    font-family: 'Outfit', sans-serif;
                    font-weight: 500;
                    cursor: pointer;
                    transition: background 0.13s;
                }

                .pt-edit-btn:hover { background: #e0e7ff; }
                .pt-edit-btn svg { width: 12px; height: 12px; stroke: currentColor; }

                .pt-delete-btn {
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

                .pt-delete-btn:hover { background: #fee2e2; }
                .pt-delete-btn svg { width: 12px; height: 12px; stroke: currentColor; }

                .pt-empty {
                    text-align: center;
                    padding: 48px 20px;
                    color: #94a3b8;
                    font-size: 13.5px;
                    font-family: 'Fira Mono', monospace;
                }

                .pt-empty svg { width: 36px; height: 36px; stroke: #e2e8f0; margin-bottom: 10px; display: block; margin-inline: auto; }
            `}</style>

            <div className="pt-root">
                {/* Page Header */}
                <div className="pt-page-header">
                    <div>
                        <h2 className="pt-page-title">Patients</h2>
                        <p className="pt-page-sub">Manage and monitor patient records</p>
                    </div>
                    <div className="pt-count-badge">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                        {patients.length} patients
                    </div>
                </div>

                {/* Form */}
                {(role === "admin" || role === "reception") && (
                    <div className="pt-form-card">
                        <div className="pt-form-card-header">
                            <div className="pt-form-title">
                                <span className="pt-form-title-dot" style={{ background: editingId ? "#f59e0b" : "#6366f1" }} />
                                {editingId ? "Edit Patient Record" : "Add New Patient"}
                            </div>
                            {editingId && (
                                <button className="pt-cancel-btn" onClick={handleCancelEdit}>Cancel</button>
                            )}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="pt-form-grid">
                                <div className="pt-form-group">
                                    <label className="pt-label">Full Name</label>
                                    <input
                                        className="pt-input"
                                        type="text"
                                        placeholder="e.g. John Smith"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="pt-form-group">
                                    <label className="pt-label">Age</label>
                                    <input
                                        className="pt-input"
                                        type="number"
                                        placeholder="e.g. 34"
                                        value={formData.age}
                                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="pt-form-group">
                                    <label className="pt-label">Gender</label>
                                    <select
                                        className="pt-select"
                                        value={formData.gender}
                                        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    >
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="pt-form-group">
                                    <label className="pt-label">Assigned Doctor</label>
                                    <select
                                        className="pt-select"
                                        value={formData.assignedDoctor}
                                        onChange={(e) => setFormData({ ...formData, assignedDoctor: e.target.value })}
                                        required
                                    >
                                        <option value="">Select Doctor</option>
                                        {doctors.map((doc) => (
                                            <option key={doc._id} value={doc._id}>{doc.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="pt-form-row-full">
                                <div className="pt-form-group">
                                    <label className="pt-label">Disease / Condition</label>
                                    <input
                                        className="pt-input"
                                        type="text"
                                        placeholder="e.g. Hypertension"
                                        value={formData.disease}
                                        onChange={(e) => setFormData({ ...formData, disease: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="pt-submit-row">
                                <button className="pt-submit-btn" type="submit">
                                    {editingId ? (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Update Patient
                                        </>
                                    ) : (
                                        <>
                                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                            Add Patient
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Table */}
                <div className="pt-table-card">
                    <div className="pt-table-header">
                        <span className="pt-table-title">Patient List</span>
                        <span className="pt-section-label">All Records</span>
                    </div>

                    {patients.length === 0 ? (
                        <div className="pt-empty">
                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
                            </svg>
                            No patients found
                        </div>
                    ) : (
                        <table className="pt-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Disease</th>
                                    {(role === "admin" || role === "reception") && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {patients.map((patient, i) => {
                                    const gc = genderColors[patient.gender] || genderColors.other;
                                    return (
                                        <tr key={patient._id}>
                                            <td style={{ color: "#cbd5e1", fontFamily: "'Fira Mono', monospace", fontSize: "12px" }}>
                                                {String(i + 1).padStart(2, "0")}
                                            </td>
                                            <td className="bold">{patient.name}</td>
                                            <td style={{ fontFamily: "'Fira Mono', monospace" }}>{patient.age} yrs</td>
                                            <td>
                                                <span className="pt-gender-badge" style={{ background: gc.bg, color: gc.color }}>
                                                    {patient.gender}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="pt-disease-tag">{patient.disease}</span>
                                            </td>
                                            {(role === "admin" || role === "reception") && (
                                                <td>
                                                    <div className="pt-actions">
                                                        <button className="pt-edit-btn" onClick={() => handleEdit(patient)}>
                                                            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                            </svg>
                                                            Edit
                                                        </button>
                                                        {role === "admin" && (
                                                            <button className="pt-delete-btn" onClick={() => handleDelete(patient._id)}>
                                                                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                    <polyline points="3 6 5 6 21 6" />
                                                                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                                                    <path d="M10 11v6" /><path d="M14 11v6" />
                                                                    <path d="M9 6V4h6v2" />
                                                                </svg>
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            )}
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

export default Patients;