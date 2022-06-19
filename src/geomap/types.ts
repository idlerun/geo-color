export interface ISvgMapLocation {
  name: string
  id: string
  path: string
  color?: string
}

export interface ISvgMapData<T extends ISvgMapLocation> {
  label: string
  viewBox: string
  locations: T[]
}
