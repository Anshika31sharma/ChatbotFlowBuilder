import { useEffect } from "react";
import FlowCanvas from "./flow";
import Sidebar from "./components/Sidebar";
import PropertiesPanel from "./components/PropertiesPanel";
import SaveBar from "./components/SaveBar";
import { useFlowStore } from "./store";

export default function App() {
  const { selected, setNodes, setEdges } = useFlowStore();

  useEffect(() => {
    const stored = localStorage.getItem("chatbot-flow");
    if (!stored) return;

    try {
      const { nodes, edges } = JSON.parse(stored);
      if (Array.isArray(nodes) && Array.isArray(edges)) {
        setNodes(nodes);
        setEdges(edges);
        console.info("Loaded flow from localStorage");
      }
    } catch (err) {
      console.error("Invalid flow JSON in localStorage:", err);
    }
  }, []);

  return (
    <div className="flex h-screen w-full flex-col bg-gray-100 font-sans text-gray-800">
      <div className="flex flex-1 overflow-hidden">
        {!selected && <Sidebar />}
        <FlowCanvas />
        {selected && <PropertiesPanel />}
      </div>
      <SaveBar />
    </div>
  );
}
