import React, { useState, useEffect } from "react";
import Graph from "graphology";
import { useLoadGraph } from "@react-sigma/core";
import "@react-sigma/core/lib/react-sigma.min.css";
import { SigmaContainer } from "@react-sigma/core";
import { GraphType } from "graphology-types";

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

interface GraphInfoProps {
  graphData: GraphData;
  isDirected: boolean;
}

interface LoadGraphProps {
  graphData: GraphData;
  isDirected: boolean;
}

const LoadGraph: React.FC<LoadGraphProps> = ({ graphData, isDirected }) => {
  const loadGraph = useLoadGraph();
  const [directed, setDirected] = useState<GraphType>("undirected");

  useEffect(() => {
    setDirected(isDirected ? "directed" : "undirected");
  }, [isDirected]);

  useEffect(() => {
    const graph = new Graph({ type: `${directed}` });

    graphData.nodes.forEach((node) => {
      graph.addNode(node.id, { x: node.x, y: node.y, size: 10, color: node.color });
    });

    graphData.edges.forEach((edge) => {
      graph.addEdge(edge.source, edge.target, { color: edge.color });
    });

    loadGraph(graph);
  }, [loadGraph, graphData, directed]);

  return null;
};

export const GraphInfo: React.FC<GraphInfoProps> = ({ graphData, isDirected }) => {
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

  const [vertex1, setVertex1] = useState<string>("");
  const [vertex2, setVertex2] = useState<string>("");

  return (
    <>
      <div className="w-full flex justify-center mb-4">
        <SigmaContainer style={sigmaStyle} className="flex w-full">
          <LoadGraph graphData={graphData} isDirected={isDirected} />
        </SigmaContainer>
      </div>
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
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
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
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
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
          </button>
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
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
            onClick={() => alert(areNodesAdjacent(vertex1, vertex2) ? "Os vértices são adjacentes" : "Os vértices não são adjacentes")}
          >
            Verificar Adjacência
          </button>
        </div>
      </div>
    </>
  );
};
