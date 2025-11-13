import type { ReactNode } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * 우선 Taskbar에서 필요한 최소한의 Window 정보만 만들었습니다
 */

interface WindowInfo {
  /** Window의 카테고리 */
  category: string;
  /** Taskbar에 표시되는 제목 */
  title: string;
  /** 제목 옆에 선택적으로 표시되는 아이콘 (ReactNode) */
  icon?: ReactNode;
}

interface WindowStore {
  windows: WindowInfo[];
  focusedWindowCategory: string | null;

  /**
   * Store에 새로운 Window를 추가하고 focus 상태를 설정합니다
   * @param window - 추가할 Window 정보
   */
  runWindow: (window: WindowInfo) => void;

  /**
   * Store에서 Window를 제거합니다. 제거된 Window가 focus였을 경우,
   * focusedWindowCategory를 undefined로 설정합니다.
   * 다른 Window로 자동 focus를 옮기지 않습니다 (사용자가 직접 선택하도록).
   * @param category - 제거할 Window의 카테고리
   */
  closeWindow: (category: string) => void;

  /**
   * focus 중인 Window를 설정합니다. Window 카테고리가 존재하지 않으면 동작하지 않습니다
   * @param category - Focus할 Window의 카테고리
   */
  setFocusWindow: (category: string) => void;
}

export const useWindowStore = create<WindowStore>()(
  immer((set) => ({
    windows: [],
    focusedWindowCategory: null,

    // Window 등록 (Taskbar 맨 뒤에 탭 추가)
    runWindow: (window) =>
      set((state) => {
        const exists = state.windows.some((w) => w.category === window.category);
        if (!exists) {
          state.windows.push(window);
          state.focusedWindowCategory = window.category; // 새로 생성된 window를 자동으로 focus
        }
      }),

    // Window 제거 (Taskbar에서 탭 제거)
    closeWindow: (category) =>
      set((state) => {
        const index = state.windows.findIndex((w) => w.category === category);
        if (index !== -1) {
          state.windows.splice(index, 1);
          // 제거된 window가 focused였으면 focusedWindowCategory를 undefined로 설정
          // 다른 window로 자동 focus를 옮기지 않음 (사용자가 직접 선택하도록)
          if (state.focusedWindowCategory === category) {
            state.focusedWindowCategory = null;
          }
        }
      }),

    // Window Focus (Taskbar 탭도 focus)
    setFocusWindow: (category) =>
      set((state) => {
        // window가 존재하는지 확인
        const window = state.windows.find((w) => w.category === category);
        if (window) {
          state.focusedWindowCategory = category;
        }
      }),
  }))
);
