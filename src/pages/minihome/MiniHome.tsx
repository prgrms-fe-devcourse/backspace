import * as Tabs from "@radix-ui/react-tabs";
import { Activity, useEffect, useState } from "react";

import Gallery from "@/components/minihome/gallery/Gallery";
import GalleryUploadPanel from "@/components/minihome/gallery/GalleryUploadPanel";
import GuestBook from "@/components/minihome/guestbook/GuestBook";
import RoundedTab from "@/components/os/Tab/RoundedTab";
import { MINIHOME_TABS, type MiniHomeTabs } from "@/types/minihome.types";

interface MiniHomeProps {
  ownerId?: string;
  tab?: MiniHomeTabs;
}

function useDetailState<TabId>() {
  const [selectedId, setSelectedId] = useState<TabId | null>(null);

  const enterDetail = (id: TabId) => setSelectedId(id);
  const exitDetail = () => setSelectedId(null);

  return { selectedId, enterDetail, exitDetail };
}

export default function MiniHome({ ownerId, tab = MINIHOME_TABS.home }: MiniHomeProps) {
  const [activeTab, setActiveTab] = useState<MiniHomeTabs>(tab);

  const galleryDetail = useDetailState<string>();
  const memoDetail = useDetailState<string>();

  useEffect(() => {
    galleryDetail.exitDetail();
    memoDetail.exitDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as MiniHomeTabs)}
      className="flex h-full min-h-0 flex-col"
    >
      <Tabs.List aria-label="미니홈 탭">
        {Object.values(MINIHOME_TABS).map((v) => (
          <Tabs.Trigger key={v} value={v} asChild>
            <RoundedTab isActive={activeTab === v}>{v}</RoundedTab>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value={MINIHOME_TABS.home}>
        <Activity>홈</Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.gallery}>
        {galleryDetail.selectedId === "upload" ? (
          <GalleryUploadPanel onCancel={galleryDetail.exitDetail} />
        ) : (
          <Gallery onUpload={() => galleryDetail.enterDetail("upload")} />
        )}
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.memo}>
        <Activity>
          메모
          {/* {memoDetail.selectedId ? (
            <MemoDetail memoId={memoDetail.selectedId} onBack={memoDetail.exitDetail} />
          ) : (
            <MemoList onSelectMemo={memoDetail.enterDetail} />
          )} */}
        </Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.guestbook} asChild>
        <GuestBook ownerId={ownerId} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
