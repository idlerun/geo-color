import { ISvgMapLocationGeoValue } from '../geomap'

export interface IDataPoint {
  location: [number, number]
  value: number
}

export interface IHover {
  location: string
  value: number | undefined
}

export interface IMapViewProps {
  data: IDataPoint[]
  onHover: (hover: ISvgMapLocationGeoValue) => void
}
