import * as Tabs from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";

import RoundedTab from "@/components/os/Tab/RoundedTab";
import Request from "@/pages/friends/request/Request";
import Search from "@/pages/friends/search/Search";
import { FRIENDS_TABS, type FriendsTabs } from "@/pages/friends/types/friends.types";
import { useWindowStore } from "@/stores/useWindowStore";
import type { WindowComponentProps } from "@/types/window.types";

interface FriendsProps extends WindowComponentProps {
  tab?: FriendsTabs;
}

export default function Friends({ windowId, tab = FRIENDS_TABS.search }: FriendsProps) {
  const updateWindowTitle = useWindowStore((state) => state.updateWindowTitle);
  const [activeTab, setActiveTab] = useState<FriendsTabs>(tab);

  useEffect(() => {
    updateWindowTitle(windowId, activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return (
    <Tabs.Root
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as FriendsTabs)}
      className="flex h-full min-h-0 flex-col"
    >
      <Tabs.List aria-label="친구 탭">
        {Object.values(FRIENDS_TABS).map((v) => (
          <Tabs.Trigger key={v} value={v} asChild>
            <RoundedTab isActive={activeTab === v}>{v}</RoundedTab>
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value={FRIENDS_TABS.search} asChild>
        <Search />
      </Tabs.Content>
      <Tabs.Content value={FRIENDS_TABS.request} asChild>
        <Request />
      </Tabs.Content>
      <Tabs.Content value={FRIENDS_TABS.list} asChild>
        <Search />
      </Tabs.Content>
    </Tabs.Root>
  );
}
