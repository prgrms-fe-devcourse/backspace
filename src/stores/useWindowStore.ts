import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { WINDOW_APPS } from "@/config/window";
import { MINIHOME_TABS } from "@/types/minihome.types";
import type { WindowApp, WindowAppId } from "@/types/window.types";

interface WindowStore {
  windows: Partial<Record<WindowAppId, WindowApp>>;
  activeWindowId: WindowAppId | null;
  openWindow: (id: WindowAppId) => void;
  closeWindow: (id: WindowAppId) => void;
  setActiveWindow: (id: WindowAppId) => void;
}

const isMiniHomeTab = (id: WindowAppId) => id in MINIHOME_TABS;

const clearMiniHomeTabs = (windows: Partial<Record<WindowAppId, WindowApp>>) => {
  Object.keys(MINIHOME_TABS).forEach((key) => {
    delete windows[key as WindowAppId];
  });
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

          if (isMiniHomeTab(id)) {
            clearMiniHomeTabs(state.windows);
          }

          state.windows[id] = appConfig;
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
    })),
    { name: "WindowStore" }
  )
);
