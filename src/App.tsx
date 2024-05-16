import React, { useState } from "react";
import DirectInput from "./components/directInput";
import { GraphInfo } from "./components/graphInfo";
import { BatchInput } from "./components/batchInput";

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
      <div className="w-full flex justify-between mb-4">
        <BatchInput setGraphData={setGraphData} />
        <DirectInput setGraphData={setGraphData} />
      </div>
      <GraphInfo graphData={graphData} isDirected={isDirected} />
    </div>
  );
};

export default App;
