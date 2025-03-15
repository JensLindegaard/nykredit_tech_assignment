"use client";
import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

interface ControlsProps {
  selectedInstrument: string;
  setSelectedInstrument: (instrument: "Inst1" | "Inst2") => void;
  selectedTab: "price" | "movingAverage";
  setSelectedTab: (tab: "price" | "movingAverage") => void;
}

export default function Controls({
  selectedInstrument,
  setSelectedInstrument,
  selectedTab,
  setSelectedTab,
}: ControlsProps) {
  return (
    <div className="flex flex-col w-full p-4 bg-white border-[1px] border-gray-300 rounded-lg shadow-md lg:w-fit">
      <p className="font-semibold pb-2">Select Instrument</p>
      <div className="flex flex-row gap-6 w-full justify-between">
        <button
          className={`flex justify-center min-w-[140px] w-full border-[1px] py-2 px-4 rounded-lg hover:cursor-pointer transition-all duration-200
            ${
              selectedInstrument === "Inst1"
                ? "bg-blue-900 text-white border-blue-900 scale-105 "
                : "border-blue-900 hover:bg-blue-900 hover:border-white hover:text-white hover:opacity-90"
            }`}
          onClick={() => setSelectedInstrument("Inst1")}
        >
          Instrument 1
        </button>
        <button
          className={`flex justify-center min-w-[140px] w-full border-[1px] py-2 px-4 rounded-lg 
            hover:cursor-pointer transition-all duration-200 ease-in-out
            ${
              selectedInstrument === "Inst2"
                ? "bg-blue-900 text-white border-blue-900 scale-105 "
                : "border-blue-900 hover:bg-blue-900 hover:border-white hover:text-white hover:opacity-90"
            }`}
          onClick={() => setSelectedInstrument("Inst2")}
        >
          Instrument 2
        </button>
      </div>
      <div>
        <p className="font-semibold pt-4 pb-2">Data Display Options</p>
        <Tabs
          defaultValue={selectedTab}
          onValueChange={(value: string) =>
            setSelectedTab(value as "price" | "movingAverage")
          }
        >
          <TabsList className="flex gap-4 bg-gray-100 p-2 rounded-lg justify-between">
            <TabsTrigger
              className="w-1/2 px-2 py-2 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white transition-all duration-200 cursor-pointer"
              value="price"
            >
              Price
            </TabsTrigger>
            <TabsTrigger
              className="w-1/2 px-2 py-2 rounded-lg data-[state=active]:bg-blue-900 data-[state=active]:text-white transition-all duration-200 cursor-pointer"
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
