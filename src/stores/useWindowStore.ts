import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { WINDOW_INFO } from "@/os/config/windowInfo";
import type { Position, WindowAppId, WindowCategory, WindowInstance } from "@/types/window.types";

interface WindowStore {
  windows: Partial<Record<WindowAppId, WindowInstance>>;
  activeWindowId: WindowAppId | null;
  categoryPositions: Partial<Record<WindowCategory, Position>>;
  minimizedWindows: Partial<Record<WindowAppId, boolean>>;
  maximizedWindows: Partial<Record<WindowAppId, boolean>>;
  restorePositions: Partial<Record<WindowAppId, Position>>;

  openWindow: (id: WindowAppId, ownerId?: string) => void;
  closeWindow: (id: WindowAppId) => void;
  setActiveWindow: (id: WindowAppId) => void;
  updateWindowTitle: (id: WindowAppId, title: string) => void;
  updateWindowPosition: (category: WindowCategory, position: Position) => void;
  minimizeWindow: (id: WindowAppId) => void;
  maximizeWindow: (id: WindowAppId, currentPosition: Position | null) => void;
  restoreWindow: (id: WindowAppId) => void;
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
      minimizedWindows: {},
      maximizedWindows: {},
      restorePositions: {},

      openWindow: (id, ownerId) =>
        set((state) => {
          const info = WINDOW_INFO[id];
          if (!info) return;

          const target = state.windows[id];

          if (target) {
            if (ownerId !== undefined && target.ownerId !== ownerId) {
              target.ownerId = ownerId;
            }

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
          delete state.minimizedWindows[id];
          delete state.maximizedWindows[id];
          delete state.restorePositions[id];

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

      minimizeWindow: (id) =>
        set((state) => {
          state.minimizedWindows[id] = true;
          delete state.maximizedWindows[id];

          if (state.activeWindowId === id) {
            state.activeWindowId = null;
          }
        }),

      maximizeWindow: (id, currentPosition) =>
        set((state) => {
          if (currentPosition) {
            state.restorePositions[id] = currentPosition;
          }

          state.maximizedWindows[id] = true;
          delete state.minimizedWindows[id];
          state.activeWindowId = id;
        }),

      restoreWindow: (id) =>
        set((state) => {
          delete state.minimizedWindows[id];
          delete state.maximizedWindows[id];
          state.activeWindowId = id;
        }),
    })),
    { name: "WindowStore" }
  )
);
