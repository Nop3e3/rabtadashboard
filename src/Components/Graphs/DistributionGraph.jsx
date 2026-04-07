import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import './Dashboard.css';
const data = [
  { name: 'Entrepreneurs', value: 87, color: '#1d4ed8' },
  { name: 'Suppliers', value: 11, color: '#84cc16' },
  { name: 'Mentors', value: 3, color: '#e2e873' },
];

export const DistributionGraph = () => (
  <div className="graph-card">
    <div className="graph-header"><h3 className="graph-title">User Distribution</h3></div>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={0}
          outerRadius={100}
          paddingAngle={0}
          dataKey="value"
          stroke="none"
        >
          {data.map((entry, index) => <Cell key={index} fill={entry.color} />)}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '10px' }}>
      {data.map(d => (
        <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color }} />
          <span>{d.name} {d.value}%</span>
        </div>
      ))}
    </div>
  </div>
);
