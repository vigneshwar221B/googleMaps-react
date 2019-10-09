import React, { useState } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react'
import Geocode from 'react-geocode'

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey('AIzaSyBRMxmWyTA2yeYIA6kh6aUWIKBPR6Xm8mw')

// set response language. Defaults to english.
Geocode.setLanguage('en')

// Enable or disable logs. Its optional.
Geocode.enableDebug()

const Mymap = props => {
	const mapStyles = {
		width: '100%',
		height: '70vh'
	}

	const [state, setstate] = useState({
		markers: [
			{
				name: 'Current position',
				position: { lat: props.data.lat, lng: props.data.lng }
			}
		]
	})

	const [name, setname] = useState('')

	const onMarkerDragEnd = (coord, index) => {
		const { latLng } = coord
		const lat = latLng.lat()
		const lng = latLng.lng()

		setstate(prevState => {
			console.log(state.markers[0].position)
			const markers = [...state.markers]
			markers[index] = { ...state.markers[index], position: { lat, lng } }
			return { markers }
		})
	}

	const onsubmit = () => {
		console.log('submitted')
		// Get latidude & longitude from address.
		Geocode.fromAddress(name).then(
			response => {
				const { lat, lng } = response.results[0].geometry.location
				console.log(lat, lng)
			},
			error => {
				console.error(error)
			}
		)
	}

	const onchange = e => {
		setname(e.target.value)
	}

	return (
		<>
			<input type='text' value={name} onChange={onchange}></input>

			<Map
				google={props.google}
				zoom={15}
				style={mapStyles}
				initialCenter={{ lat: props.data.lat, lng: props.data.lng }}
			>
				{state.markers.map((marker, index) => (
					<Marker
						key={index}
						position={marker.position}
						draggable={true}
						onDragend={(t, map, coord) => onMarkerDragEnd(coord, index)}
						name={marker.name}
					/>
				))}
			</Map>

			<button onClick={onsubmit}>submit</button>
		</>
	)
}

export default GoogleApiWrapper({
	apiKey: 'AIzaSyBRMxmWyTA2yeYIA6kh6aUWIKBPR6Xm8mw'
})(Mymap)
