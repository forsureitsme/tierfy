import { type UniqueIdentifier } from "$dnd";

export interface ITierableItem {
  id: UniqueIdentifier;
  name: string;
  image: string;
  remoteImage: string;
}

export interface ITierlist {
  name: string;
  items: Array<ITierableItem>;
  tiers: Array<ITier>;
}

export interface IScrapedItem {
  name: string;
  remoteImage: string;
}

export interface ITier {
  id: UniqueIdentifier;
  label: string;
  backgroundColor: `#${string}`;
  items: Array<ITierableItem>;
}