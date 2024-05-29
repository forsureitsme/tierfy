import TierlistHandlers from "../islands/TierlistWithHandlers.tsx";
import { ITierList, ITierlistHandlers } from "../types.d.ts";

export interface TierlistProps {
  definition: ITierList;
  handlers?: ITierlistHandlers;
}

export default function Tierlist(props: TierlistProps) {
  const { handlers } = props;

  return <div onClick={handlers?.onTierClick}>CLIQUE</div>;
}
