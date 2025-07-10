import { create } from "zustand";

// Zustand store to manage global chatbot flow state
export const useFlowStore = create((set) => ({
  nodes: [],
  edges: [],
  selected: null,

  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  selectNode: (id) => set({ selected: id }),
  deselectNode: () => set({ selected: null }),

  // Update a specific node's label text by its ID
  setNodeLabel: (id, label) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      ),
    })),
}));
