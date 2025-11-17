import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { WINDOW_APPS } from "@/config/window";
import type { WindowApp, WindowAppId, WindowCategory } from "@/types/window.types";

interface WindowStore {
  windows: Partial<Record<WindowAppId, WindowApp>>;
  activeWindowId: WindowAppId | null;
  openWindow: (id: WindowAppId) => void;
  closeWindow: (id: WindowAppId) => void;
  setActiveWindow: (id: WindowAppId) => void;
  updateWindowTitle: (id: WindowAppId, title: string) => void;
}

const clearWindowsByCategory = (
  windows: Partial<Record<WindowAppId, WindowApp>>,
  category: WindowCategory
) => {
  const idsToDelete = Object.values(windows)
    .filter((window) => window?.category === category)
    .map((window) => window.id);

  idsToDelete.forEach((id) => delete windows[id]);
};

export const useWindowStore = create<WindowStore>()(
  devtools(
    immer((set) => ({
      windows: {},
      activeWindowId: null,

      openWindow: (id) =>
        set((state) => {
          const appConfig = WINDOW_APPS[id];
          if (!appConfig) return;

          if (state.windows[id]) {
            state.activeWindowId = id;
            return;
          }

          clearWindowsByCategory(state.windows, appConfig.category);

          state.windows[id] = { ...appConfig };
          state.activeWindowId = id;
        }),

      closeWindow: (id) =>
        set((state) => {
          delete state.windows[id];

          if (state.activeWindowId === id) {
            state.activeWindowId = null;
          }
        }),

      setActiveWindow: (id) =>
        set((state) => {
          if (state.windows[id]) {
            state.activeWindowId = id;
          }
        }),

      updateWindowTitle: (id, title) =>
        set((state) => {
          if (state.windows[id]) {
            state.windows[id].caption = title;
          }
        }),
    })),
    { name: "WindowStore" }
  )
);
