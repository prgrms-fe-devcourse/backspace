import { useEffect, useState } from "react";

import BevelScrollContainer from "@/components/Container/BevelScrollContainer";
import { useAuthStore } from "@/stores/useAuthStore";

import {
  deleteGuestBookEntry,
  deleteGuestBookReply,
  getGuestBookWithComment,
  insertEntry,
  insertReply,
} from "./api/guestbook";
import type { GuestbookWithComments } from "./types/guestbook.types";
import Comment from "./ui/Comment";
import CommentInput from "./ui/CommentInput";
import Entry from "./ui/Entry";
import EntryTextArea from "./ui/EntryTextArea";

export default function GuestBook({ ownerId }: { ownerId: string | undefined }) {
  const user = useAuthStore((state) => state.user);
  const isMine = ownerId !== undefined && ownerId === user?.id;
  const [data, setData] = useState<GuestbookWithComments[]>([]);

  // TODO: 이후 에러 핸들링 및 폴백 구현
  // const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!ownerId) return;

    const fetchGuestbookData = async () => {
      // setIsLoading(true);
      const { data: fetchData, error: fetchError } = await getGuestBookWithComment(ownerId);

      // TODO: 에러 핸들링
      if (fetchError) {
        console.error("error");
        // setError(true);
        return;
      }

      setData(fetchData);
      // setIsLoading(false);
    };

    fetchGuestbookData();
  }, [ownerId]);

  const handleEntryDelete = async (id: string) => {
    const fetchError = await deleteGuestBookEntry(id);

    // TODO: 에러 핸들링 추가
    if (fetchError) {
      console.error(fetchError);
      // setError(true);
      return;
    }

    setData((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleReplyDelete = async (entryId: string, replyId: string) => {
    const fetchError = await deleteGuestBookReply(replyId);

    // TODO: 에러 핸들링 추가
    if (fetchError) {
      console.error(fetchError);
      // setError(true);
      return;
    }

    setData((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              comments: entry.comments.filter((c) => c.id !== replyId),
            }
          : entry
      )
    );
  };

  const handleReplyWrite = async (entryId: string, content: string) => {
    if (content.trim() === "") return;
    if (!user?.id) return;

    const { data: fetchData, error: fetchError } = await insertReply(user.id, entryId, content);

    // TODO: 에러 핸들링
    if (fetchError || !fetchData) {
      console.error(fetchError);
      // setError(true);
      return;
    }

    setData((prev) =>
      prev.map((entry) =>
        entry.id === entryId
          ? {
              ...entry,
              comments: fetchData,
            }
          : entry
      )
    );
  };

  const handleEntry = async (content: string) => {
    if (content.trim() === "") return;
    if (!user?.id || !ownerId) return;

    const { data: fetchData, error: fetchError } = await insertEntry(user.id, ownerId, content);

    // TODO: 에러 핸들링
    if (fetchError || !fetchData) {
      console.error(fetchError);
      // setError(true);
      return;
    }

    setData((prev) => [fetchData, ...prev]);
  };

  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      {!isMine && <EntryTextArea onSubmit={handleEntry} />}
      <div className="flex min-h-0 flex-1 flex-col gap-1">
        <span className="p">전체 방명록 {data.length}</span>
        <div className="flex min-h-0 flex-1">
          <BevelScrollContainer>
            <ul className="flex flex-col gap-2">
              {data.map((entry) => (
                <li key={entry.id}>
                  <Entry
                    id={entry.id}
                    author={entry.author}
                    created_at={entry.created_at}
                    content={entry.content}
                    canDelete={isMine || entry.author?.auth_id === user?.id}
                    onDelete={() => handleEntryDelete(entry.id)}
                  >
                    {entry.comments.length > 0 ? (
                      <Comment
                        id={entry.comments[0].id}
                        commenter={entry.comments[0].commenter}
                        created_at={entry.comments[0].created_at}
                        content={entry.comments[0].content}
                        canDelete={isMine}
                        onDelete={() => handleReplyDelete(entry.id, entry.comments[0].id)}
                      />
                    ) : (
                      isMine && <CommentInput entryId={entry.id} onSubmit={handleReplyWrite} />
                    )}
                  </Entry>
                </li>
              ))}
            </ul>
          </BevelScrollContainer>
        </div>
      </div>
    </div>
  );
}
