import { TierlistHandlers } from "@/islands/TierlistHandlers.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";

const noop = () => {}
for (const key in TierlistHandlers) {
  TierlistHandlers[key] = noop;
}

export default function TierlistWithHandlers(props) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
