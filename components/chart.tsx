"use client";
import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface InstrumentData {
  date: string;
  price: number;
}

interface ChartProps {
  data: InstrumentData[];
  selectedInstrument: string;
  selectedTab: "price" | "movingAverage";
}

// Function to calculate moving average based on user-selected window size
const calculateMovingAverage = (data: InstrumentData[], windowSize: number) => {
  return data.map((item, index) => {
    if (index < windowSize - 1) return { ...item, movingAverage: null };

    const sum = data
      .slice(index - windowSize + 1, index + 1)
      .reduce((acc, val) => acc + val.price, 0);

    return { ...item, movingAverage: sum / windowSize };
  });
};

const instrumentName: Record<string, string> = {
  Inst1: "Instrument 1",
  Inst2: "Instrument 2",
};

export default function Chart({
  data,
  selectedInstrument,
  selectedTab,
}: ChartProps) {
  const [visibleCount, setVisibleCount] = useState(20); // Default to showing last 20 points
  const [movingAvgWindow, setMovingAvgWindow] = useState(5); // Default moving average window size

  // Sort and limit data points
  const sortedData = [...data]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-visibleCount)
    .map((item) => ({
      ...item,
      date: new Date(item.date).toLocaleDateString("dk-DK", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

  const processedData = calculateMovingAverage(sortedData, movingAvgWindow);

  return (
    <div className="p-4 border rounded-lg bg-white shadow w-full">
      <h2 className="text-lg font-semibold mb-2">
        {instrumentName[selectedInstrument]} - Time Series Analysis
      </h2>

      <div className="mb-4 flex flex-col md:flex-row items-center gap-4">
        {/* Select visible data count */}
        <div className="flex items-center gap-2">
          <label className="text-sm">Show last:</label>
          <select
            className="border p-1 rounded-md"
            value={visibleCount}
            onChange={(e) => setVisibleCount(Number(e.target.value))}
          >
            <option value={20}>20 points</option>
            <option value={50}>50 points</option>
            <option value={100}>100 points</option>
            <option value={data.length}>All data</option>
          </select>
        </div>

        {/* Moving Average Window (Slider) - Only shows if "Moving Average" is selected */}
        {selectedTab === "movingAverage" && (
          <div className="flex items-center gap-2">
            <label className="text-sm">Moving Avg Window:</label>
            <input
              type="range"
              min="2"
              max="50"
              value={movingAvgWindow}
              onChange={(e) => setMovingAvgWindow(Number(e.target.value))}
              className="cursor-pointer"
            />
            <span className="text-sm">{movingAvgWindow} days</span>
          </div>
        )}
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={processedData}
          margin={{ top: 10, right: 30, left: 10, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            angle={-45}
            textAnchor="end"
            height={70}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            domain={["auto", "auto"]}
            tickFormatter={(value) => `$${value.toFixed(2)}`}
          />
          <Tooltip
            formatter={(value: number, name: string) => {
              if (name === "Price") return [`$${value.toFixed(2)}`, "Price"];
              if (name.includes("Moving"))
                return [
                  `$${value.toFixed(2)}`,
                  `${movingAvgWindow}-Day Moving Avg`,
                ];
              return value;
            }}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Legend />

          {/* Price Line - Always Visible */}
          <Line
            type="monotone"
            dataKey="price"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
            name="Price"
          />

          {/* Moving Average Line - Only Visible if "Moving Average" is Selected */}
          {selectedTab === "movingAverage" && (
            <Line
              type="monotone"
              dataKey="movingAverage"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
              name={`${movingAvgWindow}-Day Moving Avg`}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
