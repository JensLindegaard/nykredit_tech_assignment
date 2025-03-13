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
  const [data, setData] = useState<any>(null);
  const [selectedInstrument, setSelectedInstrument] = useState<
    keyof Data | null
  >("Inst1");
  const [count, setCount] = useState(20);

  useEffect(() => {
    fetch("/input_data.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        console.log(data);
        return res.json();
      })
      .then(setData)
      .catch((err) => {
        console.error("Fetch error: ", err);
      });
  }, []);

  useEffect(() => {
    setCount(20);
  }, [selectedInstrument]);

  return (
    <div className="flex flex-col">
      
      <div className="flex gap-6 py-4">
      {selectedInstrument && (
          <Controls 
            selectedInstrument={selectedInstrument} 
            setSelectedInstrument={setSelectedInstrument} 
          />
        )}
      </div>
      <div className="flex flex-row gap-6">
        {data && selectedInstrument && (
          <div>
            <ul>
              {data[selectedInstrument]
                .sort(
                  (first: InstrumentData, last: InstrumentData) =>
                    new Date(last.date).getTime() -
                    new Date(first.date).getTime()
                )
                .slice(0, count)
                .map((item: InstrumentData, index: number) => (
                  <li key={index}>
                    {item.date}: {item.price}
                  </li>
                ))}
            </ul>
            {count < data[selectedInstrument].length && (
              <button
                className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-lg hover:opacity-80 transition"
                onClick={() => setCount((prev) => prev + 20)}
              >
                Show More
              </button>
            )}
          </div>
        )}

        
      </div>
    </div>
  );
}
