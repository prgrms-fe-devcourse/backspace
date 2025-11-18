import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { WINDOW_INFO } from "@/config/windowInfo";
import type { Position, WindowAppId, WindowCategory, WindowInstance } from "@/types/window.types";

interface WindowStore {
  windows: Partial<Record<WindowAppId, WindowInstance>>;
  activeWindowId: WindowAppId | null;
  categoryPositions: Partial<Record<WindowCategory, Position>>;
  openWindow: (id: WindowAppId, ownerId?: string) => void;
  closeWindow: (id: WindowAppId) => void;
  setActiveWindow: (id: WindowAppId) => void;
  updateWindowTitle: (id: WindowAppId, title: string) => void;
  updateWindowPosition: (category: WindowCategory, position: Position) => void;
}

const clearWindowsByCategory = (
  windows: Partial<Record<WindowAppId, WindowInstance>>,
  category: WindowCategory
) => {
  const idsToDelete = Object.values(windows)
    .filter((window) => window?.category === category)
    .map((window) => window.id);

  idsToDelete.forEach((id) => {
    if (id) {
      delete windows[id];
    }
  });
};

export const useWindowStore = create<WindowStore>()(
  devtools(
    immer((set) => ({
      windows: {},
      activeWindowId: null,
      categoryPositions: {},

      openWindow: (id, ownerId) =>
        set((state) => {
          const info = WINDOW_INFO[id];
          if (!info) return;

          if (state.windows[id]) {
            state.activeWindowId = id;
            return;
          }

          clearWindowsByCategory(state.windows, info.category);

          state.windows[id] = {
            id,
            category: info.category,
            caption: info.caption,
            ownerId,
          };
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

      updateWindowPosition: (category, position) =>
        set((state) => {
          state.categoryPositions[category] = position;
        }),
    })),
    { name: "WindowStore" }
  )
);
