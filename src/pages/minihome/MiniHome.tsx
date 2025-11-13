import * as Tabs from "@radix-ui/react-tabs";
import { Activity, useState } from "react";

import RoundedTab from "@/components/os/Tab/RoundedTab";
import { MINIHOME_TABS, type MiniHomeTabs } from "@/types/minihome.types";

export default function MiniHome({ tab = "Home" }: { tab?: MiniHomeTabs }) {
  const [activeTab, setActiveTab] = useState<MiniHomeTabs>(tab);

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
        <Activity>사진첩</Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.MEMO}>
        <Activity>메모장</Activity>
      </Tabs.Content>
      <Tabs.Content value={MINIHOME_TABS.GUESTBOOK}>
        <Activity>방명록</Activity>
      </Tabs.Content>
    </Tabs.Root>
  );
}
