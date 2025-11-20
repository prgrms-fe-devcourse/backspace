import { useEffect } from "react";

import Bios from "@/assets/os/bios.png";
import StartupSound from "@/assets/sounds/windows95-startup-sound.mp3";

interface BootScreenProps {
  onComplete: () => void;
  useEnterMode: boolean;
}

export default function BootScreen({ onComplete, useEnterMode }: BootScreenProps) {
  useEffect(() => {
    if (!useEnterMode) return;

    const handleKeyDown = async (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        onComplete();

        try {
          const audio = new Audio(StartupSound);
          audio.volume = 0.1;
          await audio.play();
        } catch (error) {
          console.error("오디오 에러:", error);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [useEnterMode, onComplete]);

  useEffect(() => {
    if (useEnterMode) return;

    const timer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => clearTimeout(timer);
  }, [useEnterMode, onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black p-4">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <img src={Bios} alt="바이오스 화면" className="max-h-[90vh] w-auto object-contain" />
      </div>
    </div>
  );
}
