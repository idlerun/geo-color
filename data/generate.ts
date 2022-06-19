import fs from 'fs'

const data = fs.readFileSync('./us.csv', 'utf-8')
const lines = data.split('\n')

const locations: any = {}

for (const line of lines) {
  //99553,Akutan,AK,Aleutians East,54.143,-165.7854
  const split = line.split(',')
  if (split.length < 6) {
    continue
  }
  const state = split[2].toLowerCase()
  const county = split[3]
    .toLowerCase()
    .replace(' (ca)', '')
    .replace(' (city)', '')
    .replace(' (city', '')
    .replace(' (c', '')
  const lat = parseFloat(split[4])
  const lon = parseFloat(split[5])
  if (!locations[state]) {
    locations[state] = {}
  }
  if (!locations[state][county]) {
    locations[state][county] = []
  }
  locations[state][county].push([lat, lon])
}

const stateNames = Object.keys(locations)
const stateDatas: string[] = []
stateNames.sort()
for (const stateName of stateNames) {
  const countyDatas: string[] = []
  for (const countyName of Object.keys(locations[stateName])) {
    countyDatas.push(
      `  "${countyName}": ${JSON.stringify(locations[stateName][countyName])}`
    )
  }
  stateDatas.push(`"${stateName}":{\n${countyDatas.join(',\n')}\n}`)
}
console.log(`{\n${stateDatas.join(',')}\n}`)
