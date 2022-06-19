import MapDataRaw from '@svg-maps/usa.counties'

import { ICountyGeo } from './geo/types'
import { findCountyGeo } from './geo/us-geo'
import { ISvgMapData, ISvgMapLocation } from './types'

const MapData = MapDataRaw as ISvgMapData<ISvgMapLocation>

export interface ISvgMapLocationGeo extends ISvgMapLocation {
  geo: ICountyGeo
}

export interface ISvgMapLocationGeoValue extends ISvgMapLocationGeo {
  value?: number
}

// augment the svg-maps data with geo data for counties
const locations: ISvgMapLocationGeo[] = MapData.locations.map((x) => {
  const parts = x.name.toLowerCase().split(',')
  const state = parts[1].trim()
  const county = parts[0].trim()
  const geo = findCountyGeo(state, county)
  if (!geo) {
    throw `Missing geo for ${x.name}`
  }
  return { ...x, geo }
})

export const GeoSvgMap: ISvgMapData<ISvgMapLocationGeo> = {
  ...MapData,
  locations
}
