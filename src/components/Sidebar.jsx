export default function Sidebar() {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify({ type: nodeType }));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div className="w-64 shrink-0 border-r bg-white px-4 py-5 shadow-md">
      <h2 className="mb-4 text-xl font-bold text-indigo-600">Node Palette</h2>

      <div
        onDragStart={(event) => onDragStart(event, "textNode")}
        draggable
        className="cursor-move select-none rounded-md border border-indigo-200 bg-indigo-50 px-4 py-2 text-indigo-800 shadow hover:bg-indigo-100"
      >
        ➕ Message
      </div>
    </div>
  );
}
