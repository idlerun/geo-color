import PropTypes from 'prop-types'
import React from 'react'

import { ISvgMapData, ISvgMapLocation } from '../geomap/types'

// ported from https://github.com/VictorCazanave/react-svg-map/blob/master/src/svg-map.jsx
// to avoid react 16 dependency

interface IProps<T extends ISvgMapLocation> {
  map: ISvgMapData<T>
  strokeColor?: string
  className?: string
  onMouseOver: (location: T) => void
}

function SVGMap<T extends ISvgMapLocation>(props: IProps<T>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={props.map.viewBox}
      className={props.className}
      style={{
        width: '100%',
        height: 'auto',
        stroke: props.strokeColor ?? '#666',
        strokeWidth: 0.1,
        strokeLinecap: 'round',
        strokeLinejoin: 'round'
      }}
    >
      {props.map.locations.map((location) => {
        return (
          <path
            id={location.id}
            name={location.name}
            d={location.path}
            style={{
              fill: location.color ?? '#a1d99b'
            }}
            key={location.id}
            onMouseOver={() => props.onMouseOver(location)}
          />
        )
      })}
    </svg>
  )
}

SVGMap.propTypes = {
  // Map properties
  map: PropTypes.shape({
    viewBox: PropTypes.string.isRequired,
    locations: PropTypes.arrayOf(
      PropTypes.shape({
        path: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        name: PropTypes.string
      })
    ).isRequired,
    label: PropTypes.string
  }).isRequired,
  className: PropTypes.string,
  role: PropTypes.string,

  // Locations properties
  locationClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  locationTabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  locationRole: PropTypes.string,
  locationAriaLabel: PropTypes.func,
  onLocationMouseOver: PropTypes.func,
  onLocationMouseOut: PropTypes.func,
  onLocationMouseMove: PropTypes.func,
  onLocationClick: PropTypes.func,
  onLocationKeyDown: PropTypes.func,
  onLocationFocus: PropTypes.func,
  onLocationBlur: PropTypes.func,
  isLocationSelected: PropTypes.func,

  // Slots
  childrenBefore: PropTypes.node,
  childrenAfter: PropTypes.node
}

SVGMap.defaultProps = {
  className: 'svg-map',
  role: 'none', // No role for map
  locationClassName: 'svg-map__location',
  locationTabIndex: '0',
  locationRole: 'none'
}

export default SVGMap
