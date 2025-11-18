import { useEffect, useState } from "react";

import Button from "@/components/common/Button/Button";
import Input from "@/components/common/Input/Input";
import { useAuthStore } from "@/stores/useAuthStore";
import { useWindowStore } from "@/stores/useWindowStore";
import type { Profile } from "@/types/profile.types";

import { searchFriends } from "./api/searchFriends";

export default function Search() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<Profile[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const openWindow = useWindowStore((state) => state.openWindow);
  const userId = useAuthStore((state) => state.user?.id);

  // TODO: 이후 에러 핸들링 및 폴백 구현
  // const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (!keyword.trim()) return;

    /*
    TODO: API에서 throw error를 함으로 일단 try catch로 구현
    이후 에러 핸들링 구현 시, return error 후 if error로 구현
    */
    try {
      // setIsLoading(true);
      const data = await searchFriends(keyword, userId);
      setResults(data);
      setHasSearched(true);
    } catch (err) {
      console.error(err);
      // setError(true);
    } finally {
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!keyword.trim()) {
      setHasSearched(false);
      setResults([]);
    }
  }, [keyword]);

  return (
    <div className="flex h-full min-h-0 flex-col p-4">
      <div>
        <div className="bevel-pressed bg-base-1 flex h-full flex-col p-4">
          <div className="flex w-full items-stretch gap-1">
            <Input
              placeholder="이름이나 이메일을 입력해주세요..."
              className="min-w-0 flex-1"
              aria-label="친구 검색"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button size="md" className="self-center" onClick={handleSearch}>
              검색
            </Button>
          </div>
        </div>
      </div>
      {hasSearched && (
        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-1">
          <span className="p">검색 결과 {results.length}</span>
          <div className="bevel-pressed bg-text-invert scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto p-3">
            <ul>
              {results.map((user) => (
                <li key={user.auth_id}>
                  <div className="flex items-center gap-3 p-2 pl-2 select-none">
                    <div className="shrink-0">
                      <img
                        // TODO: 디폴트 아바타 설정
                        src={user.avatar_url!}
                        alt="프로필 아바타"
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col">
                      <span className="truncate text-sm font-medium">{user.nickname}</span>
                      <span className="text-text-subtle truncate text-xs">{user.email}</span>
                    </div>

                    <div className="shrink-0">
                      <Button
                        size="md"
                        onClick={() => {
                          openWindow("friendHome", user.auth_id);
                        }}
                      >
                        방문
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
