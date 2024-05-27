export interface KpopGroupMember {
  name: string;
  image: string;
  remoteImage: string;
}

export interface KpopGroup {
  name: string;
  members?: Array<KpopGroupMember>;
}