import React, { useState } from "react";
import { Button } from "./ui/button";

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
}

export const BatchInput: React.FC<BatchInputProps> = ({ setGraphData }) => {
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
    <div>
      <textarea
        className="w-full p-2 border rounded mb-2"
        value={batchInput}
        onChange={(e) => setBatchInput(e.target.value)}
        placeholder="Formato: node A\nnode B\nedge A B"
      />
      <Button 
        onClick={handleBatchInput}
      >
        Inserir em Lote
      </Button>
    </div>
  );
};

export default BatchInput;
