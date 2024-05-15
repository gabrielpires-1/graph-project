import React, { useState } from "react";
import Graph from "graphology";
import { dijkstra } from "graphology-shortest-path";

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
}

export const GraphInfo: React.FC<GraphInfoProps> = ({ graphData }) => {
  const graph = new Graph();
  graphData.nodes.forEach((node) => graph.addNode(node.id));
  graphData.edges.forEach((edge) => graph.addEdge(edge.source, edge.target, { weight: 1 }));

  const getGraphOrder = () => graph.order;
  const getGraphSize = () => graph.size;
  const getNodeAdjacency = (node: string) => graph.neighbors(node);
  const getNodeDegree = (node: string) => graph.degree(node);
  const areNodesAdjacent = (node1: string, node2: string) => graph.hasEdge(node1, node2);

  const [vertex1, setVertex1] = useState<string>("");
  const [vertex2, setVertex2] = useState<string>("");
  const [pathVertex1, setPathVertex1] = useState<string>("");
  const [pathVertex2, setPathVertex2] = useState<string>("");

  const handleCheckAdjacency = () => {
    alert(areNodesAdjacent(vertex1, vertex2) ? "Os vértices são adjacentes" : "Os vértices não são adjacentes");
  };

  const handleFindShortestPath = () => {
    if (graph.hasNode(pathVertex1) && graph.hasNode(pathVertex2)) {
      const path = dijkstra.bidirectional(graph, pathVertex1, pathVertex2);
      if (path.length > 0) {
        alert(`Caminho de menor custo: ${path.join(" -> ")}\nSomatório dos pesos: ${path.length - 1}`);
      } else {
        alert("Não há caminho entre os vértices.");
      }
    } else {
      alert("Um ou ambos os vértices não existem no grafo.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow-md w-full mt-4">
      <p className="text-lg mb-2">Ordem do Grafo: {getGraphOrder()}</p>
      <p className="text-lg mb-4">Tamanho do Grafo: {getGraphSize()}</p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Vértice"
          id="vertex"
          className="w-full p-2 border rounded mb-2"
        />
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
          onClick={() => alert(`Adjacentes: ${getNodeAdjacency((document.getElementById("vertex") as HTMLInputElement).value).join(", ")}`)}
        >
          Obter Adjacentes
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => alert(`Grau: ${getNodeDegree((document.getElementById("vertex") as HTMLInputElement).value)}`)}
        >
          Obter Grau
        </button>
      </div>
      <div className="mb-4">
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
          onClick={handleCheckAdjacency}
        >
          Verificar Adjacência
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Vértice de Origem"
          value={pathVertex1}
          onChange={(e) => setPathVertex1(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          placeholder="Vértice de Destino"
          value={pathVertex2}
          onChange={(e) => setPathVertex2(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <button 
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-700"
          onClick={handleFindShortestPath}
        >
          Encontrar Caminho de Menor Custo
        </button>
      </div>
    </div>
  );
};
