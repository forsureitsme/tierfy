import { TierlistHandlers } from "@/islands/TierlistHandlers.ts";
import { Tierlist } from "@/islands/Tierlist.tsx";

export default function TierlistWithHandlers(props) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
