import { TierlistHandlers } from "@/islands/TierlistHandlers.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";

for (const key in TierlistHandlers) {
  TierlistHandlers[key] = () => {};
}

export default function TierlistWithHandlers(props) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
