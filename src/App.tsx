import React, { useState } from "react";
import DirectInput from "./components/directInput";
import { GraphInfo } from "./components/graphInfo";
import { BatchInput } from "./components/batchInput";
import { SigmaContainer } from "@react-sigma/core";
import LoadGraph from "./components/loadGraph";

const sigmaStyle = { height: "100vh", width: "50vw" };

interface NodeData {
  id: string;
  x: number;
  y: number;
  color: string;
}

interface EdgeData {
  source: string;
  target: string;
  color: string;
}

interface GraphData {
  nodes: NodeData[];
  edges: EdgeData[];
}

const App: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Grafo Interativo</h1>
      <div className="w-full flex justify-between mb-4">
        <BatchInput setGraphData={setGraphData} />
        <DirectInput setGraphData={setGraphData} />
      </div>
      <div className="w-full flex justify-center mb-4">
        <SigmaContainer style={sigmaStyle} className="flex w-full">
          <LoadGraph graphData={graphData} />
        </SigmaContainer>
      </div>
      <GraphInfo graphData={graphData} />
    </div>
  );
};

export default App;
