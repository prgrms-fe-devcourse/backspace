import type { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * 우선 Taskbar에서 필요한 최소한의 Window 정보만 만들었습니다
 */

interface WindowInfo {
  /** Window의 ID */
  id: string;
  /** Taskbar에 표시되는 제목 */
  title: string;
  /** !선택적입니다! 제목 옆에 표시되는 아이콘 (ReactNode) */
  icon?: ReactNode;
}

interface WindowStore {
  windows: WindowInfo[];
  activeWindowId: string | undefined;

  /**
   * Store에 새로운 Window를 추가하고 focus 상태를 설정합니다
   * @param window - 추가할 Window 정보
   */
  addWindow: (window: WindowInfo) => void;

  /**
   * Store에서 Window를 제거합니다. 제거된 Window가 active였을 경우,
   * activeWindowId를 undefined로 설정합니다
   * @param id - 제거할 Window의 ID
   */
  removeWindow: (id: string) => void;

  /**
   * focus중인 Window를 설정합니다. Window ID가 존재하지 않으면 동작하지 않습니다
   * @param id - Focus할 Window의 ID
   */
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: [],
    activeWindowId: undefined,

    // Window 등록 (Taskbar 맨 뒤에 탭 추가)
    addWindow: (window) =>
      set((state) => {
        const exists = state.windows.some((w) => w.id === window.id);
        if (!exists) {
          state.windows.push(window);
          state.activeWindowId = window.id; // 새로 생성된 window를 자동으로 focus
        }
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
