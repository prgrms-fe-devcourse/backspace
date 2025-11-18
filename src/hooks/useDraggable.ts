import { useEffect, useRef, useState } from "react";

export const useDraggable = () => {
  const [isDragging, setIsDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });
  const onDrag = useRef({ x: 0, y: 0 });

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    const window = event.currentTarget.parentElement;
    const rect = window?.getBoundingClientRect();

    if (!rect) return;

    setIsDragging(true);

    offset.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };

    onDrag.current = {
      x: rect.left,
      y: rect.top,
    };
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!isDragging) return;

      onDrag.current = {
        x: event.clientX - offset.current.x,
        y: event.clientY - offset.current.y,
      };
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return {
    onMouseDown: handleMouseDown,
    isDragging,
    onDrag,
  };
};
