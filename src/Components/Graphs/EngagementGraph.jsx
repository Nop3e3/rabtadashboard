import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const usersData = [
  { name: "Jan", val: 1200 },
  { name: "Feb", val: 1950 },
  { name: "Mar", val: 2500 },
  { name: "Apr", val: 3200 },
  { name: "May", val: 4100 },
  { name: "Jun", val: 5400 },
];

const suppliersData = [
  { name: "Jan", val: 1300 },
  { name: "Feb", val: 1750 },
  { name: "Mar", val: 2600 },
  { name: "Apr", val: 3150 },
  { name: "May", val: 4250 },
  { name: "Jun", val: 5700 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Lexend+Exa:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

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
    width: 520px;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.04), 0 24px 60px rgba(0,0,0,0.6);
    font-family: 'Lexend Exa', sans-serif;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }

  .card-title {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
  }

  .toggle-wrapper {
    display: flex;
    align-items: center;
    background: #2a2a30;
    border-radius: 999px;
    padding: 4px;
    gap: 2px;
    border: 1px solid rgba(255,255,255,0.06);
  }

  .toggle-btn {
    font-family: 'Lexend Exa', sans-serif;
    font-size: 12px;
    font-weight: 500;
    padding: 7px 16px;
    border-radius: 999px;
    border: none;
    cursor: pointer;
    transition: all 0.22s ease;
    color: #777;
    background: transparent;
    letter-spacing: 0.1px;
  }

  .toggle-btn.active {
    background: #3a3d2a;
    color: #d4e04a;
    box-shadow: 0 0 0 1px rgba(212,224,74,0.25);
  }

  .toggle-btn:not(.active):hover {
    color: #aaa;
    background: rgba(255,255,255,0.04);
  }

  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: #2e2e35 !important;
    stroke-dasharray: 5 5 !important;
  }

  .recharts-tooltip-wrapper .custom-tooltip {
    background: #16161a;
    border: 1px solid #2e2e35;
    border-radius: 8px;
    padding: 8px 14px;
    font-family: 'Lexend Exa', sans-serif;
    font-size: 12px;
    color: #d4e04a;
  }
`;

const CustomDot = (props) => {
  const { cx, cy } = props;
  return (
    <g>
      <circle cx={cx} cy={cy} r={6} fill="#1a1a1f" stroke="#d4e04a" strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={2.5} fill="#d4e04a" />
    </g>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <div style={{ color: "#888", marginBottom: 2 }}>{label}</div>
        <div style={{ fontWeight: 600 }}>{payload[0].value.toLocaleString()}</div>
      </div>
    );
  }
  return null;
};

export default function EngagementGraph() {
  const [tab, setTab] = useState("Suppliers");
  const data = tab === "Suppliers" ? suppliersData : usersData;

  return (
    <>
      <style>{styles}</style>
      <div className="graph-card">
        <div className="card-header">
          <div className="card-title">User Engagement</div>
          <div className="toggle-wrapper">
            {["Users", "Suppliers"].map((t) => (
              <button
                key={t}
                className={`toggle-btn ${tab === t ? "active" : ""}`}
                onClick={() => setTab(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={290}>
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="5 5"
              stroke="#2e2e35"
              vertical={true}
              horizontal={true}
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#666",
                fontSize: 12,
                fontFamily: "Lexend Exa",
                dy: 10,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: "#666",
                fontSize: 12,
                fontFamily: "Lexend Exa",
              }}
              ticks={[0, 1500, 3000, 4500, 6000]}
              domain={[0, 6000]}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              type="monotone"
              dataKey="val"
              stroke="#d4e04a"
              strokeWidth={2.5}
              dot={<CustomDot />}
              activeDot={{ r: 7, fill: "#d4e04a", stroke: "#1a1a1f", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}