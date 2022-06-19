import EditIcon from '@mui/icons-material/Edit'
import { AppBar, Toolbar, Typography } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import dynamic from 'next/dynamic'
import React from 'react'

import { ISvgMapLocationGeoValue } from '../src/geomap'
import SampleCSV from '../src/sampledata'
import { CsvInputView } from '../src/ui/csv-edit'
import { IDataPoint } from '../src/ui/types'

const MapView = dynamic(() => import('../src/ui/map'), {
  ssr: false
})

export default function PageIndex() {
  const [showCsvInput, setShowCsvInput] = React.useState(false)
  const [csv, setCsv] = React.useState(SampleCSV)
  const [hover, setHover] = React.useState<ISvgMapLocationGeoValue>()

  const data: IDataPoint[] = React.useMemo(
    () =>
      csv.split('\n').map((x) => {
        const split = x.split(',')
        return {
          location: [parseFloat(split[0]), parseFloat(split[1])],
          value: -1 * parseFloat(split[2])
        }
      }),
    [csv]
  )

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <IconButton onClick={() => setShowCsvInput(!showCsvInput)}>
            <EditIcon />
          </IconButton>
          <Typography align="center" component="div" sx={{ flexGrow: 1 }}>
            {hover && hover.name}
          </Typography>
          <Typography align="right" minWidth={100} component="div">
            {hover && hover.value && Math.round(1000 * hover.value) / 1000}
          </Typography>
        </Toolbar>
      </AppBar>
      <CsvInputView
        defaultCsv={SampleCSV}
        open={showCsvInput}
        setCsv={setCsv}
        onClose={() => setShowCsvInput(false)}
      />
      <MapView data={data} onHover={setHover} />
    </>
  )
}
