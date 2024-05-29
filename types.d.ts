export interface ITierableItem {
  name: string;
  image: string;
  remoteImage: string;
}

export interface ITierList {
  name: string;
  items?: Array<ITierableItem>;
}

export interface IScrapedItem {
  name: string;
  remoteImage: string;
}

export interface ITierlistHandlers {
  [onTierClick: string]: (event: Event) => void;
}
