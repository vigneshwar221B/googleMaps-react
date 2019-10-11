import React, { useState, useEffect } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Geocode from 'react-geocode'
import Geosuggest from 'react-geosuggest'

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyBRMxmWyTA2yeYIA6kh6aUWIKBPR6Xm8mw')

// set response language. Defaults to english.
Geocode.setLanguage('en')

// Enable or disable logs. Its optional.
Geocode.enableDebug()

const Mymap = props => {
	const [state, setstate] = useState({
		lat: '',
		lng: ''
	})

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords

			console.log(latitude, longitude)
			setstate({ lat: latitude, lng: longitude })
		})
	})

	const mapStyles = {
		width: '100%',
		height: '70vh'
	}

	const [sname, setsname] = useState('')

	const onMarkerDragEnd = coord => {
		//console.log(index)
		const { latLng } = coord
		const lat = latLng.lat()
		const lng = latLng.lng()
		// console.log(state.markers[0].position)
		console.log(lat, lng)
		setstate({
			lat,
			lng
		})
	}

	
	const onschange = e => {
		setsname(e)
	}

	const mapClicked = (mapProps, map, clickEvent) => {
		const lat = clickEvent.latLng.lat()
		const lng = clickEvent.latLng.lng()

		setstate({ lat, lng })
	}

	const showRes = e => {
		console.log(e)
		setstate({ lat: e.location.lat, lng: e.location.lng })
	}

	return (
		<>
			<Geosuggest
				value={sname}
				onChange={onschange}
				onSuggestSelect={showRes}
			/>

			<Map
				google={props.google}
				zoom={15}
				style={mapStyles}
				center={state}
				initialCenter={state}
				onClick={mapClicked}
			>
				<Marker
					position={state}
					draggable={true}
					onDragend={(t, map, coord) => onMarkerDragEnd(coord)}
					
				/>
			</Map>
		</>
	)
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBRMxmWyTA2yeYIA6kh6aUWIKBPR6Xm8mw'
})(Mymap)
