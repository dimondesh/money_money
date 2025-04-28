import React from 'react';
import { AreaChart, Area, ResponsiveContainer, Tooltip, Dot } from 'recharts';
import styles from './SidebarGraph.module.css';

const graphData = [
  { v: 8 }, { v: 15 }, { v: 18 }, { v: 20 }, { v: 16 },
  { v: 12 }, { v: 10 }, { v: 14 }, { v: 19 }, { v: 24 },
  { v: 28 }, { v: 30 }, { v: 27 }, { v: 29 }, { v: 26 },
  { v: 28 }
];

const CustomizedDot = (props) => {
  const { cx, cy, stroke, payload, value, index } = props;
  const showAtIndexes = [4, 11];

  if (showAtIndexes.includes(index)) {
    return (
      <svg x={cx - 4} y={cy - 4} width="8" height="8" fill="white" viewBox="0 0 1024 1024">
         <circle cx="512" cy="512" r="512" fill="var(--white)"/>
      </svg>
    );
  }
  return null;
};


const SidebarGraph = () => {
  return (
    <div className={styles.graphWrapper}>
      <ResponsiveContainer width="100%" height={80}>
        <AreaChart
          data={graphData}
          margin={{ top: 10, right: 15, left: 15, bottom: 0 }}
        >
          <defs>
            <linearGradient id="sidebarGraphGradientDef" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--white)" stopOpacity={0.4}/>
              <stop offset="95%" stopColor="var(--white)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <Tooltip content={() => null} cursor={false} />
          <Area
            type="monotone"
            dataKey="v"
            stroke="var(--white)"
            fillOpacity={1}
            fill="url(#sidebarGraphGradientDef)"
            strokeWidth={1.5}
            dot={<CustomizedDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SidebarGraph;