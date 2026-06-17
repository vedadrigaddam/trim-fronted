// import React, { useState, useEffect } from "react";
// import { AnalyticsView } from "./components/AnalyticsView";

// export default function App() {
//   const [links, setLinks] = useState([]);
//   const [longUrl, setLongUrl] = useState('');
//   const [customAlias, setCustomAlias] = useState('');
//   const [activeMetrics, setActiveMetrics] = useState(null);
//   const [error, setError] = useState('');

//   const load = () => { fetch("http://localhost:5000/api/links").then(r => r.json()).then(setLinks); };
//   useEffect(() => { load(); }, []);

//   const send = (e: any) => {
//     e.preventDefault(); setError('');
//     fetch("http://localhost:5000/api/links", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ longUrl, customAlias }) })
//       .then(async r => { const d = await r.json(); if (!r.ok) throw new Error(d.error || 'Conflict'); setLongUrl(''); setCustomAlias(''); load(); })
//       .catch(err => setError(err.message));
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto", fontFamily: "system-ui, sans-serif", padding: "0 20px" }}>
//       <h1>Trim Redirection Hub</h1>
//       <form onSubmit={send} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
//         <input placeholder="Paste long destination URL here..." value={longUrl} onChange={e => setLongUrl(e.target.value)} required style={{ flex: 2, padding: "8px" }} />
//         <input placeholder="Alias (Optional)" value={customAlias} onChange={e => setCustomAlias(e.target.value)} style={{ flex: 1, padding: "8px" }} />
//         <button type="submit" style={{ padding: "8px 16px", background: "#2563eb", color: "#fff", border: "none", cursor: "pointer" }}>Trim Link</button>
//       </form>
//       {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
      
//       {activeMetrics && <AnalyticsView data={activeMetrics} onClose={() => setActiveMetrics(null)} />}

//       <h2>Active Generated Shortcuts Registry</h2>
//       {links.map((l: any) => (
//         <div key={l.id} style={{ display: "flex", justifyContent: "space-between", padding: "12px", border: "1px solid #d1d5db", background: "#fff", marginBottom: "8px", borderRadius: "4px" }}>
//           <div>
//             <a href={l.shortUrl} target="_blank" rel="noreferrer" style={{ fontWeight: "bold" }}>{l.shortUrl}</a>
//             <div style={{ fontSize: "0.85rem", color: "#6b7280" }}>{l.longUrl}</div>
//           </div>
//           <div>
//             <span style={{ marginRight: "10px" }}>Clicks: {l.clicksCount}</span>
//             <button onClick={() => { fetch('http://localhost:5000/api/links/' + l.shortCode + '/analytics').then(r => r.json()).then(setActiveMetrics); }} style={{ cursor: "pointer" }}>Analyze</button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import { AnalyticsView } from "./components/AnalyticsView";

const API_URL = import.meta.env.VITE_API_URL || "https://trim-backend.vercel.app";

export default function App() {
  const [links, setLinks] = useState<any[]>([]);
  const [longUrl, setLongUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [activeMetrics, setActiveMetrics] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => {
    fetch(`${API_URL}/api/links`)
      .then((r) => {
        if (!r.ok) {
          throw new Error(`Failed to load links: ${r.statusText}`);
        }
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setLinks(data);
        } else {
          console.error("Expected array from API, got:", data);
          setError("Received invalid data format from server.");
        }
      })
      .catch((e) => {
        console.error("API error:", e);
        setError(e.message || "Failed to connect to the backend server.");
      });
  };

  useEffect(() => {
    load();
  }, []);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    fetch(`${API_URL}/api/links`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ longUrl, customAlias })
    })
      .then(async (r) => {
        let errorMsg = 'Redirection configuration conflict.';
        try {
          const d = await r.json();
          if (!r.ok) {
            throw new Error(d.error || errorMsg);
          }
          setLongUrl('');
          setCustomAlias('');
          load();
        } catch (jsonErr: any) {
          if (!r.ok) {
            throw new Error(jsonErr.message || `Server returned error status ${r.status}`);
          }
          throw jsonErr;
        }
      })
      .catch((err) => {
        console.error("Create link error:", err);
        setError(err.message || 'Could not connect to the backend server.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ 
      backgroundColor: "#f8fafc", 
      minHeight: "100vh", 
      padding: "60px 20px", 
      color: "#0f172a", 
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundImage: "radial-gradient(circle at top right, #e0f2fe 0%, transparent 40%)"
    }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        {/* Brand Header */}
        <header style={{ marginBottom: '40px', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            letterSpacing: '-0.04em', 
            color: '#1e3a8a', 
            margin: '0 0 10px 0',
            background: "linear-gradient(to right, #1e3a8a, #2563eb, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Trim
          </h1>
          <p style={{ color: "#64748b", fontSize: "1.1rem", margin: 0, fontWeight: "500" }}>
            Clean URLs. Instant analytics. Resilient delivery.
          </p>
        </header>

        {/* Input Widget Card */}
        <section style={{ 
          background: '#ffffff', 
          padding: '32px', 
          borderRadius: '16px', 
          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)', 
          border: '1px solid #f1f5f9',
          marginBottom: '35px',
          transition: 'transform 0.2s ease'
        }}>
          <form onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '15px', width: '100%' }}>
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Destination Long URL</label>
                <input 
                  type="url"
                  placeholder="https://example.com/deep/resource/path" 
                  value={longUrl} 
                  onChange={e => setLongUrl(e.target.value)} 
                  required 
                  style={{ 
                    width: '95%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '1rem',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
                  }} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Alias (Optional)</label>
                <input 
                  type="text"
                  placeholder="custom-slug" 
                  value={customAlias} 
                  onChange={e => setCustomAlias(e.target.value)} 
                  style={{ 
                    width: '90%', 
                    padding: '12px 16px', 
                    borderRadius: '8px', 
                    border: '1px solid #cbd5e1', 
                    fontSize: '1rem',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    outline: 'none'
                  }} 
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                padding: '14px', 
                background: loading ? '#93c5fd' : 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)', 
                color: '#ffffff', 
                border: 'none', 
                borderRadius: '8px', 
                fontSize: '1rem',
                fontWeight: '600', 
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
                transition: 'all 0.2s ease',
                textAlign: 'center'
              }}
            >
              {loading ? 'Trimming Link...' : 'Shorten & Secure Link'}
            </button>
          </form>
          
          {error && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              color: '#dc2626', 
              background: '#fef2f2', 
              padding: '12px 16px', 
              borderRadius: '8px', 
              marginTop: '20px', 
              border: '1px solid #fee2e2',
              fontWeight: '500',
              fontSize: '0.95rem'
            }}>
              ⚠️ {error}
            </div>
          )}
        </section>
        
        {/* Analytics Section Component */}
        {activeMetrics && <AnalyticsView data={activeMetrics} onClose={() => setActiveMetrics(null)} />}

        {/* Shortcuts Management Registry */}
        <section>
          <h2 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#1e293b', 
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            Active Shortcuts Registry
          </h2>
          
          {links.length === 0 ? (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px', 
              background: '#ffffff', 
              borderRadius: '12px', 
              border: '1px dashed #cbd5e1',
              color: '#64748b'
            }}>
              No redirection keys established yet. Secure your first shortcut link above.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {links.map((l: any) => (
                <div 
                  key={l.id} 
                  style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center', 
                    padding: '18px 24px', 
                    background: '#ffffff', 
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ maxWidth: '65%' }}>
                    <a 
                      href={l.shortUrl} 
                      target="_blank" 
                      rel="noreferrer" 
                      style={{ 
                        fontSize: '1.15rem', 
                        fontWeight: '600', 
                        color: '#2563eb', 
                        textDecoration: 'none',
                        letterSpacing: '-0.01em'
                      }}
                    >
                      {l.shortUrl}
                    </a>
                    <div style={{ 
                      fontSize: '0.85rem', 
                      color: '#64748b', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap', 
                      marginTop: '4px',
                      fontWeight: '400'
                    }}>
                      {l.longUrl}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        padding: '6px 12px', 
                        background: '#f0fdf4', 
                        color: '#16a34a', 
                        borderRadius: '20px', 
                        fontSize: '0.85rem', 
                        fontWeight: '700',
                        border: '1px solid #bbf7d0'
                      }}>
                        {l.clicksCount} clicks
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setError('');
                        fetch(`${API_URL}/api/links/${l.shortCode}/analytics`)
                          .then((r) => {
                            if (!r.ok) {
                              throw new Error(`Failed to load analytics: ${r.statusText}`);
                            }
                            return r.json();
                          })
                          .then(setActiveMetrics)
                          .catch((err) => {
                            console.error("Analytics fetch error:", err);
                            setError(err.message || "Failed to retrieve analytics.");
                          });
                      }} 
                      style={{ 
                        cursor: 'pointer',
                        padding: '8px 16px',
                        background: '#f1f5f9',
                        color: '#334155',
                        border: '1px solid #e2e8f0',
                        borderRadius: '6px',
                        fontWeight: '600',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      Analyze
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}