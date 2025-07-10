export const validateFlow = (nodes, edges) => {
  if (nodes.length <= 1) return "Add at least two nodes to form a flow.";

  const outgoing = Object.create(null);
  edges.forEach(e => (outgoing[e.source] = true));

  const invalid = nodes.filter(n => !outgoing[n.id]);
  if (invalid.length > 1)
    return "More than one node has an empty target. Connect all nodes!"
  return null; 
};
