import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, test, expect } from "vitest";

import CheckBox from "./CheckBox";

describe("Custom CheckBox", () => {
  //
  // ------------------------------------------------------------------
  // 렌더링
  // ------------------------------------------------------------------
  //
  describe("렌더링", () => {
    test("체크박스 input이 렌더링된다", () => {
      render(<CheckBox />);

      const input = screen.getByRole("checkbox");
      expect(input).toBeInTheDocument();
    });

    test("input 바로 뒤에 Box(div)가 렌더링된다", () => {
      render(<CheckBox />);
      const input = screen.getByRole("checkbox");

      const box = input.nextElementSibling;
      expect(box?.tagName).toBe("DIV");
      expect(box).toBeInTheDocument();
    });

    test("label text가 있으면 span이 렌더링된다", () => {
      render(<CheckBox label="동의합니다" />);
      expect(screen.getByText("동의합니다")).toBeInTheDocument();
    });
  });

  //
  // ------------------------------------------------------------------
  // Uncontrolled (기본 상태 관리)
  // ------------------------------------------------------------------
  //
  describe("Uncontrolled 동작", () => {
    test("기본값은 체크되지 않은 상태", () => {
      render(<CheckBox />);
      const input = screen.getByRole("checkbox");
      expect(input).not.toBeChecked();
    });

    test("input 클릭 시 체크 → 다시 클릭하면 해제된다", async () => {
      const user = userEvent.setup();
      render(<CheckBox label="동의" />);

      const input = screen.getByRole("checkbox");

      await user.click(input);
      expect(input).toBeChecked();

      await user.click(input);
      expect(input).not.toBeChecked();
    });

    test("label wrapper 전체를 클릭해도 체크 상태가 토글된다", async () => {
      const user = userEvent.setup();
      render(<CheckBox label="전체동의" />);

      const label = screen.getByText("전체동의").closest("label")!;
      const input = screen.getByRole("checkbox");

      await user.click(label);
      expect(input).toBeChecked();
    });
  });

  //
  // ------------------------------------------------------------------
  // SVG 체크 아이콘
  // ------------------------------------------------------------------
  //
  describe("SVG 렌더링", () => {
    test("체크 시 SVG가 box 내부에 나타난다", async () => {
      const user = userEvent.setup();
      render(<CheckBox label="동의" />);

      const input = screen.getByRole("checkbox");
      const box = input.nextElementSibling as HTMLElement;

      await user.click(input);

      const svg = box.querySelector("svg");
      expect(svg).not.toBeNull();
    });

    test("해제하면 SVG가 사라진다", async () => {
      const user = userEvent.setup();
      render(<CheckBox label="동의" />);

      const input = screen.getByRole("checkbox");
      const box = input.nextElementSibling as HTMLElement;

      await user.click(input); // 체크
      await user.click(input); // 해제

      expect(box.querySelector("svg")).toBeNull();
    });
  });

  //
  // ------------------------------------------------------------------
  // Controlled
  // ------------------------------------------------------------------
  //
  describe("Controlled 모드", () => {
    test("외부에서 checked 상태를 제어할 수 있다", async () => {
      const user = userEvent.setup();

      function ControlledTest() {
        const [checked, setChecked] = useState(false);
        return <CheckBox checked={checked} onCheckedChange={setChecked} label="동의" />;
      }

      render(<ControlledTest />);
      const input = screen.getByRole("checkbox");

      expect(input).not.toBeChecked();

      await user.click(input);
      expect(input).toBeChecked();
    });

    test("controlled 모드에서 외부 checked가 true면 내부 toggle이 되지 않는다", async () => {
      const user = userEvent.setup();

      render(<CheckBox checked label="동의" />);
      const input = screen.getByRole("checkbox");

      await user.click(input);
      expect(input).toBeChecked(); // 유지됨
    });
  });

  //
  // ------------------------------------------------------------------
  // Disabled
  // ------------------------------------------------------------------
  //
  describe("Disabled 상태", () => {
    test("disabled 시 클릭해도 체크되지 않는다", async () => {
      const user = userEvent.setup();
      render(<CheckBox disabled label="동의" />);

      const input = screen.getByRole("checkbox");
      await user.click(input);

      expect(input).not.toBeChecked();
    });

    test("wrapper(label)에 disabled 스타일(pointer-events-none)이 적용된다", () => {
      render(<CheckBox disabled label="동의" />);

      const wrapper = screen.getByText("동의").closest("label")!;
      expect(wrapper.className).toContain("pointer-events-none");
    });
  });

  //
  // ------------------------------------------------------------------
  // Focus 스타일 (@utility focus-dotted)
  // ------------------------------------------------------------------
  describe("포커스 상태", () => {
    test("input 클릭 시 포커스가 정상적으로 이동한다", async () => {
      const user = userEvent.setup();
      render(<CheckBox label="동의" />);

      const input = screen.getByRole("checkbox");
      const text = screen.getByText("동의");

      // 1) span 자체는 focus를 얻지 않음
      expect(text).not.toHaveFocus();

      // 2) input 클릭 → input은 focus를 얻어야 한다.
      await user.click(input);
      expect(input).toHaveFocus();

      // 3) group-focus-within 구조가 올바르게 렌더링되어야 함 (DOM 검증)
      const wrapper = text.closest("label")!;
      expect(wrapper.className).toContain("group");

      // Tailwind는 class가 변경되지 않기 때문에 style 검사 불가.
      // 대신 구조적으로 group-focus-within이 적용 가능한지 확인한다.
    });
  });

  //
  // ------------------------------------------------------------------
  // className 확장
  // ------------------------------------------------------------------
  //
  describe("className 확장", () => {
    test("className은 wrapper(label)에 적용된다", () => {
      render(<CheckBox label="Agree" className="custom-class" />);

      const input = screen.getByRole("checkbox");
      const wrapper = input.closest("label")!;
      expect(wrapper).toHaveClass("custom-class");
    });
  });
});
