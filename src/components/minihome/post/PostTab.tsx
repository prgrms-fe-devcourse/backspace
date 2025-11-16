import { useState } from "react";

import PostListComponent from "./list/PostListComponent";
import PostWrite from "./write/PostWrite";

export default function PostTab() {
  const [isWriting, setIsWriting] = useState(false);

  return (
    <div className="h-full">
      {isWriting ? (
        <PostWrite onClose={() => setIsWriting(false)} />
      ) : (
        <PostListComponent onWrite={() => setIsWriting(true)} />
      )}
    </div>
  );
}
