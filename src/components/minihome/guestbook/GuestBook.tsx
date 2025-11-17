import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";

import { fetchGuestbookWithComments } from "./api/guestbook";
import CommentWriteBox from "./CommentWriteBox";
import GuestBookEntry from "./GuestBookEntry";
import GuestbookWriteBox from "./GuestbookWriteBox";
import Reply from "./Reply";
import type { GuestbookWithComments } from "./types/guestbook.types";

export default function GuestBook({ ownerId }: { ownerId: string | undefined }) {
  const user = useAuthStore((state) => state.user);
  const isMine = ownerId !== undefined && ownerId === user?.id;
  const [data, setData] = useState<GuestbookWithComments[]>([]);

  /* eslint-disable @typescript-eslint/no-unused-vars */
  // TODO: 이후 에러 핸들링 및 폴백 구현
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!ownerId) return;

    /*
    TODO: API에서 throw error를 함으로 일단 try catch로 구현
    이후 에러 핸들링 구현 시, return error 후 if error로 구현
    */
    const fetchGuestbookData = async () => {
      try {
        setIsLoading(true);
        const fetchData = await fetchGuestbookWithComments(ownerId);
        setData(fetchData);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuestbookData();
  }, [ownerId]);

  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      {!isMine && <GuestbookWriteBox />}
      <div className="flex min-h-0 flex-1 flex-col gap-1">
        <span className="p">전체 방명록 {data.length}</span>
        <div className="bevel-pressed bg-text-invert scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
          <ul className="flex flex-col gap-2">
            {data.map((entry) => (
              <li key={entry.id}>
                <GuestBookEntry
                  id={entry.id}
                  author={entry.author}
                  created_at={entry.created_at}
                  content={entry.content}
                >
                  {entry.comments.length > 0 ? (
                    <Reply
                      id={entry.comments[0].id}
                      commenter={entry.comments[0].commenter}
                      created_at={entry.comments[0].created_at}
                      content={entry.comments[0].content}
                    />
                  ) : (
                    isMine && <CommentWriteBox />
                  )}
                </GuestBookEntry>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
