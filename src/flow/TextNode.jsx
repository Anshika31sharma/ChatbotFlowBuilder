import { Handle, Position } from "react-flow-renderer";

// Displays the message label and provides left (target) and right (source) connection handles
export default function TextNode({ data }) {
  return (
    <>
      <div>{data.label}</div>
      <Handle type="source" position={Position.Right} id="a" />
      <Handle type="target" position={Position.Left} />
    </>
  );
}
