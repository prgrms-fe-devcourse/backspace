import { MessageCircle } from "lucide-react";

export default function MainPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="bevel-default flex min-h-[520px] w-[900px] p-6">
        {/* 왼쪽 프로필 영역 */}
        <div className="flex w-1/3 flex-col items-center">
          {/* 프로필 이미지 */}
          <div className="relative">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#e0d4f7] text-6xl text-[#a493d1] shadow-[4px_4px_0_#b9a8e3]" />
          </div>

          {/* 이름 */}
          <p className="mt-4 text-lg font-bold text-[#342b4e]">도토리 부자</p>

          {/* 소개글 */}
          <div className="relative mt-4 flex h-[100px] w-[200px] items-center justify-center rounded-md border border-[#c8bce9] bg-white text-center text-sm leading-relaxed text-[#3d3462] shadow-[3px_3px_0_#b9a8e3]">
            <p>
              좋은 음악과 따뜻한 사람들을 <br /> 좋아합니다 🌸
            </p>
          </div>

          {/* 친구 신청 버튼 */}
          <button
            type="button"
            className="mt-6 w-[180px] rounded-md border border-[#bfaee9] bg-[#f3edff] py-2 text-[#3f3570] shadow-[3px_3px_0_#b9a8e3] transition hover:bg-[#e9e0ff]"
          >
            ☆ 친구 신청
          </button>
        </div>

        {/* 오른쪽 콘텐츠 */}
        <div className="ml-8 flex w-2/3 flex-col gap-4">
          {/* 사진첩 */}
          <div className="rounded-md border border-[#c8bce9] bg-[#f8f4ff] p-4 shadow-[3px_3px_0_#b9a8e3]">
            <div className="mb-3 flex items-center justify-between">
              <p className="font-semibold text-[#3d3462]">사진첩</p>
              <button
                type="button"
                className="rounded border border-[#bfaee9] bg-[#f3edff] px-2 text-sm shadow-[2px_2px_0_#b9a8e3]"
              >
                더보기
              </button>
            </div>

            {/* 2행 4열 사진칸 */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                <div
                  key={idx}
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-[#c8bce9] bg-[#eae3fa] text-[#a18ed7] shadow-[3px_3px_0_#b9a8e3]"
                >
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
                </div>
              ))}
            </div>
          </div>

          {/* 최근 게시물 */}
          <div className="rounded-md border border-[#c8bce9] bg-[#f8f4ff] p-4 shadow-[3px_3px_0_#b9a8e3]">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-semibold text-[#3d3462]">최근 게시물</p>
              <button
                type="button"
                className="rounded border border-[#bfaee9] bg-[#f3edff] px-2 text-sm shadow-[2px_2px_0_#b9a8e3]"
              >
                더보기
              </button>
            </div>

            <ul className="text-sm text-[#3d3462]">
              {[
                { id: 1, text: "오늘 날씨 너무 좋다~", date: "11/10", comment: 5 },
                { id: 2, text: "친구들이랑 놀러갔어요", date: "11/09", comment: 12 },
                { id: 3, text: "새로운 음악 추천받아요!", date: "11/08", comment: 8 },
              ].map((post) => (
                <li
                  key={post.id}
                  className="flex items-center justify-between border-b border-[#d7ccef] py-2 last:border-0"
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
