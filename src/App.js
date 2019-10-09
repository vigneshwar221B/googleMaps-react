import Mymap from './Mymap'

import React from 'react'
import { geolocated } from 'react-geolocated'

const App = props => {
	return !props.isGeolocationAvailable ? (
		<div>Your browser does not support Geolocation</div>
	) : !props.isGeolocationEnabled ? (
		<div>Geolocation is not enabled</div>
	) : props.coords ? (
		<>
			<Mymap
				data={{ lat: props.coords.latitude, lng: props.coords.longitude }}
			/>
		</>
	) : (
		<div>Getting the location data&hellip; </div>
	)
}

export default geolocated({
	positionOptions: {
		enableHighAccuracy: false
	},
	userDecisionTimeout: 5000
})(App)
