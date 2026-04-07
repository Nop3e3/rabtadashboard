import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, Tooltip, Cell
} from 'recharts';

const data = [
  { name: 'Sourcing',     val: 450 },
  { name: 'Costing',      val: 380 },
  { name: 'Inventory',    val: 320 },
  { name: 'Marketing',    val: 290 },
  { name: 'Negotiation',  val: 260 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@300;400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #111;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: 'Lexend Exa', sans-serif;
  }

  .graph-card {
    background: #1a1a1f;
    border-radius: 20px;
    padding: 28px 28px 20px;
    width: 440px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.6);
    font-family: 'Lexend Exa', sans-serif;
  }

  .card-title {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
    margin-bottom: 24px;
    font-family: 'Lexend Exa', sans-serif;
  }

  .custom-tooltip-bar {
    background: #16161a;
    border: 1px solid #2e2e35;
    border-radius: 8px;
    padding: 8px 14px;
    font-family: 'Lexend Exa', sans-serif;
    font-size: 12px;
  }
`;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip-bar">
        <div style={{ color: '#666', fontSize: 11, marginBottom: 2 }}>{label}</div>
        <div style={{ color: '#d4e04a', fontWeight: 600 }}>{payload[0].value}</div>
      </div>
    );
  }
  return null;
};

export default function ProgressGraph() {
  return (
    <>
      <style>{styles}</style>
      <div className="graph-card">
        <div className="card-title">Learning Progress</div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barCategoryGap="30%">
            <defs>
              <linearGradient id="yellowGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d4e04a" stopOpacity={1} />
                <stop offset="100%" stopColor="#d4e04a" stopOpacity={0.15} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#2e2e35" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 11, fontFamily: 'Lexend Exa' }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 11, fontFamily: 'Lexend Exa' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
            <Bar
              dataKey="val"
              fill="url(#yellowGrad)"
              barSize={36}
              radius={[5, 5, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}