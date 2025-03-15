"use client";
import Chart from "@/components/chart";
import Controls from "@/components/controls";
import { useEffect, useState } from "react";

interface InstrumentData {
  date: string;
  price: number;
}

interface Data {
  Inst1: InstrumentData[];
  Inst2: InstrumentData[];
}

export default function Home() {
  const [data, setData] = useState<Data | null>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<
    "Inst1" | "Inst2"
  >("Inst1");
  const [selectedTab, setSelectedTab] = useState<"price" | "movingAverage">(
    "price"
  );

  useEffect(() => {
    fetch("/input_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Fetch error: ", err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 px-4 py-6 lg:px-0">
      <div className="flex gap-6 w-full">
        <Controls
          selectedInstrument={selectedInstrument}
          setSelectedInstrument={setSelectedInstrument}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div className="flex flex-row gap-6 w-full">
        {data && selectedInstrument && (
          <Chart
            data={data[selectedInstrument]}
            selectedInstrument={selectedInstrument}
            selectedTab={selectedTab}
          />
        )}
      </div>
    </div>
  );
}
