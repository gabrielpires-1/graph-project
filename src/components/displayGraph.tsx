import React, { useState } from "react";
import { SigmaContainer } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import LoadGraph from "./loadGraph";

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

const DisplayGraph: React.FC = () => {
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], edges: [] });
  const [nodeName, setNodeName] = useState<string>("");
  const [edgeSource, setEdgeSource] = useState<string>("");
  const [edgeTarget, setEdgeTarget] = useState<string>("");

  const handleAddNode = () => {
    setGraphData((prevData) => ({
      ...prevData,
      nodes: [...prevData.nodes, { id: nodeName, x: Math.random(), y: Math.random(), color: "#FA4F40" }]
    }));
    setNodeName("");
  };

  const handleAddEdge = () => {
    setGraphData((prevData) => ({
      ...prevData,
      edges: [...prevData.edges, { source: edgeSource, target: edgeTarget, color: "#4F77FA" }]
    }));
    setEdgeSource("");
    setEdgeTarget("");
  };

  return (
    <div className="flex">
      <div className="w-[50vw] h-[100vh]">
        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Nome do Vértice"
        />
        <button onClick={handleAddNode}>Adicionar Vértice</button>

        <input
          type="text"
          value={edgeSource}
          onChange={(e) => setEdgeSource(e.target.value)}
          placeholder="Origem da Aresta"
        />
        <input
          type="text"
          value={edgeTarget}
          onChange={(e) => setEdgeTarget(e.target.value)}
          placeholder="Destino da Aresta"
        />
        <button onClick={handleAddEdge}>Adicionar Aresta</button>
      </div>
      <SigmaContainer style={sigmaStyle} className="flex w-full">
        <LoadGraph graphData={graphData} />
      </SigmaContainer>
    </div>
  );
};

export default DisplayGraph;
