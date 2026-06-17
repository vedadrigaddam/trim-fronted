// import React from "react";
// export const AnalyticsView = ({ data, onClose }: any) => (
//   <div style={{ background: "#eff6ff", border: "1px solid #bfdbfe", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//       <h3>Real-time Metrics Tracker</h3>
//       <button onClick={onClose} style={{ background: "#ef4444", color: "#fff", border: "none", cursor: "pointer", padding: "4px 8px" }}>Close</button>
//     </div>
//     <p>Total Confirmed Clicks: <strong>{data.totalClicks}</strong></p>
//     <div>
//       <h4>Device Breakdown</h4>
//       {Object.entries(data.deviceBreakdown).map(([k, v]: any) => <div key={k}>{k}: <strong>{v}</strong></div>)}
//       <h4>Referrer Breakdown</h4>
//       {Object.entries(data.referrerBreakdown).map(([k, v]: any) => <div key={k}>{k}: <strong>{v}</strong></div>)}
//     </div>
//   </div>
// );


import React from "react";

export const AnalyticsView = ({ data, onClose }: any) => {
  return (
    <div style={{ 
      background: "#ffffff", 
      border: "1px solid #e2e8f0", 
      padding: "28px", 
      borderRadius: "16px", 
      marginBottom: "30px",
      boxShadow: "0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.02em' }}>
          Real-Time Performance Explorer
        </h3>
        <button 
          onClick={onClose} 
          style={{ 
            background: "#f1f5f9", 
            color: "#64748b", 
            border: "none", 
            cursor: "pointer", 
            padding: "6px 12px", 
            borderRadius: "6px",
            fontWeight: "600",
            fontSize: "0.85rem"
          }}
        >
          Dismiss
        </button>
      </div>
      
      <div style={{ 
        background: '#f8fafc', 
        padding: '16px 20px', 
        borderRadius: '8px', 
        marginBottom: '24px', 
        border: '1px solid #f1f5f9',
        display: 'inline-block'
      }}>
        <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Aggregate Impressions</span>
        <div style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1e3a8a', marginTop: '4px' }}>{data.totalClicks}</div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        
        {/* Device Matrix Card */}
        <div style={{ border: '1px solid #f1f5f9', padding: '16px', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Device Families</h4>
          {Object.entries(data.deviceBreakdown).length === 0 ? <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Pending logs...</p> : 
            Object.entries(data.deviceBreakdown).map(([k, v]: any) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' }}>
                <span style={{ color: '#475569', fontWeight: '500' }}>💻 {k}</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{v}</span>
              </div>
            ))
          }
        </div>
        
        {/* Referrers Matrix Card */}
        <div style={{ border: '1px solid #f1f5f9', padding: '16px', borderRadius: '8px', backgroundColor: '#fafafa' }}>
          <h4 style={{ margin: '0 0 12px 0', fontSize: '0.9rem', color: '#334155', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Traffic Sources</h4>
          {Object.entries(data.referrerBreakdown).length === 0 ? <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Pending logs...</p> : 
            Object.entries(data.referrerBreakdown).map(([k, v]: any) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f1f5f9', fontSize: '0.95rem' }}>
                <span style={{ color: '#475569', fontWeight: '500', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>📍 {k}</span>
                <span style={{ fontWeight: '700', color: '#0f172a' }}>{v}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};