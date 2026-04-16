"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const COLORS = ['#1d4d3f', '#8b3dff', '#3eb364']; 

export default function AnalyticsChart({ data }) {
  const hasData = data.some(item => item.value > 0);

  if (!hasData) {
    return <div className="h-[300px] flex items-center justify-center text-gray-400 italic">No data yet.</div>;
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
    const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="font-bold text-sm">
        {value > 0 ? value : ""}
      </text>
    );
  };

  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={8}
            dataKey="value"
            labelLine={false}
            label={renderCustomizedLabel}
            cornerRadius={10} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
            ))}
          </Pie> 
          
          <Tooltip 
             contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
          />
          
         
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle" 
            iconSize={10} 
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
