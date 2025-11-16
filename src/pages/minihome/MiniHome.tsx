import * as Tabs from "@radix-ui/react-tabs";
import { Activity, useEffect, useState } from "react";

import RoundedTab from "@/components/os/Tab/RoundedTab";
import { MINIHOME_TABS, type MiniHomeTabs } from "@/types/minihome.types";

function useDetailState<TabId>() {
  const [selectedId, setSelectedId] = useState<TabId | null>(null);

  const enterDetail = (id: TabId) => setSelectedId(id);
  const exitDetail = () => setSelectedId(null);

  return { selectedId, enterDetail, exitDetail };
}

export default function MiniHome({ tab = MINIHOME_TABS.HOME }: { tab?: MiniHomeTabs }) {
  const [activeTab, setActiveTab] = useState<MiniHomeTabs>(tab);

  const galleryDetail = useDetailState<string>();
  const memoDetail = useDetailState<string>();

  useEffect(() => {
    galleryDetail.exitDetail();
    memoDetail.exitDetail();
  }, [activeTab, galleryDetail, memoDetail]);

  return (
    <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as MiniHomeTabs)}>
      <Tabs.List aria-label="미니홈 탭">
        {Object.values(MINIHOME_TABS).map((v) => (
          <Tabs.Trigger key={v} value={v} asChild>
            <RoundedTab isActive={activeTab === v}>{v}</RoundedTab>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {/* TODO: 컴포넌트 주입해주시면 됩니다. */}
      <Tabs.Content value={MINIHOME_TABS.HOME}>
        <Activity>홈</Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.GALLERY}>
        <Activity>
          사진첩
          {/* {galleryDetail.selectedId ? (
            <GalleryDetail photoId={galleryDetail.selectedId} onBack={galleryDetail.exitDetail} />
          ) : (
            <Gallery onSelectPhoto={galleryDetail.enterDetail} />
          )} */}
        </Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.MEMO}>
        <Activity>
          메모
          {/* {memoDetail.selectedId ? (
            <MemoDetail memoId={memoDetail.selectedId} onBack={memoDetail.exitDetail} />
          ) : (
            <Memo onSelectMemo={memoDetail.enterDetail} />
          )} */}
        </Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.GUESTBOOK}>
        <Activity>방명록</Activity>
      </Tabs.Content>
    </Tabs.Root>
  );
}
