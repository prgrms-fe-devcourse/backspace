import { SquarePen } from "lucide-react";

import Button from "@/components/common/Button/Button";

export default function PostHeader({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex items-center justify-between">
      {/* TODO: 나중에 전체 게시글 옆에 length로 몇개인지 불러오기 */}
      <p className="text-sm">전체 게시글</p>
      <Button size="lg" onClick={onClick}>
        <SquarePen width={14} />
        글쓰기
      </Button>
    </div>
  );
}
