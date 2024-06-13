export type CryptoUUID = `${string}-${string}-${string}-${string}-${string}`;

export interface ITierableItem extends Record<string, unknown> {
  id: CryptoUUID;
  name: string;
  image: string;
  remoteImage: string;
}

export interface ITierlist {
  id: CryptoUUID;
  name: string;
  items: Array<ITierableItem>;
  tiers: Array<ITier>;
}

export interface IScrapedItem {
  name: string;
  remoteImage: string;
}

export interface ITier {
  id: CryptoUUID;
  label: string;
  backgroundColor: `#${string}`;
  items: Array<ITierableItem["id"]>;
}