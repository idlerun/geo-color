export interface ICountyGeoFile {
  [stateName: string]: ICountyGeos
}

export interface ICountyGeos {
  [countyName: string]: ICountyGeo
}

export type ICountyGeo = [number, number][]
