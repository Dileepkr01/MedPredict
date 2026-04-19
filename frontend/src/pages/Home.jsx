import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [activeRole, setActiveRole] = useState("admin");
  const [counters, setCounters] = useState({ patients: 0, doctors: 0, appointments: 0, uptime: 0 });
  const [visible, setVisible] = useState({});

  // Animated counters
  useEffect(() => {
    const targets = { patients: 20, doctors: 10, appointments: 8, uptime: 98 };
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        patients: Math.round(targets.patients * ease),
        doctors: Math.round(targets.doctors * ease),
        appointments: Math.round(targets.appointments * ease),
        uptime: Math.min(99, Math.round(targets.uptime * ease)),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  // Intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const ROLES = {
    admin: {
      label: "Administrator",
      color: "#6366f1",
      light: "rgba(99,102,241,0.1)",
      border: "rgba(99,102,241,0.25)",
      features: [
        "Full system access & control",
        "Register and manage doctors",
        "View all patient records",
        "Monitor bed availability",
        "View ML-powered predictions",
        "Generate system-wide reports",
      ],
    },
    doctor: {
      label: "Doctor",
      color: "#10b981",
      light: "rgba(16,185,129,0.1)",
      border: "rgba(16,185,129,0.25)",
      features: [
        "View assigned patients",
        "Manage own appointments",
        "Mark appointments complete",
        "Access patient history",
        "Collaborate with reception",
        "Real-time patient updates",
      ],
    },
    reception: {
      label: "Receptionist",
      color: "#f59e0b",
      light: "rgba(245,158,11,0.1)",
      border: "rgba(245,158,11,0.25)",
      features: [
        "Register new patients",
        "Schedule appointments",
        "Assign beds to patients",
        "Free occupied beds",
        "Coordinate with doctors",
        "Manage patient intake",
      ],
    },
  };

  const STEPS = [
    {
      num: "01",
      title: "Login Securely",
      desc: "Access the platform with your role-based credentials. Admin, Doctor, or Reception — each gets a tailored interface.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ),
      color: "#6366f1",
    },
    {
      num: "02",
      title: "Manage Resources",
      desc: "Register patients, schedule appointments, assign beds, and manage doctors — all from a single unified dashboard.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
        </svg>
      ),
      color: "#10b981",
    },
    {
      num: "03",
      title: "AI Predictions",
      desc: "MedPredict's ML model forecasts patient intake so your team can plan ahead, optimize staffing, and reduce wait times.",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2z" />
        </svg>
      ),
      color: "#06b6d4",
    },
  ];

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

        .hm-brand { display: flex; align-items: center; gap: 12px; }

        .hm-brand-icon {
          width: 36px; height: 36px; background: #6366f1; border-radius: 10px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }

        .hm-brand-icon svg { width: 18px; height: 18px; stroke: #fff; }
        .hm-brand-name { font-size: 16px; font-weight: 600; color: #fff; letter-spacing: -0.3px; }
        .hm-brand-sub { font-size: 10px; color: #475569; font-family: 'Fira Mono', monospace; letter-spacing: 0.06em; margin-top: 1px; }

        .hm-nav-right { display: flex; align-items: center; gap: 12px; }

        .hm-nav-link {
          font-size: 13px; color: #64748b; text-decoration: none; padding: 7px 14px;
          border-radius: 8px; transition: color 0.15s, background 0.15s; font-weight: 500;
        }
        .hm-nav-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.05); }

        .hm-nav-login {
          display: flex; align-items: center; gap: 8px; padding: 9px 20px;
          background: #fff; color: #0f172a; border-radius: 9px; font-size: 13.5px;
          font-weight: 600; font-family: 'Outfit', sans-serif; text-decoration: none;
          transition: background 0.15s, transform 0.1s;
        }
        .hm-nav-login:hover { background: #f1f5f9; }
        .hm-nav-login:active { transform: scale(0.98); }
        .hm-nav-login svg { width: 14px; height: 14px; stroke: currentColor; }

        /* ── Hero ── */
        .hm-hero {
          position: relative; z-index: 1; flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center; text-align: center;
          padding: 90px 24px 72px;
        }

        .hm-hero-tag {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.28);
          border-radius: 20px; padding: 6px 16px; font-size: 12px; color: #a5b4fc;
          font-family: 'Fira Mono', monospace; letter-spacing: 0.04em; margin-bottom: 30px;
        }

        .hm-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: #6366f1; animation: hm-pulse 2s infinite; }

        @keyframes hm-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

        .hm-heading {
          font-size: 58px; font-weight: 700; color: #fff; letter-spacing: -2.5px;
          line-height: 1.08; max-width: 740px; margin-bottom: 22px;
        }
        .hm-heading span { color: #818cf8; }

        .hm-desc {
          font-size: 16px; color: #64748b; max-width: 500px; line-height: 1.75; margin-bottom: 42px;
        }

        .hm-cta-row {
          display: flex; gap: 12px; align-items: center; flex-wrap: wrap;
          justify-content: center; margin-bottom: 72px;
        }

        .hm-cta-primary {
          display: inline-flex; align-items: center; gap: 9px; padding: 14px 30px;
          background: #6366f1; color: #fff; border-radius: 11px; font-size: 14px;
          font-weight: 600; font-family: 'Outfit', sans-serif; text-decoration: none;
          transition: background 0.15s, transform 0.1s, box-shadow 0.15s;
          box-shadow: 0 0 0 0 rgba(99,102,241,0.4);
          letter-spacing: 0.01em;
        }
        .hm-cta-primary:hover {
          background: #4f46e5;
          box-shadow: 0 0 0 6px rgba(99,102,241,0.15);
        }
        .hm-cta-primary:active { transform: scale(0.98); }
        .hm-cta-primary svg { width: 15px; height: 15px; stroke: currentColor; }

        .hm-cta-ghost {
          display: inline-flex; align-items: center; gap: 7px; padding: 14px 26px;
          background: transparent; border: 1px solid rgba(255,255,255,0.1);
          color: #94a3b8; border-radius: 11px; font-size: 14px; font-weight: 500;
          font-family: 'Outfit', sans-serif; text-decoration: none;
          transition: border-color 0.15s, color 0.15s;
        }
        .hm-cta-ghost:hover { border-color: rgba(255,255,255,0.25); color: #e2e8f0; }

        /* Feature cards */
        .hm-cards {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px;
          max-width: 920px; width: 100%;
        }

        .hm-card {
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px; padding: 20px 16px 16px; display: flex;
          flex-direction: column; gap: 10px; text-align: left;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          cursor: default;
        }
        .hm-card:hover {
          background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.14);
          transform: translateY(-3px);
        }

        .hm-card-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hm-card-icon svg { width: 17px; height: 17px; }
        .hm-card-title { font-size: 13px; font-weight: 600; color: #e2e8f0; }
        .hm-card-desc { font-size: 11.5px; color: #475569; line-height: 1.55; font-family: 'Fira Mono', monospace; }

        /* ── Section base ── */
        .hm-section {
          position: relative; z-index: 1; padding: 80px 60px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .hm-section-inner { max-width: 1060px; margin: 0 auto; }

        .hm-section-tag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10.5px; font-family: 'Fira Mono', monospace;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: #475569; margin-bottom: 14px;
        }
        .hm-section-tag::before {
          content: ''; display: block; width: 18px; height: 1px; background: #334155;
        }

        .hm-section-heading {
          font-size: 36px; font-weight: 700; color: #fff;
          letter-spacing: -1px; line-height: 1.15; margin-bottom: 14px;
        }
        .hm-section-heading span { color: #818cf8; }

        .hm-section-sub { font-size: 14.5px; color: #64748b; max-width: 520px; line-height: 1.7; }

        /* ── Scroll-reveal ── */
        [data-section] { transition: opacity 0.6s ease, transform 0.6s ease; }
        [data-section]:not(.is-visible) { opacity: 0; transform: translateY(28px); }
        [data-section].is-visible { opacity: 1; transform: translateY(0); }

        /* ── Stats strip ── */
        .hm-stats-strip {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding: 36px 60px;
        }

        .hm-stats-inner {
          max-width: 1060px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 0;
        }

        .hm-stat-item {
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          padding: 8px 20px;
          border-right: 1px solid rgba(255,255,255,0.06);
        }
        .hm-stat-item:last-child { border-right: none; }

        .hm-stat-num {
          font-size: 36px; font-weight: 700; color: #fff;
          letter-spacing: -1.5px; font-family: 'Fira Mono', monospace;
          line-height: 1;
        }
        .hm-stat-num span { color: #6366f1; }
        .hm-stat-lbl { font-size: 12px; color: #475569; font-family: 'Fira Mono', monospace; }

        /* ── How it works ── */
        .hm-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 44px; }

        .hm-step {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px; padding: 28px 24px;
          transition: border-color 0.2s, background 0.2s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .hm-step:hover { background: rgba(255,255,255,0.06); transform: translateY(-4px); }

        .hm-step-num {
          font-size: 52px; font-weight: 700; font-family: 'Fira Mono', monospace;
          position: absolute; top: 16px; right: 20px; opacity: 0.07; color: #fff;
          letter-spacing: -2px; line-height: 1;
        }

        .hm-step-icon {
          width: 44px; height: 44px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; flex-shrink: 0;
        }
        .hm-step-icon svg { width: 20px; height: 20px; }

        .hm-step-connector {
          display: none;
        }

        .hm-step-title { font-size: 16px; font-weight: 600; color: #fff; margin-bottom: 10px; }
        .hm-step-desc { font-size: 13px; color: #64748b; line-height: 1.65; font-family: 'Fira Mono', monospace; }

        /* ── Roles section ── */
        .hm-roles-layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; margin-top: 44px; align-items: start; }

        .hm-role-tabs { display: flex; flex-direction: column; gap: 8px; }

        .hm-role-tab {
          display: flex; align-items: center; gap: 12px; padding: 14px 18px;
          border-radius: 12px; border: 1px solid transparent;
          cursor: pointer; transition: all 0.18s;
          background: transparent;
          font-family: 'Outfit', sans-serif;
        }
        .hm-role-tab:hover { background: rgba(255,255,255,0.04); }
        .hm-role-tab.active { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }

        .hm-role-tab-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .hm-role-tab-label { font-size: 14px; font-weight: 500; color: #64748b; }
        .hm-role-tab.active .hm-role-tab-label { color: #e2e8f0; }

        .hm-role-panel {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px; padding: 28px;
        }

        .hm-role-panel-header { display: flex; align-items: center; gap: 14px; margin-bottom: 22px; }

        .hm-role-panel-icon {
          width: 46px; height: 46px; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0;
        }
        .hm-role-panel-icon svg { width: 22px; height: 22px; stroke: currentColor; }

        .hm-role-panel-name { font-size: 18px; font-weight: 600; color: #fff; }
        .hm-role-panel-sub { font-size: 12px; color: #475569; font-family: 'Fira Mono', monospace; }

        .hm-role-features { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }

        .hm-role-feature {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 12px 14px; background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06); border-radius: 10px;
        }

        .hm-role-feature-check {
          width: 18px; height: 18px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px;
        }
        .hm-role-feature-check svg { width: 10px; height: 10px; stroke: currentColor; }
        .hm-role-feature-text { font-size: 12.5px; color: #94a3b8; line-height: 1.4; }

        /* ── AI Section ── */
        .hm-ai-block {
          background: linear-gradient(135deg, #0f172a 0%, #0c1629 100%);
          border: 1px solid rgba(6,182,212,0.15);
          border-radius: 20px; padding: 48px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 48px;
          align-items: center; position: relative; overflow: hidden;
          margin-top: 0;
        }

        .hm-ai-block::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 280px; height: 280px; border-radius: 50%;
          background: radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .hm-ai-block::after {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 32px 32px;
          pointer-events: none;
        }

        .hm-ai-left-content { position: relative; z-index: 1; }
        .hm-ai-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: rgba(6,182,212,0.12); border: 1px solid rgba(6,182,212,0.25);
          border-radius: 20px; padding: 5px 14px; font-size: 11px;
          color: #22d3ee; font-family: 'Fira Mono', monospace;
          margin-bottom: 18px;
        }
        .hm-ai-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: #22d3ee; animation: hm-pulse 1.8s infinite; }

        .hm-ai-heading { font-size: 30px; font-weight: 700; color: #fff; letter-spacing: -0.8px; line-height: 1.2; margin-bottom: 14px; }
        .hm-ai-heading span { color: #22d3ee; }
        .hm-ai-desc { font-size: 13.5px; color: #64748b; line-height: 1.7; font-family: 'Fira Mono', monospace; }

        .hm-ai-right-content {
          position: relative; z-index: 1;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(6,182,212,0.15);
          border-radius: 14px; padding: 24px;
        }

        .hm-ai-metric-row { display: flex; gap: 12px; margin-bottom: 16px; }

        .hm-ai-metric {
          flex: 1; background: rgba(6,182,212,0.06); border: 1px solid rgba(6,182,212,0.12);
          border-radius: 10px; padding: 14px;
        }
        .hm-ai-metric-value { font-size: 26px; font-weight: 700; color: #22d3ee; font-family: 'Fira Mono', monospace; letter-spacing: -1px; }
        .hm-ai-metric-label { font-size: 10.5px; color: #475569; font-family: 'Fira Mono', monospace; margin-top: 2px; }

        .hm-ai-progress { margin-bottom: 12px; }
        .hm-ai-progress-header { display: flex; justify-content: space-between; margin-bottom: 6px; }
        .hm-ai-progress-label { font-size: 11.5px; color: #64748b; font-family: 'Fira Mono', monospace; }
        .hm-ai-progress-val { font-size: 11.5px; color: #22d3ee; font-family: 'Fira Mono', monospace; }
        .hm-ai-progress-bar { height: 4px; background: rgba(255,255,255,0.06); border-radius: 2px; overflow: hidden; }
        .hm-ai-progress-fill { height: 100%; border-radius: 2px; background: linear-gradient(90deg, #06b6d4, #22d3ee); }

        /* ── CTA Banner ── */
        .hm-cta-banner {
          background: #6366f1; border-radius: 20px; padding: 52px 48px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 32px; flex-wrap: wrap; position: relative; overflow: hidden;
          margin-top: 0;
        }
        .hm-cta-banner::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px);
          background-size: 36px 36px; pointer-events: none;
        }
        .hm-cta-banner-left { position: relative; z-index: 1; }
        .hm-cta-banner-title { font-size: 26px; font-weight: 700; color: #fff; letter-spacing: -0.5px; margin-bottom: 8px; }
        .hm-cta-banner-sub { font-size: 14px; color: rgba(255,255,255,0.6); }
        .hm-cta-banner-btn {
          position: relative; z-index: 1;
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 30px; background: #fff; color: #4f46e5;
          border-radius: 11px; font-size: 14px; font-weight: 700;
          font-family: 'Outfit', sans-serif; text-decoration: none;
          transition: background 0.15s, transform 0.1s;
          flex-shrink: 0;
        }
        .hm-cta-banner-btn:hover { background: #f1f5f9; }
        .hm-cta-banner-btn:active { transform: scale(0.98); }
        .hm-cta-banner-btn svg { width: 15px; height: 15px; stroke: currentColor; }

        /* ── Footer ── */
        .hm-footer {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.05);
          padding: 24px 60px;
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }

        .hm-footer-text { font-size: 11.5px; color: #334155; font-family: 'Fira Mono', monospace; }

        .hm-role-chips { display: flex; gap: 7px; }

        .hm-chip {
          display: inline-flex; align-items: center; gap: 5px; padding: 4px 11px;
          border-radius: 6px; font-size: 11px; font-weight: 500; border: 1px solid;
          font-family: 'Outfit', sans-serif;
        }
        .hm-chip-dot { width: 5px; height: 5px; border-radius: 50%; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .hm-nav { padding: 18px 24px; }
          .hm-stats-strip { padding: 28px 24px; }
          .hm-stats-inner { grid-template-columns: repeat(2, 1fr); }
          .hm-section { padding: 60px 24px; }
          .hm-steps { grid-template-columns: 1fr; }
          .hm-roles-layout { grid-template-columns: 1fr; }
          .hm-ai-block { grid-template-columns: 1fr; padding: 32px 24px; }
          .hm-cta-banner { padding: 36px 28px; }
          .hm-heading { font-size: 38px; letter-spacing: -1.5px; }
          .hm-cards { grid-template-columns: repeat(2, 1fr); }
          .hm-role-features { grid-template-columns: 1fr; }
          .hm-footer { padding: 20px 24px; }
        }
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
          <div className="hm-nav-right">
            <a href="#how-it-works" className="hm-nav-link">How it works</a>
            <a href="#roles" className="hm-nav-link">Roles</a>
            <a href="#ai" className="hm-nav-link">AI Features</a>
            <Link to="/login" className="hm-nav-login">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </Link>
          </div>
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
            <a href="#how-it-works" className="hm-cta-ghost">
              Explore features
            </a>
          </div>

          <div className="hm-cards" id="features">
            {[
              { bg: "rgba(99,102,241,0.12)", color: "#818cf8", title: "Patients", desc: "Register, track and update patient records with ease.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
              { bg: "rgba(16,185,129,0.1)", color: "#34d399", title: "Doctors", desc: "Manage specialist profiles and assignments.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z"/><path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="10" y1="20" x2="14" y2="20"/></svg> },
              { bg: "rgba(245,158,11,0.1)", color: "#fbbf24", title: "Appointments", desc: "Schedule and track patient visits in real time.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
              { bg: "rgba(239,68,68,0.1)", color: "#f87171", title: "Beds", desc: "Monitor ward occupancy and assign beds instantly.", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4"/><path d="M2 11h20v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7z"/></svg> },
            ].map((c) => (
              <div className="hm-card" key={c.title}>
                <div className="hm-card-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                <div className="hm-card-title">{c.title}</div>
                <div className="hm-card-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Strip */}
        <div className="hm-stats-strip" data-section="stats" className={`hm-stats-strip${visible.stats ? " is-visible" : ""}`}>
          <div className="hm-stats-inner">
            {[
              { val: counters.patients.toLocaleString(), suffix: "+", label: "Patients Served" },
              { val: counters.doctors.toLocaleString(), suffix: "+", label: "Registered Doctors" },
              { val: counters.appointments.toLocaleString(), suffix: "+", label: "Appointments Booked" },
              { val: counters.uptime, suffix: ".9%", label: "System Uptime" },
            ].map((s) => (
              <div className="hm-stat-item" key={s.label}>
                <div className="hm-stat-num">{s.val}<span>{s.suffix}</span></div>
                <div className="hm-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="hm-section" id="how-it-works">
          <div className="hm-section-inner">
            <div data-section="steps" className={visible.steps ? "is-visible" : ""}>
              <div className="hm-section-tag">How it works</div>
              <h2 className="hm-section-heading">Three steps to <span>full control</span></h2>
              <p className="hm-section-sub">From login to live predictions — MedPredict gets your team operational in minutes.</p>

              <div className="hm-steps">
                {STEPS.map((step) => (
                  <div className="hm-step" key={step.num}>
                    <div className="hm-step-num">{step.num}</div>
                    <div className="hm-step-icon" style={{ background: `${step.color}18`, color: step.color, border: `1px solid ${step.color}30` }}>
                      {step.icon}
                    </div>
                    <div className="hm-step-title">{step.title}</div>
                    <div className="hm-step-desc">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Roles */}
        <div className="hm-section" id="roles">
          <div className="hm-section-inner">
            <div data-section="roles" className={visible.roles ? "is-visible" : ""}>
              <div className="hm-section-tag">Access Levels</div>
              <h2 className="hm-section-heading">Built for every <span>team member</span></h2>
              <p className="hm-section-sub">Each role gets a tailored interface with only the tools they need.</p>

              <div className="hm-roles-layout">
                <div className="hm-role-tabs">
                  {Object.entries(ROLES).map(([key, r]) => (
                    <div
                      key={key}
                      className={`hm-role-tab${activeRole === key ? " active" : ""}`}
                      onClick={() => setActiveRole(key)}
                      style={activeRole === key ? { borderColor: `${r.color}40`, background: r.light } : {}}
                    >
                      <span className="hm-role-tab-dot" style={{ background: r.color }} />
                      <span className="hm-role-tab-label">{r.label}</span>
                    </div>
                  ))}
                </div>

                <div className="hm-role-panel" style={{ borderColor: `${ROLES[activeRole].color}20` }}>
                  <div className="hm-role-panel-header">
                    <div className="hm-role-panel-icon" style={{ background: ROLES[activeRole].light, color: ROLES[activeRole].color, border: `1px solid ${ROLES[activeRole].border}` }}>
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
                        <path d="M12 14c-5.33 0-8 2.67-8 4v2h16v-2c0-1.33-2.67-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="hm-role-panel-name">{ROLES[activeRole].label}</div>
                      <div className="hm-role-panel-sub">Role-specific access</div>
                    </div>
                  </div>
                  <div className="hm-role-features">
                    {ROLES[activeRole].features.map((f) => (
                      <div className="hm-role-feature" key={f}>
                        <div className="hm-role-feature-check" style={{ background: ROLES[activeRole].light, color: ROLES[activeRole].color }}>
                          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        </div>
                        <span className="hm-role-feature-text">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Section */}
        <div className="hm-section" id="ai">
          <div className="hm-section-inner">
            <div data-section="ai" className={visible.ai ? "is-visible" : ""}>
              <div className="hm-ai-block">
                <div className="hm-ai-left-content">
                  <div className="hm-ai-badge"><span className="hm-ai-badge-dot" />AI · Powered by ML</div>
                  <div className="hm-ai-heading">Smart predictions,<br /><span>smarter decisions.</span></div>
                  <div className="hm-ai-desc">
                    MedPredict's machine learning model analyzes historical patient data to forecast intake volumes — helping administrators plan staffing, beds, and resources days in advance.
                  </div>
                </div>
                <div className="hm-ai-right-content">
                  <div className="hm-ai-metric-row">
                    <div className="hm-ai-metric">
                      <div className="hm-ai-metric-value">247</div>
                      <div className="hm-ai-metric-label">Predicted patients / week</div>
                    </div>
                    <div className="hm-ai-metric">
                      <div className="hm-ai-metric-value">+12%</div>
                      <div className="hm-ai-metric-label">Forecast change</div>
                    </div>
                  </div>
                  {[
                    { label: "Model Confidence", val: "94%", pct: 94 },
                    { label: "Data Accuracy", val: "98%", pct: 98 },
                    { label: "Prediction Range", val: "7 days", pct: 70 },
                  ].map((p) => (
                    <div className="hm-ai-progress" key={p.label}>
                      <div className="hm-ai-progress-header">
                        <span className="hm-ai-progress-label">{p.label}</span>
                        <span className="hm-ai-progress-val">{p.val}</span>
                      </div>
                      <div className="hm-ai-progress-bar">
                        <div className="hm-ai-progress-fill" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="hm-section">
          <div className="hm-section-inner">
            <div data-section="cta" className={visible.cta ? "is-visible" : ""}>
              <div className="hm-cta-banner">
                <div className="hm-cta-banner-left">
                  <div className="hm-cta-banner-title">Ready to transform your hospital workflow?</div>
                  <div className="hm-cta-banner-sub">Login and start managing smarter with MedPredict.</div>
                </div>
                <Link to="/login" className="hm-cta-banner-btn">
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  Get Started
                </Link>
              </div>
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