import Window from "./Window";

export default function WindowTest() {
  return (
    <>
      <Window className="h-70 w-100">
        <div className="flex size-full flex-col">
          <button type="button">텍스트</button>
          <button type="button">텍스트</button>
          <button type="button">텍스트</button>
          <button type="button">텍스트</button>
        </div>
      </Window>
      <Window className="h-70 w-100" windowState="maximized">
        max
      </Window>
      <Window className="h-70 w-100" windowState="minimized">
        min
      </Window>
      <Window className="h-70 w-100" windowState="normal">
        normal
      </Window>
      <Window className="h-70 w-100" padding="full">
        full
      </Window>
      <Window className="h-70 w-100" padding="standard">
        standard
      </Window>
      <Window className="h-70 w-100" padding="extra">
        extra
      </Window>

      <Window className="h-70 w-100" windowState="maximized" padding="full">
        max full
      </Window>
      <Window className="h-70 w-100" windowState="maximized" padding="standard">
        max standard
      </Window>
      <Window className="h-70 w-100" windowState="maximized" padding="extra">
        max extra
      </Window>

      <Window className="h-70 w-100" windowState="minimized" padding="full">
        min full
      </Window>
      <Window className="h-70 w-100" windowState="minimized" padding="standard">
        min standard
      </Window>
      <Window className="h-70 w-100" windowState="minimized" padding="extra">
        min extra
      </Window>

      <Window className="h-70 w-100" windowState="normal" padding="full">
        normal full
      </Window>
      <Window className="h-70 w-100" windowState="normal" padding="standard">
        normal standard
      </Window>
      <Window className="h-70 w-100" windowState="normal" padding="extra">
        normal extra
      </Window>
    </>
  );
}
