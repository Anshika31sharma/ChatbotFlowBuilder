import React, { useCallback, useRef } from "react";
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "react-flow-renderer";
import TextNode from "./TextNode";
import { useFlowStore } from "../store";
import { v4 as uuid } from "uuid";

// Custom node type mapping
const nodeTypes = { textNode: TextNode };

export default function FlowCanvas() {
  const flowRef = useRef(null); 

  // Zustand state store for globally managing nodes, edges, and selection
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    selectNode,
  } = useFlowStore();

  // React Flow local state hooks for managing real-time canvas updates
  const [rfNodes, setRfNodes, onNodesChange] = useNodesState(nodes);
  const [rfEdges, setRfEdges, onEdgesChange] = useEdgesState(edges);

  // Sync Zustand state to React Flow's local state on load or updates
  React.useEffect(() => {
    setRfNodes(nodes);
    setRfEdges(edges);
  }, [nodes, edges]);

  //  Handles connecting nodes via edges
  const onConnect = useCallback(
    (params) => setRfEdges((eds) => addEdge({ ...params }, eds)),
    []
  );

  //  Handles dropping a new node into the canvas
  const onDrop = useCallback((event) => {
    event.preventDefault();

    const reactFlowBounds = flowRef.current.getBoundingClientRect();
    const data = JSON.parse(event.dataTransfer.getData("application/reactflow"));
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    };

    const newNode = {
      id: uuid(), // generate unique ID
      type: data.type, 
      position,
      data: { label: "New Message" },
    };

    setRfNodes((nds) => nds.concat(newNode));
  }, []);

  //  Needed to allow dropping inside the canvas
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  return (
    <div
      ref={flowRef}
      className="flex-1 h-full bg-white shadow-inner"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={rfNodes}
        edges={rfEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onNodeDoubleClick={(_, node) => selectNode(node.id)} //  Open PropertiesPanel on double-click
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
