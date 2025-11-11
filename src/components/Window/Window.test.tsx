import Window from "./Window";

export default function WindowTest() {
  return (
    <>
      <Window>win</Window>
      <Window size="maximized">max</Window>
      <Window size="minimized">min</Window>
      <Window size="auto">auto</Window>
      <Window padding="full">full</Window>
      <Window padding="standard">standard</Window>
      <Window padding="extra">extra</Window>

      <Window size="maximized" padding="full">
        max full
      </Window>
      <Window size="maximized" padding="standard">
        max standard
      </Window>
      <Window size="maximized" padding="extra">
        max extra
      </Window>

      <Window size="minimized" padding="full">
        min full
      </Window>
      <Window size="minimized" padding="standard">
        min standard
      </Window>
      <Window size="minimized" padding="full">
        min full
      </Window>

      <Window size="auto" padding="full">
        auto full
      </Window>
      <Window size="auto" padding="standard">
        auto standard
      </Window>
      <Window size="auto" padding="extra">
        auto extra
      </Window>
    </>
  );
}
