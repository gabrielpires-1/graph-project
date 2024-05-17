// LoadGraph.tsx
import React, { useEffect, useState } from "react";
import Graph from "graphology";
import { useLoadGraph } from "@react-sigma/core";
import { GraphType } from "graphology-types";

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

export default LoadGraph;
