import { Box } from '@mui/material'
import React from 'react'

import { ISvgMapLocationGeoValue } from '../geomap'
import SVGMap from './svg-map'
import { IMapViewProps } from './types'
import { generateMapWithValues } from './util'

function MapView(props: IMapViewProps) {
  const map = React.useMemo(
    () => generateMapWithValues(props.data, 'average'),
    [props.data]
  )

  return (
    <Box
      sx={{
        marginBlockStart: '2em',
        width: 'auto'
      }}
    >
      <SVGMap map={map} onMouseOver={props.onHover} />
    </Box>
  )
}
export default MapView

function HoverView(props: { hovered: ISvgMapLocationGeoValue | undefined }) {
  return <div style={{}}></div>
}
