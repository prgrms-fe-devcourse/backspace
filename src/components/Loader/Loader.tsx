import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface LoaderProps {
  label?: string;
}

export default function Loader({ label }: LoaderProps) {
  const [position, setPosition] = useState(0);
  const totalBlocks = 13;
  const activeBlocks = 3;

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev + 1) % totalBlocks);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const isBlockActive = (index: number) =>
    (index - position + totalBlocks) % totalBlocks < activeBlocks;

  return (
    <div className="inline-block">
      <div className="mb-1 text-center">{label}</div>
      <div className="bevel-pressed flex gap-px p-[3px]">
        {Array.from({ length: totalBlocks }).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={twMerge("h-4 w-3", isBlockActive(index) ? "bg-primary" : "bg-transparent")}
          />
        ))}
      </div>
    </div>
  );
}
