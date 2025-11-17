import * as Tabs from "@radix-ui/react-tabs";

import RoundedTab from "@/components/os/Tab/RoundedTab";

import Search from "./Search";

export default function Friends() {
  return (
    <Tabs.Root defaultValue="search" orientation="vertical" className="container-default">
      <Tabs.List aria-label="친구 탭">
        <Tabs.Trigger value="search" asChild>
          <RoundedTab>Search</RoundedTab>
        </Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="search" asChild>
        <Search />
      </Tabs.Content>
    </Tabs.Root>
  );
}
