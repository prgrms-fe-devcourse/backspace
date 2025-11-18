import PostHeader from "./PostHeader";
import PostList from "./PostList";

interface PostListComponentProps {
  onWrite: () => void;
  onPostClick: (postId: string) => void;
}

export default function PostListComponent({ onWrite, onPostClick }: PostListComponentProps) {
  return (
    <div className="flex h-full min-h-0 flex-col gap-2.5 p-3.5">
      <PostHeader onClick={onWrite} />
      <PostList onPostClick={onPostClick} />
    </div>
  );
}
