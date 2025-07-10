import { useFlowStore } from "../store";
import { useState } from "react";

export default function PropertiesPanel() {
  const { nodes, selected, deselectNode, setNodeLabel } = useFlowStore();
  const current = nodes.find((n) => n.id === selected);
  const [text, setText] = useState(current?.data?.label || "");

  const handleSave = () => {
    if (!selected) return;
    setNodeLabel(selected, text);
    deselectNode();
  };

  return (
    <div className="w-80 shrink-0 border-l bg-white p-5 shadow-md">
      <h2 className="mb-3 text-lg font-semibold text-gray-700">Edit Message</h2>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full resize-none rounded border border-gray-300 px-3 py-2 text-sm text-gray-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-300"
        rows={6}
      />

      <button
        onClick={handleSave}
        className="mt-4 w-full rounded bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Save label
      </button>
    </div>
  );
}
