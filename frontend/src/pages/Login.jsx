// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../api/axios";

// function Login() {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/auth/login", formData);

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.user.role);

//       if (res.data.user.role === "admin") navigate("/admin");
//       if (res.data.user.role === "doctor") navigate("/doctor");
//       if (res.data.user.role === "reception") navigate("/reception");
//     } catch (error) {
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2>Login</h2>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             style={styles.input}
//             onChange={(e) =>
//               setFormData({ ...formData, email: e.target.value })
//             }
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             required
//             style={styles.input}
//             onChange={(e) =>
//               setFormData({ ...formData, password: e.target.value })
//             }
//           />

//           <button type="submit" style={styles.button}>
//             Login
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// const styles = {
//   container: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(to right, #667eea, #764ba2)",
//   },
//   card: {
//     background: "white",
//     padding: "40px",
//     borderRadius: "10px",
//     width: "350px",
//     boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
//     textAlign: "center",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     margin: "10px 0",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//   },
//   button: {
//     width: "100%",
//     padding: "10px",
//     background: "#2c3e50",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//   },
// };

// export default Login;





















import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);

      if (res.data.user.role === "admin") navigate("/admin");
      if (res.data.user.role === "doctor") navigate("/doctor");
      if (res.data.user.role === "reception") navigate("/reception");
    } catch (error) {
      alert("Invalid Credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Fira+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .lg-root {
          min-height: 100vh;
          display: flex;
          font-family: 'Outfit', sans-serif;
          background: #f5f6fa;
        }

        /* ── Left panel ── */
        .lg-left {
          width: 420px;
          flex-shrink: 0;
          background: #0f172a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 40px 44px;
          position: relative;
          overflow: hidden;
        }

        /* subtle grid texture */
        .lg-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .lg-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .lg-brand-icon {
          width: 38px;
          height: 38px;
          background: #6366f1;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .lg-brand-icon svg { width: 19px; height: 19px; stroke: #fff; }

        .lg-brand-name {
          font-size: 18px;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.3px;
        }

        .lg-brand-sub {
          font-size: 10px;
          color: #475569;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.06em;
          margin-top: 1px;
        }

        .lg-hero {
          position: relative;
          z-index: 1;
        }

        .lg-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.15);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 20px;
          padding: 5px 13px;
          font-size: 11.5px;
          color: #a5b4fc;
          font-family: 'Fira Mono', monospace;
          margin-bottom: 20px;
        }

        .lg-hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #6366f1;
          animation: hero-pulse 2s infinite;
        }

        @keyframes hero-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        .lg-hero-heading {
          font-size: 30px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.8px;
          line-height: 1.2;
          margin-bottom: 14px;
        }

        .lg-hero-heading span { color: #818cf8; }

        .lg-hero-desc {
          font-size: 13.5px;
          color: #64748b;
          line-height: 1.7;
          max-width: 300px;
        }

        .lg-stat-row {
          display: flex;
          gap: 20px;
          position: relative;
          z-index: 1;
        }

        .lg-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lg-stat-value {
          font-size: 22px;
          font-weight: 700;
          color: #fff;
          letter-spacing: -0.5px;
        }

        .lg-stat-label {
          font-size: 10.5px;
          color: #475569;
          font-family: 'Fira Mono', monospace;
        }

        .lg-stat-divider {
          width: 1px;
          background: rgba(255,255,255,0.06);
          align-self: stretch;
        }

        /* ── Right panel ── */
        .lg-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 32px;
        }

        .lg-form-wrap {
          width: 100%;
          max-width: 380px;
        }

        .lg-form-heading {
          font-size: 22px;
          font-weight: 600;
          color: #0f172a;
          letter-spacing: -0.4px;
          margin-bottom: 4px;
        }

        .lg-form-sub {
          font-size: 12.5px;
          color: #94a3b8;
          font-family: 'Fira Mono', monospace;
          margin-bottom: 32px;
        }

        .lg-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }

        .lg-label {
          font-size: 11px;
          font-weight: 500;
          color: #64748b;
          font-family: 'Fira Mono', monospace;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .lg-input-wrap {
          position: relative;
        }

        .lg-input-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
          color: #94a3b8;
          pointer-events: none;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .lg-input-icon svg { width: 15px; height: 15px; stroke: currentColor; }

        .lg-input {
          width: 100%;
          height: 42px;
          padding: 0 12px 0 38px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          font-size: 13.5px;
          font-family: 'Outfit', sans-serif;
          color: #0f172a;
          outline: none;
          transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
        }

        .lg-input:focus {
          border-color: #6366f1;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.08);
        }

        .lg-input::placeholder { color: #cbd5e1; }

        .lg-eye-btn {
          position: absolute;
          right: 11px;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          cursor: pointer;
          color: #94a3b8;
          display: flex;
          align-items: center;
          padding: 2px;
          transition: color 0.13s;
        }

        .lg-eye-btn:hover { color: #64748b; }
        .lg-eye-btn svg { width: 15px; height: 15px; stroke: currentColor; }

        .lg-submit-btn {
          width: 100%;
          height: 44px;
          background: #0f172a;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-family: 'Outfit', sans-serif;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          letter-spacing: 0.01em;
        }

        .lg-submit-btn:hover:not(:disabled) { background: #1e293b; }
        .lg-submit-btn:active:not(:disabled) { transform: scale(0.99); }
        .lg-submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .lg-submit-btn svg { width: 15px; height: 15px; stroke: currentColor; }

        .lg-spinner {
          width: 15px;
          height: 15px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .lg-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 22px 0;
        }

        .lg-divider-line { flex: 1; height: 1px; background: #f1f5f9; }
        .lg-divider-text { font-size: 11px; color: #cbd5e1; font-family: 'Fira Mono', monospace; }

        .lg-role-chips {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .lg-role-chip {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 5px 12px;
          border-radius: 7px;
          font-size: 11.5px;
          font-weight: 500;
          border: 1px solid;
          font-family: 'Outfit', sans-serif;
        }

        .lg-role-dot { width: 6px; height: 6px; border-radius: 50%; }

        .lg-footer {
          margin-top: 32px;
          font-size: 11.5px;
          color: #cbd5e1;
          font-family: 'Fira Mono', monospace;
          text-align: center;
        }

        @media (max-width: 720px) {
          .lg-left { display: none; }
          .lg-right { padding: 28px 20px; }
        }
      `}</style>

      <div className="lg-root">
        {/* Left decorative panel */}
        <div className="lg-left">
          <div className="lg-brand">
            <div className="lg-brand-icon">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div>
              <div className="lg-brand-name">MedPredict</div>
              <div className="lg-brand-sub">HMS v2.0</div>
            </div>
          </div>

          <div className="lg-hero">
            <div className="lg-hero-tag">
              <span className="lg-hero-dot" />
              Hospital Management System
            </div>
            <h1 className="lg-hero-heading">
              Smart care,<br /><span>seamless</span> workflow.
            </h1>
            <p className="lg-hero-desc">
              A unified platform for admins, doctors, and reception staff to manage patients, appointments, and beds in real time.
            </p>
          </div>

          <div className="lg-stat-row">
            <div className="lg-stat">
              <span className="lg-stat-value">3</span>
              <span className="lg-stat-label">Role types</span>
            </div>
            <div className="lg-stat-divider" />
            <div className="lg-stat">
              <span className="lg-stat-value">5</span>
              <span className="lg-stat-label">Modules</span>
            </div>
            <div className="lg-stat-divider" />
            <div className="lg-stat">
              <span className="lg-stat-value">24/7</span>
              <span className="lg-stat-label">Access</span>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="lg-right">
          <div className="lg-form-wrap">
            <h2 className="lg-form-heading">Welcome back</h2>
            <p className="lg-form-sub">Sign in to your MedPredict account</p>

            <form onSubmit={handleSubmit}>
              <div className="lg-form-group">
                <label className="lg-label">Email Address</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    className="lg-input"
                    type="email"
                    placeholder="you@hospital.com"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="lg-form-group">
                <label className="lg-label">Password</label>
                <div className="lg-input-wrap">
                  <span className="lg-input-icon">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    className="lg-input"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="lg-eye-btn"
                    onClick={() => setShowPassword((v) => !v)}
                  >
                    {showPassword ? (
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button className="lg-submit-btn" type="submit" disabled={loading}>
                {loading ? (
                  <><span className="lg-spinner" /> Signing in…</>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                      <polyline points="10 17 15 12 10 7" />
                      <line x1="15" y1="12" x2="3" y2="12" />
                    </svg>
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="lg-divider">
              <div className="lg-divider-line" />
              <span className="lg-divider-text">access levels</span>
              <div className="lg-divider-line" />
            </div>

            <div className="lg-role-chips">
              <div className="lg-role-chip" style={{ background: "#eef2ff", color: "#3730a3", borderColor: "#c7d2fe" }}>
                <span className="lg-role-dot" style={{ background: "#6366f1" }} /> Admin
              </div>
              <div className="lg-role-chip" style={{ background: "#ecfdf5", color: "#065f46", borderColor: "#a7f3d0" }}>
                <span className="lg-role-dot" style={{ background: "#10b981" }} /> Doctor
              </div>
              <div className="lg-role-chip" style={{ background: "#fff7ed", color: "#92400e", borderColor: "#fde68a" }}>
                <span className="lg-role-dot" style={{ background: "#f59e0b" }} /> Reception
              </div>
            </div>

            <div className="lg-footer">MedPredict HMS · Secure access · v2.0</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;