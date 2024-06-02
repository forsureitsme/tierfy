import { TierlistHandlers } from "@/components/TierlistHandlers.ts";
import { Tierlist } from "@/components/Tierlist.tsx";

for (const key in TierlistHandlers) {
  TierlistHandlers[key] = () => {};
}

export default function TierlistWithHandlers(props) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
