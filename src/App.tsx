import Taskbar from "@/components/Taskbar/Taskbar";
import TaskbarStart from "@/components/Taskbar/TaskbarStart";
import TaskbarTab from "@/components/Taskbar/TaskbarTab";
import TaskbarSystemTray from "@/components/Taskbar/TaskbarSystemTray";

export default function App() {
  return (
    <div className="min-h-screen p-4">
      <h1 className="mb-4 text-2xl font-bold">Taskbar 컴포넌트 테스트</h1>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Basic Taskbar</h2>
        <Taskbar>
          <TaskbarStart />
          <div className="flex flex-1 items-center gap-1 overflow-hidden">
            <TaskbarTab isActive>📁 My Computer</TaskbarTab>
            <TaskbarTab>📄 Document</TaskbarTab>
          </div>
          <TaskbarSystemTray>🔈 3:45 PM</TaskbarSystemTray>
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Multiple Tabs</h2>
        <Taskbar>
          <TaskbarStart />
          <div className="flex flex-1 items-center gap-1 overflow-hidden">
            <TaskbarTab isActive>📁 My Computer</TaskbarTab>
            <TaskbarTab>📄 Document</TaskbarTab>
            <TaskbarTab>🎨 Paint</TaskbarTab>
          </div>
          <TaskbarSystemTray>3:45 PM</TaskbarSystemTray>
        </Taskbar>
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-lg font-semibold">Many Tabs (Auto Truncate)</h2>
        <Taskbar>
          <TaskbarStart />
          <div className="flex flex-1 items-center gap-1 overflow-hidden">
            <TaskbarTab isActive>📁 My Computer</TaskbarTab>
            <TaskbarTab>📄 Untitled - Notepad</TaskbarTab>
            <TaskbarTab>🎨 Paint</TaskbarTab>
            <TaskbarTab>📧 Email Client</TaskbarTab>
            <TaskbarTab>⚙️ System Settings</TaskbarTab>
            <TaskbarTab>🎛️ Control Panel</TaskbarTab>
            <TaskbarTab>📂 Windows Explorer</TaskbarTab>
          </div>
          <TaskbarSystemTray>3:45 PM</TaskbarSystemTray>
        </Taskbar>
      </div>
    </div>
  );
}
