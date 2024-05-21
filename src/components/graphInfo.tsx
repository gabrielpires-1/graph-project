import React, { useState } from "react";
import Graph from "graphology";
import "@react-sigma/core/lib/react-sigma.min.css";
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

interface GraphInfoProps {
  graphData: GraphData;
  isDirected: boolean;
  setGraphData: React.Dispatch<React.SetStateAction<GraphData>>;
}

export const GraphInfo: React.FC<GraphInfoProps> = ({ graphData, isDirected, setGraphData }) => {
  const graph = new Graph({ type: isDirected ? "directed" : "undirected" });
  graphData.nodes.forEach((node) => graph.addNode(node.id));
  graphData.edges.forEach((edge) => graph.addEdge(edge.source, edge.target));

  const getNodeAdjacency = (node: string) => {
    if (isDirected) {
      return {
        in: graph.inNeighbors(node),
        out: graph.outNeighbors(node)
      };
    }
    return graph.neighbors(node);
  };

  const getNodeDegree = (node: string) => {
    if (isDirected) {
      return {
        in: graph.inDegree(node),
        out: graph.outDegree(node)
      };
    }
    return graph.degree(node);
  };

  const areNodesAdjacent = (node1: string, node2: string) => {
    return graph.hasEdge(node1, node2);
  };

  const handleResetGraph = () => {
    setGraphData({ nodes: [], edges: [] });
  };

  const [vertex1, setVertex1] = useState<string>("");
  const [vertex2, setVertex2] = useState<string>("");

  return (
    <div className="p-4 bg-white rounded shadow-md w-full mt-4">
      <p className="text-lg mb-2">Ordem do Grafo: {graph.order}</p>
      <p className="text-lg mb-4">Tamanho do Grafo: {graph.size}</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Vértice"
          id="vertex"
          className="w-full p-2 border rounded mb-2"
        />
        <Button

          onClick={() => {
            const vertex = (document.getElementById("vertex") as HTMLInputElement).value;
            const adj = getNodeAdjacency(vertex);
            if (isDirected) {
              alert(`Adjacentes de Entrada: ${(adj as { in: string[]; out: string[] }).in.join(", ")}\nAdjacentes de Saída: ${(adj as { in: string[]; out: string[] }).out.join(", ")}`);
            } else {
              alert(`Adjacentes: ${(adj as string[]).join(", ")}`);
            }
          }}
        >
          Obter Adjacentes
        </Button>
        <Button
          onClick={() => {
            const vertex = (document.getElementById("vertex") as HTMLInputElement).value;
            const degree = getNodeDegree(vertex);
            if (isDirected) {
              alert(`Grau de Entrada: ${(degree as { in: number; out: number }).in}\nGrau de Saída: ${(degree as { in: number; out: number }).out}`);
            } else {
              alert(`Grau: ${(degree as number)}`);
            }
          }}
        >
          Obter Grau
        </Button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Vértice 1"
          value={vertex1}
          onChange={(e) => setVertex1(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Vértice 2"
          value={vertex2}
          onChange={(e) => setVertex2(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <Button
          onClick={() => alert((areNodesAdjacent(vertex1, vertex2) || areNodesAdjacent(vertex2, vertex1)) ? "Os vértices são adjacentes" : "Os vértices não são adjacentes")}
        >
          Verificar Adjacência
        </Button>
      </div>
      <div className="mt-4">
        <Button
          variant="destructive"
          onClick={handleResetGraph}
        >
          Resetar Grafo
        </Button>
      </div>
    </div>
  );
};
