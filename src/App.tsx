import React, { useState } from "react";
import DirectInput from "./components/directInput";
import { GraphInfo } from "./components/graphInfo";
import { BatchInput } from "./components/batchInput";
import LoadGraph from "./components/LoadGraph";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";

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

const sigmaStyle = { height: "100vh", width: "100%" };

const App: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [isDirected, setIsDirected] = useState<boolean>(true);

  const toggleGraphType = () => {
    setIsDirected((prev) => !prev);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Grafo Interativo</h1>
      <button
        className="px-4 py-2 mb-4 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={toggleGraphType}
      >
        {isDirected ? "Mudar para Grafo Não Direcionado" : "Mudar para Grafo Direcionado"}
      </button>
      <div className="flex w-full">
        <div className="w-3/4">
          <SigmaContainer style={sigmaStyle} className="flex w-full">
            <LoadGraph graphData={graphData} isDirected={isDirected} />
          </SigmaContainer>
        </div>
        <div className="w-1/4 flex flex-col space-y-4">
          <div className="p-4 bg-white rounded shadow-md w-full">
            <BatchInput setGraphData={setGraphData} />
          </div>
          <div className="p-4 bg-white rounded shadow-md w-full">
            <DirectInput setGraphData={setGraphData} />
          </div>
          <div className="p-4 bg-white rounded shadow-md w-full">
            <GraphInfo graphData={graphData} isDirected={isDirected} setGraphData={setGraphData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
