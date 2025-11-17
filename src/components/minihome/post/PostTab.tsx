import { useState } from "react";

import PostDetail from "./detail/PostDetail";
import PostListComponent from "./list/PostListComponent";
import PostWrite from "./write/PostWrite";

type ViewMode = "list" | "write" | "detail";

export default function PostTab() {
  // const [isWriting, setIsWriting] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setViewMode("list");
  };

  return (
    <div className="h-full">
      {viewMode === "list" && (
        <PostListComponent
          onWrite={() => setViewMode("write")}
          onPostClick={handlePostClick} // 👈 6. 클릭 핸들러 전달
        />
      )}

      {viewMode === "write" && <PostWrite onClose={handleBackToList} />}

      {viewMode === "detail" && selectedPostId && (
        <PostDetail postId={selectedPostId} onBack={handleBackToList} />
      )}
    </div>
  );
}
