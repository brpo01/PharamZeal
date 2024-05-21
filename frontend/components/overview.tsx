"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface OverviewProps {
  data: any[];
  ticker: boolean;
}

export const Overview: React.FC<OverviewProps> = ({ data, ticker }) => {
  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => (ticker ? `£${value}` : `${value}`)}
        />
        <Bar dataKey='total' fill='#3498db' radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};
