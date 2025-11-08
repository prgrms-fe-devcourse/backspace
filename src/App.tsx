import { Folder, FileText, Palette, Mail, Settings, Sliders, FolderOpen } from "lucide-react";

import Taskbar from "@/components/Taskbar/Taskbar";
import TaskbarStart from "@/components/Taskbar/TaskbarStart";
import TaskbarSystemTray from "@/components/Taskbar/TaskbarSystemTray";
import TaskbarTab from "@/components/Taskbar/TaskbarTab";

export default function App() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Taskbar 컴포넌트 테스트</h1>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Basic Taskbar</h2>
        <Taskbar>
          <TaskbarStart />
          <div className="flex flex-1 items-center gap-1 overflow-hidden">
            <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
            <TaskbarTab icon={<FileText size={14} />} text="Document" />
          </div>
          <TaskbarSystemTray />
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Multiple Tabs</h2>
        <Taskbar>
          <TaskbarStart />
          <div className="flex flex-1 items-center gap-1 overflow-hidden">
            <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
            <TaskbarTab icon={<FileText size={14} />} text="Document" />
            <TaskbarTab icon={<Palette size={14} />} text="Paint" />
          </div>
          <TaskbarSystemTray />
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Many Tabs (Auto Truncate)</h2>
        <Taskbar>
          <TaskbarStart />
          <div className="flex flex-1 items-center gap-1 overflow-hidden">
            <TaskbarTab icon={<Folder size={14} />} text="My Computer" isActive />
            <TaskbarTab icon={<FileText size={14} />} text="Untitled - Notepad" />
            <TaskbarTab icon={<Palette size={14} />} text="Paint" />
            <TaskbarTab icon={<Mail size={14} />} text="Email Client" />
            <TaskbarTab icon={<Settings size={14} />} text="System Settings" />
            <TaskbarTab icon={<Sliders size={14} />} text="Control Panel" />
            <TaskbarTab icon={<FolderOpen size={14} />} text="Windows Explorer" />
          </div>
          <TaskbarSystemTray />
        </Taskbar>
      </div>
    </div>
  );
}
