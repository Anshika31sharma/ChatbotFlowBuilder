import { useFlowStore } from "../store";
import { validateFlow } from "../flow/validate";

export default function SaveBar() {
  const { nodes, edges } = useFlowStore();

  const handleSave = () => {
    const error = validateFlow(nodes, edges);
    if (error) {
      alert(error);
      return;
    }

    try {
      localStorage.setItem("chatbot-flow", JSON.stringify({ nodes, edges }));
      alert("Flow saved successfully! ✅");
      console.log("💾 Flow JSON:", { nodes, edges });
    } catch (err) {
      alert("Couldn't save flow to localStorage. See console.");
      console.error("Save error:", err);
    }
  };

  return (
    <div className="sticky bottom-0 z-10 flex h-14 items-center justify-end gap-4 border-t bg-white px-6 shadow-sm">
      <button
        onClick={handleSave}
        className="rounded bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:bg-indigo-700 transition"
      >
         Save Flow
      </button>
    </div>
  );
}
