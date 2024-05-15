import React, { useState } from "react";
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

interface DisplayGraphProps {
  setGraphData: React.Dispatch<React.SetStateAction<GraphData>>;
}

const DirectInput: React.FC<DisplayGraphProps> = ({ setGraphData }) => {
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
    <div className="p-4 bg-white rounded shadow-md w-1/2">
      <div className="mb-2">
        <input
          className="w-full p-2 border rounded mb-2"
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          placeholder="Nome do Vértice"
        />
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={handleAddNode}
        >
          Adicionar Vértice
        </button>
      </div>
      <div className="mb-2">
        <input
          className="w-full p-2 border rounded mb-2"
          type="text"
          value={edgeSource}
          onChange={(e) => setEdgeSource(e.target.value)}
          placeholder="Origem da Aresta"
        />
        <input
          className="w-full p-2 border rounded mb-2"
          type="text"
          value={edgeTarget}
          onChange={(e) => setEdgeTarget(e.target.value)}
          placeholder="Destino da Aresta"
        />
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          onClick={handleAddEdge}
        >
          Adicionar Aresta
        </button>
      </div>
    </div>
  );
};

export default DirectInput;
