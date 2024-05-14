import React from "react";
import Graph from "graphology";

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
  graphData.edges.forEach((edge) => graph.addEdge(edge.source, edge.target));

  const getGraphOrder = () => graph.order;
  const getGraphSize = () => graph.size;
  const getNodeAdjacency = (node: string) => graph.neighbors(node);
  const getNodeDegree = (node: string) => graph.degree(node);

  return (
    <div>
      <p>Ordem do Grafo: {getGraphOrder()}</p>
      <p>Tamanho do Grafo: {getGraphSize()}</p>
      <input type="text" placeholder="Vértice" id="vertex" />
      <button onClick={() => alert(`Adjacentes: ${getNodeAdjacency((document.getElementById("vertex") as HTMLInputElement).value).join(", ")}`)}>Obter Adjacentes</button>
      <button onClick={() => alert(`Grau: ${getNodeDegree((document.getElementById("vertex") as HTMLInputElement).value)}`)}>Obter Grau</button>
    </div>
  );
};
