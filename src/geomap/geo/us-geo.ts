import { aliases } from './aliases'
import RAW from './county-geo.json'
import { ICountyGeo, ICountyGeoFile } from './types'

const data = RAW as unknown as ICountyGeoFile

for (const stateName of Object.keys(aliases)) {
  for (const base of Object.keys(aliases[stateName])) {
    for (const alt of aliases[stateName][base]) {
      data[stateName][alt] = data[stateName][base]
    }
  }
}

export function findCountyGeo(
  stateName: string,
  countyName: string
): ICountyGeo | undefined {
  const state = data[stateName]
  if (!state) {
    return undefined
  }
  return state[countyName]
}
