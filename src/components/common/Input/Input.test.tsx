import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState, type ChangeEvent } from "react";
import { describe, test, expect } from "vitest";

import Input from "@/components/common/Input/Input";

describe("Input", () => {
  describe("렌더링", () => {
    test("기본 인풋이 렌더링 된다", () => {
      render(<Input placeholder="텍스트 입력" />);
      expect(screen.getByPlaceholderText("텍스트 입력")).toBeInTheDocument();
    });

    test("placeholder 없이도 렌더링 된다", () => {
      render(<Input />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("입력 동작", () => {
    test("텍스트를 입력할 수 있다", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="이름" />);

      const input = screen.getByPlaceholderText("이름");
      await user.type(input, "John Doe");

      expect(input).toHaveValue("John Doe");
    });

    test("초기값이 설정된다", () => {
      render(<Input defaultValue="기본값" />);

      expect(screen.getByDisplayValue("기본값")).toBeInTheDocument();
    });

    test("제어 컴포넌트로 동작한다", async () => {
      const user = userEvent.setup();

      function TestComponent() {
        const [value, setValue] = useState<string>("");

        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          setValue(e.target.value);
        };

        return <Input value={value} onChange={handleChange} placeholder="입력" />;
      }

      render(<TestComponent />);
      const input = screen.getByPlaceholderText("입력");

      await user.type(input, "test");
      expect(input).toHaveValue("test");
    });

    test("값을 지울 수 있다", async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="삭제될 텍스트" />);

      const input = screen.getByDisplayValue("삭제될 텍스트");
      await user.clear(input);

      expect(input).toHaveValue("");
    });
  });

  describe("에러 상태", () => {
    test("에러 메시지가 표시된다", () => {
      render(<Input error="필수 입력 항목입니다" aria-label="입력" />);

      const input = screen.getByLabelText("입력");
      const errorEl = screen.getByText("필수 입력 항목입니다");

      expect(errorEl).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-invalid", "true");
      expect(input).toHaveAttribute("aria-errormessage", errorEl.id);
    });

    test("에러 상태일 때 aria-invalid가 true다", () => {
      render(<Input error="에러 발생" placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });

    test("에러가 없으면 aria-invalid가 없다", () => {
      render(<Input placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      expect(input).not.toHaveAttribute("aria-invalid");
    });

    test("에러가 없으면 에러 메시지가 표시되지 않는다", () => {
      render(<Input placeholder="입력" />);
      const input = screen.getByPlaceholderText("입력");

      expect(input).not.toHaveAttribute("aria-errormessage");
    });

    test("에러 메시지가 변경되면 화면에 반영된다", () => {
      const { rerender } = render(<Input error="첫 번째 에러" aria-label="입력" />);
      expect(screen.getByText("첫 번째 에러")).toBeInTheDocument();

      rerender(<Input error="두 번째 에러" aria-label="입력" />);
      expect(screen.getByText("두 번째 에러")).toBeInTheDocument();
    });
  });

  describe("포커스 상태", () => {
    test("포커스할 수 있다", async () => {
      const user = userEvent.setup();
      render(<Input placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      await user.click(input);

      expect(input).toHaveFocus();
    });

    test("Tab 키로 포커스 이동이 가능하다", async () => {
      const user = userEvent.setup();
      render(
        <>
          <Input placeholder="첫 번째" />
          <Input placeholder="두 번째" />
        </>
      );

      await user.tab();
      expect(screen.getByPlaceholderText("첫 번째")).toHaveFocus();

      await user.tab();
      expect(screen.getByPlaceholderText("두 번째")).toHaveFocus();
    });

    test("프로그래밍 방식으로 포커스할 수 있다", () => {
      render(<Input placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      input.focus();
      expect(input).toHaveFocus();
    });
  });

  describe("비활성화 상태", () => {
    test("disabled 상태가 적용된다", () => {
      render(<Input disabled placeholder="입력" />);

      expect(screen.getByPlaceholderText("입력")).toBeDisabled();
    });

    test("비활성화 상태에서 입력할 수 없다", async () => {
      const user = userEvent.setup();
      render(<Input disabled placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      await user.type(input, "test");

      expect(input).toHaveValue("");
    });

    test("비활성화 상태에서 포커스할 수 없다", async () => {
      const user = userEvent.setup();
      render(<Input disabled placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      await user.click(input);

      expect(input).not.toHaveFocus();
    });

    test("비활성화 상태에서도 에러 메시지는 표시된다", () => {
      render(<Input disabled error="에러 발생" aria-label="입력" />);

      const input = screen.getByLabelText("입력");
      const errorEl = screen.getByText("에러 발생");

      expect(errorEl).toBeInTheDocument();
      expect(input).toHaveAttribute("aria-errormessage", errorEl.id);
    });
  });

  describe("접근성", () => {
    test("role이 textbox다", () => {
      render(<Input />);

      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("aria-label을 설정할 수 있다", () => {
      render(<Input aria-label="사용자 이름 입력" />);

      expect(screen.getByLabelText("사용자 이름 입력")).toBeInTheDocument();
    });

    test("required 속성이 적용된다", () => {
      render(<Input required aria-label="필수 입력" />);

      expect(screen.getByRole("textbox")).toBeRequired();
    });

    test("readonly 속성이 적용된다", () => {
      render(<Input readOnly defaultValue="읽기 전용" />);

      const input = screen.getByDisplayValue("읽기 전용");
      expect(input).toHaveAttribute("readonly");
    });
  });

  describe("커스터마이징", () => {
    test("className으로 스타일을 확장할 수 있다", () => {
      render(<Input className="custom-class" placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      expect(input).toHaveClass("custom-class");
    });

    test("HTML input 속성을 전달할 수 있다", () => {
      render(<Input name="username" maxLength={50} autoComplete="username" placeholder="입력" />);

      const input = screen.getByPlaceholderText("입력");
      expect(input).toHaveAttribute("name", "username");
      expect(input).toHaveAttribute("maxlength", "50");
      expect(input).toHaveAttribute("autocomplete", "username");
    });

    test("id를 설정할 수 있다", () => {
      render(<Input id="custom-id" />);

      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "custom-id");
    });
  });
});
