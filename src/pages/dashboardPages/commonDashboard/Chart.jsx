import React from "react"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"


export default function Chart({chartData}) {



 const data = chartData?.map(item => ({
    month: item.month,
    value: Number(item.count),
  }));



const CustomTooltip = ({ active, payload, label }) => {
   if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontWeight: 600, color: "#333", margin: "0 0 4px 0" }}>
         Total: {payload[0].value}
        </p>
      </div>
    )
  }

  return null
}

const formatYAxis = (value) => {
  return `$${value / 1000}k`
}


  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        padding: "24px",
      }}
    >
      <div style={{ height: "400px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#4ade80" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
              <linearGradient id="fillGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(74, 222, 128, 0.2)" />
                <stop offset="100%" stopColor="rgba(167, 139, 250, 0.05)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              tickFormatter={formatYAxis}
            />
            <Tooltip content={<CustomTooltip />} cursor={false} wrapperStyle={{ outline: "none" }} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="url(#colorGradient)"
              fill="url(#fillGradient)"
              strokeWidth={2}
              activeDot={{
                r: 6,
                fill: "#4ade80",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
