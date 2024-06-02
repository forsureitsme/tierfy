import { TierlistHandlers } from "@/components/TierlistHandlers.ts";
import { Tierlist } from "@/components/Tierlist.tsx";

export default function TierlistWithHandlers(props) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
