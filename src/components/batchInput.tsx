import React, { useState } from "react";
import LoadGraph from "./loadGraph";
import { SigmaContainer } from "@react-sigma/core";
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

interface BatchInputProps {
  setGraphData: React.Dispatch<React.SetStateAction<GraphData>>;
  graphData: GraphData;
}

export const BatchInput: React.FC<BatchInputProps> = ({ setGraphData, graphData }) => {
  const [batchInput, setBatchInput] = useState<string>("");

  const handleBatchInput = () => {
    const lines = batchInput.trim().split("\n");
    const nodes: NodeData[] = [];
    const edges: EdgeData[] = [];

    lines.forEach((line) => {
      const [type, id1, id2] = line.trim().split(" ");
      if (type === "node" && id1) {
        nodes.push({ id: id1, x: Math.random(), y: Math.random(), color: "#FA4F40" });
      } else if (type === "edge" && id1 && id2) {
        edges.push({ source: id1, target: id2, color: "#4F77FA" });
      }
    });

    setGraphData((prevData) => ({
      nodes: [...prevData.nodes, ...nodes],
      edges: [...prevData.edges, ...edges],
    }));
  };

  return (
    <>
    <div>
      <textarea
        value={batchInput}
        onChange={(e) => setBatchInput(e.target.value)}
        placeholder="Formato: node A\nnode B\nedge A B"
      />
      <button onClick={handleBatchInput}>Inserir em Lote</button>
    </div>
    <SigmaContainer style={sigmaStyle} className="flex w-full">
        <LoadGraph graphData={graphData} />
      </SigmaContainer>
    </>
  );
};
