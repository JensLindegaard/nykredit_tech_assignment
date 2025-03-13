"use client";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

interface ControlsProps {
  selectedInstrument: string;
  setSelectedInstrument: (instrument: "Inst1" | "Inst2") => void;
}

export default function Controls({
  selectedInstrument,
  setSelectedInstrument,
}: ControlsProps) {
  return (
    <div className="flex flex-col p-4 bg-red-100 border-[1px] border-gray-300 rounded-lg">
      <p className="font-semibold">Select Instrument</p>
      <div className="flex flex-row gap-6">
        <button
          className={`flex justify-center min-w-[140px] border-[1px] py-2 px-4 rounded-3xl hover:cursor-pointer transition-all duration-200
            ${
              selectedInstrument === "Inst1"
                ? "bg-blue-900 text-white border-blue-900 scale-105 opacity-90"
                : "border-blue-900 hover:bg-blue-900 hover:border-white hover:text-white hover:opacity-90"
            }`}
          onClick={() => setSelectedInstrument("Inst1")}
        >
          Instrument 1
        </button>
        <button
          className={`flex justify-center min-w-[140px] border-[1px] py-2 px-4 rounded-3xl 
            hover:cursor-pointer transition-all duration-200 ease-in-out
            ${
              selectedInstrument === "Inst2"
                ? "bg-blue-900 text-white border-blue-900 scale-105 opacity-90"
                : "border-blue-900 hover:bg-blue-900 hover:border-white hover:text-white hover:opacity-90"
            }`}
          onClick={() => setSelectedInstrument("Inst2")}
        >
          Instrument 2
        </button>
      </div>
      <div>
        <p className="font-semibold mt-4">Data Display Options</p>
        <Tabs defaultValue="price">
          <TabsList className="flex gap-4 bg-gray-100 p-2 rounded-lg justify-between">
            <TabsTrigger
              className="w-1/2 px-2 py-2 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white transition-all duration-200"
              value="price"
            >
              Price
            </TabsTrigger>
            <TabsTrigger
              className="w-1/2 px-2 py-2 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white transition-all duration-200"
              value="movingAverage"
            >
              Moving Average
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
