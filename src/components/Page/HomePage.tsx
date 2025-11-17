/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { User } from "@supabase/supabase-js";
import dayjs from "dayjs";
import { MessageCircle, UserRound, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/stores/useAuthStore";
import type { Database } from "@/types/database.types";
import supabase from "@/utils/supabase";

import Button from "../common/Button/Button";

type Visibility = Database["public"]["Enums"]["visibility"];

type HomepageGalleryRow = Database["public"]["Tables"]["homepage_gallery_images"]["Row"];
type HomepagePostRow = Database["public"]["Tables"]["homepage_posts"]["Row"];

interface GalleryImage {
  id: HomepageGalleryRow["id"];
  url: HomepageGalleryRow["image_url"]; // 보통 string | null
}

interface GalleryPost {
  id: HomepagePostRow["id"];
  title: HomepagePostRow["title"];
  created_at: HomepagePostRow["created_at"];
  visibility: HomepagePostRow["visibility"];
  commentCount: number;
}

export default function HomePage({ ownerId }: { ownerId: string | undefined }) {
  const [user, setUser] = useState<User | null>(useAuthStore((state) => state.user));
  const isMine = ownerId === user?.id;

  const [nickname, setNickname] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);

  const [homepageId, setHomepageId] = useState<string | null>("");
  const [visibility, setVisibility] = useState<Visibility | null>(null);

  const [friendRequested, setFriendRequested] = useState<boolean>(false);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);

  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(false);

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        if (!user) {
          console.error("존재하지 않는 user 입니다.");
          return;
        }
        console.log("fetchHomePage()");
        console.log("user", user.id);
        console.log("ownerId", ownerId);
        if (!ownerId) {
          console.error("존재하지 않는 ownerId 입니다.");
          setHomepageId(null);
          return; // 홈페이지 렌더링 불가
        }

        const { data: homepage, error: homepageError } = await supabase
          .from("homepages")
          .select("id")
          .eq("owner_id", ownerId)
          .single();

        if (homepageError) {
          console.log("homepage Error!!");
          throw homepageError;
        }

        setHomepageId(homepage.id);

        // 홈페이지의 프로필 정보 가져오기 - 닉네임, 아바타 url, 자기소개
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("nickname, avatar_url, bio")
          .eq("auth_id", ownerId)
          .single();

        if (profileError) throw profileError;

        setNickname(profile.nickname);
        setAvatarUrl(profile.avatar_url);
        setBio(profile.bio);

        // 친구 신청 여부 정보 가져오기
        const { count: friendRequestCount, error: friendRequestError } = await supabase
          .from("friend_requests")
          .select("*", { count: "exact", head: true })
          .eq("requester_id", user.id)
          .eq("addressee_id", ownerId);
        if (friendRequestError) {
          console.error("친구 신청 정보 불러오기 실패:", friendRequestError);
        } else {
          setFriendRequested(friendRequestCount === 1);
        }

        // 사진첩 정보 가져오기 (최근 8개)
        const {
          data: imageRows,
          count: imageCount,
          error: imageError,
        } = await supabase
          .from("homepage_gallery_images")
          .select("id, visibility, image_url", { count: "exact" })
          .eq("homepage_id", homepage.id)
          .order("created_at", { ascending: false })
          .limit(8);

        if (imageError) {
          throw imageError;
        }

        if (imageRows) {
          console.log("imageRows down 성공!");
          console.log("imageRows length", imageRows.length);

          const mappedImages: GalleryImage[] = imageRows.map((row) => ({
            id: row.id,
            url: row.image_url,
          }));

          setImages(mappedImages);

          const isMoreImages = (imageCount ?? 0) > 8;
          setHasMoreImages(isMoreImages);
        }

        // 게시물 정보 가져오기 (최근 3개)
        const {
          data: postRows,
          count: postCount,
          error: postError,
        } = await supabase
          .from("homepage_posts")
          .select("id, title, created_at, visibility", { count: "exact" })
          .eq("homepage_id", homepage.id)
          .order("created_at", { ascending: false })
          .limit(3);

        if (postError) {
          throw postError;
        }

        if (postRows && postRows.length > 0) {
          const commentCountByPostId: Record<string, number> = {};

          // 각 포스트별 댓글 개수 정보 가져오기
          await Promise.all(
            postRows.map(async (row) => {
              const { count, error } = await supabase
                .from("homepage_post_comments")
                .select("*", { head: true, count: "exact" })
                .eq("post_id", row.id);

              if (error) {
                console.error("댓글 개수 조회 오류", error);
                commentCountByPostId[String(row.id)] = 0;
              } else {
                commentCountByPostId[String(row.id)] = count ?? 0;
              }
            })
          );

          const mappedPosts: GalleryPost[] = postRows.map((row) => ({
            id: row.id,
            title: row.title,
            created_at: row.created_at,
            visibility: row.visibility,
            commentCount: commentCountByPostId[String(row.id)] ?? 0,
          }));

          setPosts(mappedPosts);

          const isMorePosts = (postCount ?? 0) > 3;
          setHasMorePosts(isMorePosts);
        }
      } catch (e) {
        console.error("홈 페이지 데이터 로드 중 오류", e);
      } finally {
        console.log("finally");
      }
    };

    fetchHomePage();
  }, [ownerId, user]);

  return (
    <div className="bevel-default flex min-h-[428px] w-[592px] p-6">
      {/* 왼쪽 프로필 영역 */}
      <div className="mr-6 flex w-1/3 flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="relative">
          {avatarUrl ? (
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-[#B2AAEB]">
              <img className="h-full w-full object-cover" src={avatarUrl} alt="" />
            </div>
          ) : (
            <div className="bevel-default flex h-32 w-32 items-center justify-center rounded-full">
              <UserRound size={48} color="#B2AAEB" />
            </div>
          )}
        </div>

        {/* 이름 */}
        <p className="mt-4 text-lg text-[#342b4e]">{nickname}</p>

        {/* 소개글 */}
        <div className="bevel-pressed relative mt-4 flex h-2/3 w-1/1 justify-center bg-white p-4 text-center text-xs leading-relaxed text-[#2D2640]">
          <p>{bio}</p>
        </div>

        {/* 친구 신청 버튼 */}
        <Button
          type="button"
          className="mt-6 h-16 w-1/1 py-2 text-sm text-[#3f3570] hover:bg-[#e9e0ff]"
        >
          <div className="flex items-center gap-3">
            <Star size={17} color="#B2AAEB" /> <p>친구 신청</p>
          </div>
        </Button>
      </div>

      {/* 오른쪽 콘텐츠 */}
      <div className="flex w-2/3 flex-col gap-6">
        {/* 사진첩 */}
        <div className="bevel-pressed bg-white p-4 text-[#2D2640]">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm text-[#3d3462]">사진첩</p>
            {hasMoreImages && (
              <Button type="button" size="md">
                더보기
              </Button>
            )}
          </div>

          {/* 2행 4열 사진칸 */}
          <div className="grid grid-cols-4 gap-3">
            {images.map((img) => (
              <div
                key={img.id}
                className="bevel-default flex aspect-square w-full items-center justify-center p-1"
              >
                {img.url ? (
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
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
        <div className="bevel-pressed flex h-[170px] flex-col bg-white p-4 text-[#2D2640]">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-[#3d3462]">최근 게시물</p>
            {hasMorePosts && (
              <Button type="button" size="md">
                더보기
              </Button>
            )}
          </div>

          <ul className="flex flex-1 flex-col text-xs text-[#3d3462]">
            {posts.map((post) => (
              <li
                key={post.id}
                className="mr-3 flex flex-1 items-center justify-between border-b border-[#d7ccef] py-2 last:border-0 hover:bg-[#e9e0ff]"
              >
                <span className="pl-3">{post.title}</span>
                <div className="flex items-center gap-3 text-[#6b5fa0]">
                  <span>{dayjs(post.created_at).format("MM/DD")}</span>
                  <div className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    <span>{post.commentCount}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
