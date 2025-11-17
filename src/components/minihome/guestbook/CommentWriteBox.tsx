import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";

export default function CommentWriteBox() {
  return (
    <div className="flex w-full items-stretch gap-1">
      <Input className="min-w-0 flex-1" aria-label="답글 내용" />
      <Button size="md" className="self-center">
        작성
      </Button>
    </div>
  );
}
