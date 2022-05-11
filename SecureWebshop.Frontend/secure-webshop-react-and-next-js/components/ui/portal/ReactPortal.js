import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

// Benytter ref og state til at sikre, at der kun laves en portal clientside
// Serverside kan ikke bruge "document"
export default function ReactPortal({ children, destinationId }) {
  const ref = useRef();
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    ref.current = document.getElementById(destinationId).parentElement;
    setMounted(true);
  }, [destinationId]);

  return mounted ? createPortal(children, ref.current) : null;
}