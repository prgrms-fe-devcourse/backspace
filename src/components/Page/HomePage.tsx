/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

import type { Database } from "@/types/database.types";
import supabase from "@/utils/supabase";

import Button from "../common/Button/Button";

export default function HomePage() {
  interface GalleryImage {
    id: string;
    url: string | null;
  }

  const [userId, setUserId] = useState<string>("f4d4a5aa-34b5-4f4c-aaee-5768d0fd78e4");

  const [nickname, setNickname] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);

  const [homepageId, setHomepageId] = useState<string>("gall");
  const [visibility, setVisibility] = useState<Database["public"]["Enums"]["visibility"] | null>(
    null
  );
  // const [imageUrl, setImageUrl] = useState<(string | null)[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        console.log("fetchHomePage()");
        // 프로필 정보 가져오기 - 닉네임, 아바타 url, 자기소개
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("auth_id, nickname, avatar_url, bio")
          .eq("auth_id", userId)
          .single();
        if (profileError) throw profileError;

        setNickname(profile.nickname);
        setAvatarUrl(profile.avatar_url);
        setBio(profile.bio);

        // 홈페이지 id 가져오기
        const { data: homepage, error: homepageError } = await supabase
          .from("homepages")
          .select("id")
          .eq("owner_id", profile.auth_id)
          .single();
        if (homepageError) {
          console.log("homepage Error!!");
          throw homepageError;
        }

        setHomepageId(homepage.id);
        console.log("homepage.id", homepage.id);

        // 사진첩 정보 가져오기 (최근 8개)
        const {
          data: imageRows,
          count,
          error: imageError,
        } = await supabase
          .from("homepage_gallery_images")
          .select("id, visibility, image_url", { count: "exact" })
          .eq("homepage_id", homepage.id)
          .order("created_at", { ascending: false })
          .limit(8);
        if (imageError) {
          throw imageError;
        } else if (imageRows) {
          console.log("imageRows down 성공!");
          console.log("imageRows length", imageRows.length);

          const mapped = imageRows.map((row) => ({
            id: row.id,
            url: row.image_url,
          }));
          setImages(mapped);
          const isMore = (count ?? 0) > 8;
          setHasMoreImages(isMore);
        }

        // 게시글 정보 가져오기
        // const { data: post, error: postError } = await supabase
        //   .from("homepage_posts")
        //   .select("homepage_id, , bio")
        //   .eq("auth_id", userId)
        //   .single();
        // if (postError) throw postError;
      } catch (e) {
        console.error("홈 페이지 데이터 로드 중 오류", e);
      } finally {
        console.log("finally");
      }
    };
    fetchHomePage();
  }, [userId]);

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="bevel-default flex min-h-[520px] w-[900px] p-6">
        {/* 왼쪽 프로필 영역 */}
        <div className="flex w-1/3 flex-col items-center">
          {/* 프로필 이미지 */}
          <div className="relative">
            {avatarUrl ? (
              <div className="h-32 w-32 overflow-hidden rounded-full">
                <img className="h-full w-full object-cover" src={avatarUrl} alt="" />
              </div>
            ) : (
              <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#e0d4f7] shadow-[4px_4px_0_#b9a8e3]" />
            )}
          </div>

          {/* 이름 */}
          <p className="mt-4 text-lg font-bold text-[#342b4e]">{nickname}</p>

          {/* 소개글 */}
          <div className="relative mt-4 flex h-[100px] w-[200px] items-center justify-center rounded-md border border-[#c8bce9] bg-white text-center text-sm leading-relaxed text-[#3d3462] shadow-[3px_3px_0_#b9a8e3]">
            <p>{bio}</p>
          </div>

          {/* 친구 신청 버튼 */}
          <Button
            type="button"
            size="lg"
            className="mt-6 w-[180px] rounded-md border border-[#bfaee9] bg-[#f3edff] py-2 text-[#3f3570] shadow-[3px_3px_0_#b9a8e3] transition hover:bg-[#e9e0ff]"
          >
            ☆ 친구 신청
          </Button>
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="ml-8 flex w-2/3 flex-col gap-4">
          {/* 사진첩 */}
          <div className="rounded-md border border-[#c8bce9] bg-[#f8f4ff] p-4 shadow-[3px_3px_0_#b9a8e3]">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-[#3d3462]">사진첩</p>
              {hasMoreImages && (
                <Button
                  type="button"
                  className="rounded border border-[#bfaee9] bg-[#f3edff] px-2 text-sm shadow-[2px_2px_0_#b9a8e3]"
                >
                  더보기
                </Button>
              )}
            </div>

            {/* 2행 4열 사진칸 */}
            <div className="grid grid-cols-4 gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-[#c8bce9] bg-[#eae3fa] text-[#a18ed7] shadow-[3px_3px_0_#b9a8e3]"
                >
                  {img.url ? (
                    <img src={img.url} alt="" className="h-full w-full rounded-md object-cover" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="h-6 w-6"
                    >
                      <path d="M3 5h18v14H3z" />
                      <circle cx="8" cy="9" r="2" />
                      <path d="M21 15l-5-5L5 19" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 최근 게시물 */}
          <div className="rounded-md border border-[#c8bce9] bg-[#f8f4ff] p-4 shadow-[3px_3px_0_#b9a8e3]">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-[#3d3462]">최근 게시물</p>
              <Button
                type="button"
                className="rounded border border-[#bfaee9] bg-[#f3edff] px-2 text-sm shadow-[2px_2px_0_#b9a8e3]"
              >
                더보기
              </Button>
            </div>

            <ul className="text-sm text-[#3d3462]">
              {[
                { id: 1, text: "오늘 날씨 너무 좋다~", date: "11/10", comment: 5 },
                { id: 2, text: "친구들이랑 놀러갔어요", date: "11/09", comment: 12 },
                { id: 3, text: "새로운 음악 추천받아요!", date: "11/08", comment: 8 },
              ].map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between border-b border-[#d7ccef] py-2 last:border-0 hover:bg-[#e9e0ff]"
                >
                  <span>{post.text}</span>
                  <div className="flex items-center gap-3 text-sm text-[#6b5fa0]">
                    <span>{post.date}</span>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={14} />
                      <span>{post.comment}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
