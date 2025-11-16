/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import dayjs from "dayjs";
import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

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

export default function HomePage() {
  // 가짜 ownerId로 초기화 -> 추후 홈페이지 주인(owner)의 id 값으로 수정해야 함.
  const [ownerId, setOwnerId] = useState<string>("f4d4a5aa-34b5-4f4c-aaee-5768d0fd78e4");

  const [nickname, setNickname] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>(null);

  const [homepageId, setHomepageId] = useState<string | null>("");
  const [visibility, setVisibility] = useState<Visibility | null>(null);

  const [images, setImages] = useState<GalleryImage[]>([]);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);

  const [posts, setPosts] = useState<GalleryPost[]>([]);
  const [hasMorePosts, setHasMorePosts] = useState<boolean>(false);

  const params = useParams();

  useEffect(() => {
    const fetchHomePage = async () => {
      try {
        console.log("fetchHomePage()");

        // 홈페이지 id 가져오기
        if (!params?.homepageId) {
          console.error("존재하지 않는 homepageId 입니다.");
          setHomepageId(null);
          return; // 홈페이지 렌더링 불가
        }

        setHomepageId(params.homepageId);

        const { data: homepage, error: homepageError } = await supabase
          .from("homepages")
          .select("owner_id")
          .eq("id", params.homepageId)
          .single();

        if (homepageError) {
          console.log("homepage Error!!");
          throw homepageError;
        }

        setOwnerId(homepage.owner_id);

        // 홈페이지의 프로필 정보 가져오기 - 닉네임, 아바타 url, 자기소개
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("nickname, avatar_url, bio")
          .eq("auth_id", homepage.owner_id)
          .single();

        if (profileError) throw profileError;

        setNickname(profile.nickname);
        setAvatarUrl(profile.avatar_url);
        setBio(profile.bio);

        // 사진첩 정보 가져오기 (최근 8개)
        const {
          data: imageRows,
          count: imageCount,
          error: imageError,
        } = await supabase
          .from("homepage_gallery_images")
          .select("id, visibility, image_url", { count: "exact" })
          .eq("homepage_id", params.homepageId)
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
          .eq("homepage_id", params.homepageId)
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
                .from("homepage_post_comments") // ✅ 실제 댓글 테이블 이름에 맞게 수정
                .select("*", { head: true, count: "exact" })
                .eq("post_id", row.id); // ✅ 실제 FK 컬럼 이름에 맞게 수정

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
  }, [params.homepageId]);

  return (
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
      <div className="ml-8 flex w-2/3 flex-col gap-6">
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
        <div className="flex h-[170px] flex-col rounded-md border border-[#c8bce9] bg-[#f8f4ff] p-4 shadow-[3px_3px_0_#b9a8e3]">
          <div className="mb-2 flex items-center justify-between">
            <p className="font-semibold text-[#3d3462]">최근 게시물</p>
            {hasMorePosts && (
              <Button
                type="button"
                className="rounded border border-[#bfaee9] bg-[#f3edff] px-2 text-sm shadow-[2px_2px_0_#b9a8e3]"
              >
                더보기
              </Button>
            )}
          </div>

          <ul className="flex flex-1 flex-col text-sm text-[#3d3462]">
            {posts.map((post) => (
              <li
                key={post.id}
                className="flex flex-1 items-center justify-between border-b border-[#d7ccef] py-2 last:border-0 hover:bg-[#e9e0ff]"
              >
                <span className="pl-3">{post.title}</span>
                <div className="flex items-center gap-3 text-sm text-[#6b5fa0]">
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
