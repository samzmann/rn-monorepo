export enum ContainerTypeId {
  'CtrDefault' = 0,
  'Ctr1250mlBowl' = 1,
}

export type ContainerType = {
  id: number;
  name: string;
}
