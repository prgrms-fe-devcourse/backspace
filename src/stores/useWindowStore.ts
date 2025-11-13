import type { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * 우선 Taskbar에서 필요한 최소한의 Window 정보만 만들었습니다
 */
interface WindowInfo {
  id: string;
  title: string;
  icon?: ReactNode;
}

interface WindowStore {
  windows: WindowInfo[];
  activeWindowId: string | undefined;

  // Window 관리
  addWindow: (window: WindowInfo) => void;
  removeWindow: (id: string) => void;

  // Focus 관리
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: [],
    activeWindowId: undefined,

    // Window 등록 (Taskbar 맨 뒤에 탭 추가)
    addWindow: (window) =>
      set((state) => {
        state.windows.push(window);
        state.activeWindowId = window.id; // 새로 생성된 window를 자동으로 focus
      }),

    // Window 제거 (Taskbar에서 탭 제거)
    removeWindow: (id) =>
      set((state) => {
        state.windows = state.windows.filter((w) => w.id !== id);
        // 제거된 window가 active였으면 activeWindowId를 undefined로 설정
        if (state.activeWindowId === id) {
          state.activeWindowId = undefined;
        }
      }),

    // Window Focus (Taskbar 탭도 focus)
    focusWindow: (id) =>
      set((state) => {
        // window가 존재하는지 확인
        const window = state.windows.find((w) => w.id === id);
        if (window) {
          state.activeWindowId = id;
        }
      }),
  }))
);
