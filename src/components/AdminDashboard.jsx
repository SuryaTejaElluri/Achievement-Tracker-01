// src/components/AdminDashboard.jsx
import React, { useEffect, useRef, useState } from "react";

export default function AdminDashboard() {
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      student: "Priya Sharma",
      event: "State Level Hackathon",
      category: "Technical",
      date: "2025-09-21",
    },
    {
      id: 2,
      student: "Rohan Kumar",
      event: "Blood Donation Camp",
      category: "Volunteering",
      date: "2025-09-20",
    },
  ]);

  const [totalStudents] = useState(450);
  const [totalRecords] = useState(1230);

  const [modalRecord, setModalRecord] = useState(null);
  const starsRef = useRef(null);

  useEffect(() => {
    const saved = [];
    const toLock = [
      document.documentElement,
      document.body,
      document.getElementById("root") || document.body,
    ].filter(Boolean);

    toLock.forEach((el) => {
      saved.push({
        el,
        overflow: el.style.overflow,
        height: el.style.height,
        margin: el.style.margin,
      });
      el.style.setProperty("overflow", "hidden", "important");
      el.style.setProperty("height", "100%", "important");
      el.style.setProperty("margin", "0", "important");
    });

    return () => {
      saved.forEach(({ el, overflow, height, margin }) => {
        el.style.overflow = overflow || "";
        el.style.height = height || "";
        el.style.margin = margin || "";
      });
    };
  }, []);

  useEffect(() => {
    const container = starsRef.current;
    if (!container) return;

    container.style.position = "fixed";
    container.style.inset = "0";
    container.style.pointerEvents = "none";
    container.style.overflow = "hidden";
    container.style.zIndex = "0";

    const numStars = 70;
    const elements = [];
    for (let i = 0; i < numStars; i++) {
      const star = document.createElement("div");
      star.className = "ad-star";
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      star.style.animationDuration = `${Math.random() * 6 + 4}s`;
      star.style.animationDelay = `${Math.random() * 3}s`;

      container.appendChild(star);
      elements.push(star);
    }

    return () => elements.forEach((el) => el.remove());
  }, []);

  function handleApprove(id) {
    const rec = submissions.find((s) => s.id === id);
    if (rec) {
      alert(`✅ Approved submission of ${rec.student}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
  }

  function handleReject(id) {
    const rec = submissions.find((s) => s.id === id);
    if (rec) {
      alert(`❌ Rejected submission of ${rec.student}`);
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
    }
  }

  function openDetails(id) {
    const rec = submissions.find((s) => s.id === id);
    setModalRecord(rec || null);
  }

  function closeModal() {
    setModalRecord(null);
  }

  const pendingCount = submissions.length;

  return (
    <div className="ad-root" aria-live="polite">
      <style>{`
        html, body, #root { height: 100%; margin: 0; padding: 0; box-sizing: border-box; }

        .ad-root {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at bottom, #000011 0%, #000022 100%);
          color: #ffffff;
          overflow: hidden;
          font-family: 'Segoe UI', system-ui, -apple-system, Roboto, 'Helvetica Neue', Arial;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .ad-star {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          box-shadow: 0 0 6px rgba(255,255,255,0.95), 0 0 10px rgba(255,255,255,0.6);
          opacity: 0.95;
          transform: translate3d(0,0,0);
          will-change: transform, opacity;
        }
        @keyframes ad-fall {
          0% { transform: translateY(-8vh) translateX(0); opacity: 1; }
          100% { transform: translateY(110vh) translateX(30px); opacity: 0; }
        }

        .ad-navbar {
          position: relative;
          z-index: 10;
          background-color: #0b0c2a;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .ad-brand { color: #fff; font-weight: 700; font-size: 18px; }
        .ad-nav { display: flex; gap: 18px; align-items: center; color: rgba(255,255,255,0.9); }

        .ad-container {
          position: relative;
          z-index: 5;
          width: 100%;
          max-width: 1200px;
          margin: 22px auto;
          padding: 0 20px 28px 20px;
          box-sizing: border-box;
        }

        h2.ad-h2 { margin: 8px 0 18px 0; font-size: 28px; }

        .ad-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
          margin-bottom: 22px;
        }
        @media (max-width: 820px) { .ad-stats { grid-template-columns: 1fr; } }

        .ad-card {
          background: rgba(20,20,50,0.6);
          border-radius: 12px;
          padding: 18px;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .ad-card h5 { margin: 0 0 8px 0; color: #fff; font-size: 14px; font-weight: 700; }
        .ad-card .ad-stat { font-size: 28px; font-weight: 800; margin-top: 6px; }

        .ad-submission-card {
          margin-top: 10px;
          background: rgba(20,20,50,0.5);
          border-radius: 12px;
          padding: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow: 0 12px 30px rgba(0,0,0,0.55);
        }

        .ad-table-viewport {
          max-height: calc(100vh - 300px);
          overflow: auto;
          padding-right: 6px;
          margin-top: 8px;
        }

        .ad-table {
          width: 100%;
          border-collapse: collapse;
          color: #fff;
          min-width: 720px;
        }
        .ad-table thead tr { background: rgba(0,0,50,0.6); }
        .ad-table thead th { text-align: left; padding: 10px 12px; font-weight: 700; font-size: 13px; position: sticky; top: 0; z-index: 2; }
        .ad-table tbody td { padding: 12px; border-bottom: 1px solid rgba(255,255,255,0.03); font-size: 14px; vertical-align: middle; }

        .ad-actions { display: flex; gap: 8px; align-items: center; }

        .ad-btn { padding: 6px 10px; border-radius: 8px; border: none; cursor: pointer; font-weight: 700; font-size: 13px; }
        .ad-btn-success { background: linear-gradient(180deg,#28a745,#1f8a3f); color: #06270b; box-shadow: 0 6px 16px rgba(40,167,69,0.12); }
        .ad-btn-danger { background: linear-gradient(180deg,#e55353,#c23b3b); color: #fff; box-shadow: 0 6px 16px rgba(229,83,83,0.12); }
        .ad-btn-info { background: linear-gradient(180deg,#3fa9ff,#2b8fe0); color: #fff; box-shadow: 0 6px 16px rgba(63,169,255,0.12); }

        .ad-modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; z-index:1200; }
        .ad-modal { width: 100%; max-width: 560px; background: rgba(10,10,30,0.95); border-radius: 10px; border: 1px solid rgba(255,255,255,0.06); padding: 18px; box-shadow: 0 20px 60px rgba(0,0,0,0.6); }

        @media (max-width: 540px) {
          .ad-container { padding: 0 12px; }
          .ad-table { min-width: 0; }
        }
      `}</style>

      <div ref={starsRef} aria-hidden="true"></div>

      <div className="ad-navbar">
        <div className="ad-brand">AchieveTrack [Admin Panel]</div>
        <div className="ad-nav">
          <div style={{ color: "rgba(255,255,255,0.9)" }}>Welcome, Admin!</div>
          <a href="/" style={{ color: "rgba(255,255,255,0.9)" }}>Logout</a>
        </div>
      </div>

      <main className="ad-container" role="main">
        <h2 className="ad-h2">Admin Dashboard</h2>

        <div className="ad-stats">
          <div className="ad-card">
            <h5>Pending Approvals</h5>
            <div className="ad-stat">{pendingCount}</div>
          </div>

          <div className="ad-card">
            <h5>Total Students</h5>
            <div className="ad-stat">{totalStudents}</div>
          </div>

          <div className="ad-card">
            <h5>Total Records</h5>
            <div className="ad-stat">{totalRecords}</div>
          </div>
        </div>

        <div className="ad-submission-card">
          <h5 style={{ margin: "0 0 12px 0" }}>Submissions Requiring Approval</h5>

          <div className="ad-table-viewport" role="region" aria-label="Submissions table">
            <table className="ad-table" role="table" aria-label="Submissions table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Event Name</th>
                  <th>Category</th>
                  <th>Submitted On</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.student}</td>
                    <td>{s.event}</td>
                    <td>{s.category}</td>
                    <td>{s.date}</td>
                    <td>
                      <div className="ad-actions">
                        <button className="ad-btn ad-btn-success" onClick={() => handleApprove(s.id)}>Approve</button>
                        <button className="ad-btn ad-btn-danger" onClick={() => handleReject(s.id)}>Reject</button>
                        <button className="ad-btn ad-btn-info" onClick={() => openDetails(s.id)}>Details</button>
                      </div>
                    </td>
                  </tr>
                ))}

                {submissions.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ textAlign: "center", padding: 24, color: "rgba(255,255,255,0.75)" }}>
                      No pending submissions.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {modalRecord && (
        <div className="ad-modal-backdrop" role="dialog" aria-modal="true">
          <div className="ad-modal">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h5>Submission Details</h5>
              <button className="ad-btn" onClick={closeModal} style={{ background: "transparent", color: "#fff", border: "none", fontSize: 18 }}>✕</button>
            </div>

            <div>
              <p><strong>Student:</strong> {modalRecord.student}</p>
              <p><strong>Event:</strong> {modalRecord.event}</p>
              <p><strong>Category:</strong> {modalRecord.category}</p>
              <p><strong>Submitted On:</strong> {modalRecord.date}</p>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
              <button className="ad-btn ad-btn-success" onClick={() => { handleApprove(modalRecord.id); closeModal(); }}>Approve</button>
              <button className="ad-btn ad-btn-danger" onClick={() => { handleReject(modalRecord.id); closeModal(); }}>Reject</button>
              <button className="ad-btn" onClick={closeModal} style={{ background: "rgba(255,255,255,0.06)", color: "#fff" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
