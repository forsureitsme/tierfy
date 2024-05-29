import { ITierlistHandlers } from "../types.d.ts";

const TierlistHandlers: ITierlistHandlers = {
  onTierClick: (event: Event) => {
    event.preventDefault();
    alert("CLICOU");
  },
};

export default TierlistHandlers;
