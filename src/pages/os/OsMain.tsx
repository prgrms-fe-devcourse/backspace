import Taskbar from "@/components/os/Taskbar/Taskbar";

export default function OsMain() {
  return (
    <main className="bg-primary flex h-screen flex-col">
      <div className="flex-1" />
      <Taskbar />
    </main>
  );
}
