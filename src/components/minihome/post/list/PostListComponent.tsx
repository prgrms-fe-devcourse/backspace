import PostHeader from "./PostHeader";
import PostList from "./PostList";

export default function PostListComponent({ onWrite }: { onWrite: () => void }) {
  return (
    <div className="flex h-full flex-col gap-2.5 p-3.5">
      <PostHeader onClick={onWrite} />
      <PostList />
    </div>
  );
}
