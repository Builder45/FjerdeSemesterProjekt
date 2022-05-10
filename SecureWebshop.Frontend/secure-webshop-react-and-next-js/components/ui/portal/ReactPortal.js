import { createPortal } from "react-dom";

export default function ReactPortal({ children, destinationId }) {
  return createPortal(children, document.getElementById(destinationId));
}