import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";

import Scrollbar from "./Scrollbar";

describe("Scrollbar", () => {
  describe("렌더링", () => {
    test("기본 스크롤바가 렌더링 된다", () => {
      const { container } = render(<Scrollbar />);
      expect(container.firstChild).toBeInTheDocument();
    });

    test("horizontal 방향으로 렌더링 된다", () => {
      render(<Scrollbar direction="horizontal" />);
      expect(screen.getByLabelText("왼쪽으로 스크롤")).toBeInTheDocument();
      expect(screen.getByLabelText("오른쪽으로 스크롤")).toBeInTheDocument();
    });

    test("vertical 방향으로 렌더링 된다", () => {
      render(<Scrollbar direction="vertical" />);
      expect(screen.getByLabelText("위로 스크롤")).toBeInTheDocument();
      expect(screen.getByLabelText("아래로 스크롤")).toBeInTheDocument();
    });

    test("size prop에 따라 thumb 크기가 다르다", () => {
      const { container: containerSm } = render(<Scrollbar size="sm" />);
      const { container: containerMd } = render(<Scrollbar size="md" />);
      const { container: containerLg } = render(<Scrollbar size="lg" />);

      const thumbSm = containerSm.querySelector('[class*="w-10"]');
      const thumbMd = containerMd.querySelector('[class*="w-[66px]"]');
      const thumbLg = containerLg.querySelector('[class*="w-25"]');

      expect(thumbSm).toBeInTheDocument();
      expect(thumbMd).toBeInTheDocument();
      expect(thumbLg).toBeInTheDocument();
    });
  });

  describe("비활성화 상태", () => {
    test("disabled 상태일 때 thumb가 렌더링되지 않는다", () => {
      const { container } = render(<Scrollbar disabled />);
      // thumb는 track 내부에 있고, bevel-default와 크기 클래스를 가짐
      // track을 찾고 내부에 thumb가 없는지 확인
      const track = container.querySelector('[class*="flex-1"]');
      expect(track).toBeInTheDocument();
      // track 내부에서 thumb를 찾기 (thumb는 w-10, w-[66px], w-25, h-10, h-[66px], h-25 중 하나를 가짐)
      const thumbInTrack = track?.querySelector(
        '[class*="w-10"], [class*="w-[66px]"], [class*="w-25"], [class*="h-10"], [class*="h-[66px]"], [class*="h-25"]'
      );
      expect(thumbInTrack).not.toBeInTheDocument();
    });

    test("disabled 상태일 때 버튼들이 비활성화된다", () => {
      render(<Scrollbar disabled />);
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).toBeDisabled();
      });
    });

    test("disabled가 false일 때 thumb가 렌더링된다", () => {
      const { container } = render(<Scrollbar disabled={false} />);
      // thumb는 track 내부에 있고, 크기 클래스를 가짐
      const track = container.querySelector('[class*="flex-1"]');
      const thumb = track?.querySelector('[class*="w-[66px]"]'); // 기본 size는 md
      expect(thumb).toBeInTheDocument();
    });
  });

  describe("접근성", () => {
    test("horizontal 방향일 때 버튼에 올바른 aria-label이 설정된다", () => {
      render(<Scrollbar direction="horizontal" />);
      expect(screen.getByLabelText("왼쪽으로 스크롤")).toBeInTheDocument();
      expect(screen.getByLabelText("오른쪽으로 스크롤")).toBeInTheDocument();
    });

    test("vertical 방향일 때 버튼에 올바른 aria-label이 설정된다", () => {
      render(<Scrollbar direction="vertical" />);
      expect(screen.getByLabelText("위로 스크롤")).toBeInTheDocument();
      expect(screen.getByLabelText("아래로 스크롤")).toBeInTheDocument();
    });

    test("버튼들이 button role을 가진다", () => {
      render(<Scrollbar />);
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBe(2);
    });
  });

  describe("커스터마이징", () => {
    test("className으로 스타일을 확장할 수 있다", () => {
      const { container } = render(<Scrollbar className="custom-class" />);
      expect(container.firstChild).toHaveClass("custom-class");
    });

    test("HTML div 속성을 전달할 수 있다", () => {
      const { container } = render(<Scrollbar data-testid="scrollbar" id="custom-scrollbar" />);
      const scrollbar = container.firstChild as HTMLElement;
      expect(scrollbar).toHaveAttribute("id", "custom-scrollbar");
      expect(scrollbar).toHaveAttribute("data-testid", "scrollbar");
    });

    test("direction prop이 변경되면 버튼 aria-label이 변경된다", () => {
      const { rerender } = render(<Scrollbar direction="horizontal" />);
      expect(screen.getByLabelText("왼쪽으로 스크롤")).toBeInTheDocument();

      rerender(<Scrollbar direction="vertical" />);
      expect(screen.getByLabelText("위로 스크롤")).toBeInTheDocument();
    });

    test("size prop이 변경되면 thumb 크기가 변경된다", () => {
      const { container, rerender } = render(<Scrollbar size="sm" />);
      let thumb = container.querySelector('[class*="w-10"]');
      expect(thumb).toBeInTheDocument();

      rerender(<Scrollbar size="lg" />);
      thumb = container.querySelector('[class*="w-25"]');
      expect(thumb).toBeInTheDocument();
    });
  });

  describe("버튼 상호작용", () => {
    test("버튼을 클릭할 수 있다", async () => {
      const user = userEvent.setup();
      render(<Scrollbar />);
      const leftButton = screen.getByLabelText("왼쪽으로 스크롤");
      await user.click(leftButton);
      // 실제 스크롤 기능이 구현되지 않았으므로, 클릭 가능 여부만 확인
      expect(leftButton).toBeInTheDocument();
    });

    test("disabled 상태일 때 버튼을 클릭할 수 없다", async () => {
      const user = userEvent.setup();
      render(<Scrollbar disabled />);
      const leftButton = screen.getByLabelText("왼쪽으로 스크롤");
      expect(leftButton).toBeDisabled();
      // disabled 버튼은 클릭해도 이벤트가 발생하지 않음
      await user.click(leftButton);
      expect(leftButton).toBeDisabled();
    });
  });
});
