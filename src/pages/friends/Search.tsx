import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

export default function Search() {
  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div className="bevel-pressed bg-base-1 flex h-full min-h-0 flex-col p-4">
        <div className="flex w-full items-stretch gap-1">
          <Input
            placeholder="이름이나 이메일을 입력해주세요..."
            className="min-w-0 flex-1"
            aria-label="친구 검색"
          />
          <Button size="md" className="self-center">
            검색
          </Button>
        </div>
      </div>
    </div>
  );
}
