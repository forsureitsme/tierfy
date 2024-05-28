export interface TierableItem {
  name: string;
  image: string;
  remoteImage: string;
}

export interface TierList {
  name: string;
  items?: Array<TierableItem>;
}

export interface ScrapedItem {
  name: string;
  remoteImage: string;
}