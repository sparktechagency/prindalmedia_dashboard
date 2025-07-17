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

const data = [
  { month: "Jan", value: 1000 },
  { month: "Feb", value: 3000 },
  { month: "Mar", value: 2000 },
  { month: "Apr", value: 4500 },
  { month: "May", value: 3500 },
  { month: "Jun", value: 4000 },
  { month: "Jul", value: 2500 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const currentIndex = data.findIndex((item) => item.month === label)
    const previousValue = currentIndex > 0 ? data[currentIndex - 1].value : 0
    const currentValue = payload[0].value
    const difference = currentValue - previousValue
    const formattedDifference = (difference / 1000).toFixed(1)

    const date = new Date()
    const day = date.getDate()
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]
    const currentMonth = monthNames[date.getMonth()]
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const formattedTime = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`

    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ fontWeight: 600, color: "#333", margin: "0 0 4px 0" }}>
          {difference > 0 ? "+" : ""}
          {formattedDifference}k
        </p>
        <p style={{ fontSize: "12px", color: "#888", margin: "0" }}>
          {day} {currentMonth}, {formattedTime}
        </p>
        <div
          style={{
            width: "8px",
            height: "8px",
            backgroundColor: "#4ade80",
            margin: "4px auto 0",
          }}
        ></div>
      </div>
    )
  }

  return null
}

const formatYAxis = (value) => {
  return `$${value / 1000}k`
}

export default function Chart() {
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
