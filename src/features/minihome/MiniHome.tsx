import * as Tabs from "@radix-ui/react-tabs";
import { Activity, useEffect, useState } from "react";

import HomePage from "@/features/minihome/home/HomePage";
import RoundedTab from "@/os/Tab/RoundedTab";
import { useWindowStore } from "@/stores/useWindowStore";
import { MINIHOME_TABS, type MiniHomeTabs } from "@/types/minihome.types";
import type { WindowComponentProps } from "@/types/window.types";

import Gallery from "./gallery/Gallery";
import GuestBook from "./guestbook/GuestBook";
import MemoTab from "./post/MemoTab";

interface MiniHomeProps extends WindowComponentProps {
  tab?: MiniHomeTabs;
}

function useDetailState<TabId>() {
  const [selectedId, setSelectedId] = useState<TabId | null>(null);

  const enterDetail = (id: TabId) => setSelectedId(id);
  const exitDetail = () => setSelectedId(null);

  return { selectedId, enterDetail, exitDetail };
}

export default function MiniHome({ windowId, ownerId, tab = MINIHOME_TABS.home }: MiniHomeProps) {
  const updateWindowTitle = useWindowStore((state) => state.updateWindowTitle);
  const [activeTab, setActiveTab] = useState<MiniHomeTabs>(tab);

  const galleryDetail = useDetailState<string>();
  const memoDetail = useDetailState<string>();

  useEffect(() => {
    galleryDetail.exitDetail();
    memoDetail.exitDetail();
    updateWindowTitle(windowId, activeTab);
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
        <Activity>
          <HomePage ownerId={ownerId} setActiveTab={setActiveTab} />
        </Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.gallery} className="min-h-0 flex-1">
        <Activity>
          <Gallery ownerId={ownerId} />
        </Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.memo} className="min-h-0 flex-1">
        <Activity>
          <MemoTab ownerId={ownerId} />
        </Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.guestbook} asChild>
        <GuestBook ownerId={ownerId} />
      </Tabs.Content>
    </Tabs.Root>
  );
}
