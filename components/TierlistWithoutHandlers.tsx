import TierlistHandlers from "./TierlistHandlers.ts";
import Tierlist, { TierlistProps } from "./Tierlist.tsx";

for (const key in TierlistHandlers) {
  TierlistHandlers[key] = () => {};
}

export default function TierlistWithHandlers(props: TierlistProps) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
