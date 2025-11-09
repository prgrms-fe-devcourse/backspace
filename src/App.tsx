import { Folder, FileText, Palette } from "lucide-react";

import Taskbar from "@/components/Taskbar/Taskbar";
import TaskbarTab from "@/components/Taskbar/TaskbarTab";
import useTheme from "@/hooks/useTheme";

export default function App() {
  useTheme(); // 앱 전체에 다크모드 적용

  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Taskbar 컴포넌트 테스트</h1>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Default - 모두 표시</h2>
        <Taskbar config="default">
          <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
          <TaskbarTab icon={<FileText size={14} />} text="Untitled - Notepad" />
          <TaskbarTab icon={<Palette size={14} />} text="Paint" />
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">NO START BUTTON - 시작 버튼 없음</h2>
        <Taskbar config="noStartButton">
          <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
          <TaskbarTab icon={<FileText size={14} />} text="Untitled - Notepad" />
          <TaskbarTab icon={<Palette size={14} />} text="Paint" />
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">NO SYSTEM TRAY - 시스템 트레이 없음</h2>
        <Taskbar config="noSystemTray">
          <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
          <TaskbarTab icon={<FileText size={14} />} text="Untitled - Notepad" />
          <TaskbarTab icon={<Palette size={14} />} text="Paint" />
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">
          MINIMAL - Tasks only (시작 버튼과 시스템 트레이 모두 없음)
        </h2>
        <Taskbar config="minimal">
          <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
          <TaskbarTab icon={<FileText size={14} />} text="Untitled - Notepad" />
          <TaskbarTab icon={<Palette size={14} />} text="Paint" />
        </Taskbar>
      </div>
    </div>
  );
}
