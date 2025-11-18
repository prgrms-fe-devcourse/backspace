import { useState } from "react";

import PostDetail from "./detail/PostDetail";
import PostListComponent from "./list/PostListComponent";
import PostWrite from "./write/PostWrite";

interface MinihomePost {
  id: string;
  title: string;
  content: string;
}

type ViewMode = "list" | "write" | "detail";

export default function PostTab() {
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<MinihomePost | null>(null);

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setSelectedPostId(null);
    setViewMode("list");
  };

  const handleEditPost = (post: MinihomePost) => {
    setEditingPost(post);
    setViewMode("write");
  };

  const handleEditComplete = (postId: string) => {
    setEditingPost(null);
    setSelectedPostId(postId);
    setViewMode("detail");
  };

  return (
    <div className="h-full">
      {viewMode === "list" && (
        <PostListComponent onWrite={() => setViewMode("write")} onPostClick={handlePostClick} />
      )}

      {viewMode === "write" && (
        <PostWrite
          onClose={handleBackToList}
          editingPost={editingPost}
          onCompleteEdit={handleEditComplete}
        />
      )}

      {viewMode === "detail" && selectedPostId && (
        <PostDetail postId={selectedPostId} onBack={handleBackToList} onEdit={handleEditPost} />
      )}
    </div>
  );
}
