import React, { useEffect } from "react";
import Graph from "graphology";
import { useLoadGraph } from "@react-sigma/core";
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

interface LoadGraphProps {
  graphData: GraphData;
}

const LoadGraph: React.FC<LoadGraphProps> = ({ graphData }) => {
  const loadGraph = useLoadGraph();

  useEffect(() => {
    const graph = new Graph();

    graphData.nodes.forEach((node) => {
      graph.addNode(node.id, { x: node.x, y: node.y, size: 10, color: node.color });
    });

    graphData.edges.forEach((edge) => {
      graph.addEdge(edge.source, edge.target, { color: edge.color });
    });

    loadGraph(graph);
  }, [loadGraph, graphData]);

  return null;
};

export default LoadGraph;
