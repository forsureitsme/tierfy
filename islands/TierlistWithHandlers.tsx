import TierlistHandlers from "../components/TierlistHandlers.ts";
import Tierlist, { TierlistProps } from "../components/Tierlist.tsx";

export default function TierlistWithHandlers(props: TierlistProps) {
  return <Tierlist {...props} handlers={TierlistHandlers} />;
}
