import Color from 'colorjs.io'

import {
  GeoSvgMap,
  ISvgMapLocationGeo,
  ISvgMapLocationGeoValue
} from '../geomap'
import { ISvgMapData } from '../geomap/types'
import { IDataPoint } from './types'

interface ISvgMapLocationGeoPointed extends ISvgMapLocationGeo {
  values: number[]
}

type IMode = 'average' | 'count'

export function generateMapWithValues(
  data: IDataPoint[],
  mode: IMode
): ISvgMapData<ISvgMapLocationGeoValue> {
  const locationValues: ISvgMapLocationGeoPointed[] = GeoSvgMap.locations.map(
    (x) => ({ ...x, values: [] })
  )

  // create augment with all data points added to their closest GEO
  // this could be way more optimized if needed...
  for (const pt of data) {
    let location: ISvgMapLocationGeoPointed = locationValues[0]
    let minDist: number = Infinity
    for (const loc of locationValues) {
      for (const geo of loc.geo) {
        const dist = calculateDistance(geo, pt.location)
        if (dist < minDist) {
          minDist = dist
          location = loc
        }
      }
    }
    location.values.push(pt.value)
  }

  const locationValue: ISvgMapLocationGeoValue[] = calculateValues(
    locationValues,
    mode
  )

  // find the value range for color interpolation
  const values: number[] = locationValue
    .filter((x) => !!x.value)
    .map((x) => x.value!)
  const min = values.reduce((a, b) => (a < b ? a : b))
  const max = values.reduce((a, b) => (a > b ? a : b))

  // convert value to color
  const colored: ISvgMapLocationGeo[] = locationValue.map((x) => ({
    ...x,
    color: toColor(min, max, x.value)
  }))
  return { ...GeoSvgMap, locations: colored }
}

// Calculate the values for points based on the operating mode
function calculateValues(
  locationValues: ISvgMapLocationGeoPointed[],
  mode: IMode
): ISvgMapLocationGeoValue[] {
  switch (mode) {
    case 'count':
      return locationValues.map((x) => ({
        ...x,
        value: x.values.length
      }))
    case 'average':
      return locationValues.map((x) => ({
        ...x,
        value:
          x.values.length === 0
            ? undefined
            : x.values.reduce((a, b) => a + b) / x.values.length
      }))
  }
}

function toColor(min: number, max: number, value?: number) {
  if (!value) {
    return '#ddd'
  }
  console.log(value, min, max)

  const color1 = new Color('red')
  const color2 = new Color('green')
  const gradient = color1.range(color2, { space: 'hsl', hue: 'increasing' })
  if (min >= max) {
    return gradient[1]
  }
  const p = (value - min) / (max - min)
  return gradient(p)
}

function calculateDistance(
  from: [number, number],
  to: [number, number]
): number {
  const a = from[0] - to[0]
  const b = from[1] - to[1]
  return Math.sqrt(a * a + b * b)
}
