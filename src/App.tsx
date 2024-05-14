import React, { useState } from "react";
import DisplayGraph from "./components/displayGraph";
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

  return (
    <div>
      <h1>Grafo Interativo</h1>
      <BatchInput setGraphData={() => setGraphData} />
      <DisplayGraph />
      <GraphInfo graphData={graphData} />
    </div>
  );
};

export default App;
